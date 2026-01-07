import { motion } from "framer-motion"

export function StandardCarousel({ reviews, onReviewClick }) {
    if (!reviews || reviews.length === 0) return null

    return (
        <div className="w-full overflow-x-auto pb-6 snap-x snap-mandatory flex gap-4 px-4 scrollbar-hide">
            {/* Hide scrollbar typically via CSS class or inline style */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {reviews.map((review, i) => (
                <div
                    key={i}
                    className="flex-none w-[85vw] max-w-[320px] snap-center"
                    onClick={() => onReviewClick && onReviewClick(review)}
                >
                    <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between active:scale-95 transition-transform">
                        <div className="mb-4">
                            <p className="text-slate-800 dark:text-slate-200 italic leading-relaxed text-sm">"{review.quote}"</p>
                        </div>
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {review.author.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{review.author}</h4>
                                <span className="text-xs text-blue-600 dark:text-amber-400 font-medium uppercase tracking-wider">{review.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
