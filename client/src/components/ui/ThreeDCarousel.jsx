"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
    AnimatePresence,
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(query, {
    defaultValue = false,
    initializeWithValue = true,
} = {}) {
    const getMatches = (query) => {
        if (IS_SERVER) {
            return defaultValue
        }
        return window.matchMedia(query).matches
    }

    const [matches, setMatches] = useState(() => {
        if (initializeWithValue) {
            return getMatches(query)
        }
        return defaultValue
    })

    const handleChange = () => {
        setMatches(getMatches(query))
    }

    useIsomorphicLayoutEffect(() => {
        const matchMedia = window.matchMedia(query)
        handleChange()

        matchMedia.addEventListener("change", handleChange)

        return () => {
            matchMedia.removeEventListener("change", handleChange)
        }
    }, [query])

    return matches
}

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }

const Carousel = memo(
    ({
        handleClick,
        controls,
        cards,
        isCarouselActive,
    }) => {
        const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
        // Wider cylinder to allow wider cards to sit nicely
        const cylinderWidth = isScreenSizeSm ? 1100 : 2200
        const faceCount = cards.length
        const faceWidth = cylinderWidth / faceCount
        const radius = cylinderWidth / (2 * Math.PI)
        const rotation = useMotionValue(0)
        const transform = useTransform(
            rotation,
            (value) => `rotate3d(0, 1, 0, ${value}deg)`
        )

        // Auto-rotate logic
        useEffect(() => {
            if (!isCarouselActive) return;

            const autoRotate = () => {
                const currentRotation = rotation.get();
                rotation.set(currentRotation - 0.2);
                requestAnimationFrame(autoRotate);
            };

            const animationId = requestAnimationFrame(autoRotate);
            return () => cancelAnimationFrame(animationId);
        }, [isCarouselActive, rotation]);

        return (
            <div
                className="flex h-full items-center justify-center bg-transparent"
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
            >
                <motion.div
                    drag={isCarouselActive ? "x" : false}
                    className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
                    style={{
                        transform,
                        rotateY: rotation,
                        width: cylinderWidth,
                        transformStyle: "preserve-3d",
                    }}
                    onDrag={(_, info) =>
                        isCarouselActive &&
                        rotation.set(rotation.get() + info.offset.x * 0.05)
                    }
                    onDragEnd={(_, info) =>
                        isCarouselActive &&
                        controls.start({
                            rotateY: rotation.get() + info.velocity.x * 0.05,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 30,
                                mass: 0.1,
                            },
                        })
                    }
                    animate={controls}
                >
                    {cards.map((review, i) => (
                        <motion.div
                            key={`key-${i}`}
                            className="absolute flex h-full origin-center items-center justify-center rounded-xl p-2"
                            style={{
                                width: `${faceWidth}px`,
                                transform: `rotateY(${i * (360 / faceCount)
                                    }deg) translateZ(${radius}px)`,
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden'
                            }}
                            onClick={() => handleClick && handleClick(review, i)}
                        >
                            <motion.div
                                className="w-[360px] h-64 rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center text-center shadow-xl transform transition-transform hover:scale-105 cursor-pointer"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden'
                                }}
                                initial={{ filter: "blur(4px)" }}
                                animate={{ filter: "blur(0px)" }}
                                transition={transition}
                            >
                                <div className="mb-4 overflow-hidden">
                                    <p className="text-base md:text-lg font-medium text-slate-800 dark:text-slate-100 italic leading-snug line-clamp-4">"{review.quote}"</p>
                                </div>
                                <div className="mt-auto">
                                    <h4 className="text-sm font-bold text-blue-600 dark:text-amber-400 uppercase tracking-widest mb-1">{review.author}</h4>
                                    <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                                        {review.role}
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        )
    }
)

export function ThreeDPhotoCarousel({ reviews = [], onReviewClick }) {
    const [isCarouselActive, setIsCarouselActive] = useState(true)
    const controls = useAnimation()
    const controls2 = useAnimation()

    const { topRow, bottomRow } = useMemo(() => {
        if (reviews.length === 0) return { topRow: [], bottomRow: [] }

        let items = [...reviews]
        // Reduce duplicates somewhat for cleaner look
        while (items.length < 10) {
            items = [...items, ...reviews]
        }

        const distinctCount = reviews.length
        if (distinctCount >= 8 || items.length > 14) {
            const mid = Math.ceil(items.length / 2)
            return {
                topRow: items.slice(0, mid),
                bottomRow: items.slice(mid)
            }
        }
        return { topRow: items, bottomRow: [] }
    }, [reviews])

    const handleClick = (review) => {
        if (onReviewClick) {
            onReviewClick(review)
        }
    }

    return (
        <motion.div layout className="relative w-full flex flex-col gap-12 items-center">
            {/* Top Carousel */}
            <div className="relative h-[400px] w-full overflow-hidden flex justify-center">
                <Carousel
                    handleClick={handleClick}
                    controls={controls}
                    cards={topRow}
                    isCarouselActive={isCarouselActive}
                />
            </div>

            {/* Bottom Carousel (if needed) */}
            {bottomRow.length > 0 && (
                <div className="relative h-[400px] w-full overflow-hidden -mt-32 flex justify-center">
                    <Carousel
                        handleClick={handleClick}
                        controls={controls2}
                        cards={bottomRow}
                        isCarouselActive={isCarouselActive}
                    />
                </div>
            )}
        </motion.div>
    )
}
