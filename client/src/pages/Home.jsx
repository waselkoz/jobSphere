import { useState, useEffect } from 'react'
import client from '../api/client'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { BackgroundPaths } from '../components/ui/background-paths'
import { ActionSearchBar } from '../components/ui/action-search-bar'
import { ThreeDPhotoCarousel, useMediaQuery } from '../components/ui/ThreeDCarousel' // Import hook
import { StandardCarousel } from '../components/ui/StandardCarousel'
import ReviewModal from '../components/ReviewModal'
import ReviewDetailModal from '../components/ReviewDetailModal'

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])
    const [isReviewOpen, setIsReviewOpen] = useState(false)
    const [selectedReview, setSelectedReview] = useState(null)

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/jobs?keyword=${encodeURIComponent(searchQuery)}`)
        } else {
            navigate('/jobs')
        }
    }

    // Fetch recent reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data } = await client.get('/reviews/recent')
                if (data.length > 0) {
                    setReviews(data.map(r => ({
                        quote: r.comment,
                        author: r.user?.name || "Anonymous",
                        role: r.role || "User", // Use the stored role or fallback
                        type: "Recent Review"
                    })))
                } else {
                    // Fallback to static if no reviews
                    setReviews([
                        {
                            quote: "JobSphere revolutionized our hiring process. We found top-tier React developers in Algiers within days.",
                            author: "Sarah Merabet",
                            role: "HR Director at TechFlow",
                            type: "Company"
                        },
                        {
                            quote: "Finally, a platform that understands the Algerian market. The salary transparency is a game changer for us.",
                            author: "Amine Khelil",
                            role: "Senior Backend Engineer",
                            type: "Candidate"
                        },
                        {
                            quote: "The quality of candidates here is unmatched. The skill matching algorithm saved us weeks of screening.",
                            author: "Yacine Benali",
                            role: "CTO at StartupDz",
                            type: "Company"
                        }
                    ])
                }
            } catch (error) {
                console.error("Failed to fetch reviews", error)
                // Ensure fallback on error
                setReviews([
                    {
                        quote: "JobSphere revolutionized our hiring process. We found top-tier React developers in Algiers within days.",
                        author: "Sarah Merabet",
                        role: "HR Director at TechFlow",
                        type: "Company"
                    },
                    {
                        quote: "Finally, a platform that understands the Algerian market. The salary transparency is a game changer for us.",
                        author: "Amine Khelil",
                        role: "Senior Backend Engineer",
                        type: "Candidate"
                    },
                    {
                        quote: "The quality of candidates here is unmatched. The skill matching algorithm saved us weeks of screening.",
                        author: "Yacine Benali",
                        role: "CTO at StartupDz",
                        type: "Company"
                    }
                ])
            }
        }
        fetchReviews()
    }, [])

    return (
        <BackgroundPaths>
            <div className="flex flex-col items-center">
                {/* Hero Section */}
                <main className="relative z-10 px-6 pt-32 pb-40 max-w-7xl mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-600 dark:from-amber-500 dark:to-yellow-600 rounded-full blur opacity-25 animate-tilt" />

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-8 flex justify-center"
                        >
                            <div className="relative rounded-full overflow-hidden">
                                <img
                                    src="/hero_logo.jpg"
                                    alt="JobSphere Hero Logo"
                                    className="h-32 md:h-48 w-auto object-contain mix-blend-multiply dark:mix-blend-screen opacity-90 hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
                                        WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
                                    }}
                                />
                            </div>
                        </motion.div>

                        <span className="relative px-4 py-1.5 rounded-full border border-blue-500/30 dark:border-amber-500/30 bg-blue-500/10 dark:bg-amber-500/10 text-blue-600 dark:text-amber-300 text-sm font-bold tracking-wide uppercase mb-6 inline-block shadow-lg shadow-blue-500/20 dark:shadow-amber-500/20">
                            🚀 The Future of Hiring is Here
                        </span>

                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-tight text-slate-900 dark:text-white">
                            Find Your <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 dark:from-amber-200 dark:via-yellow-400 dark:to-amber-600 animate-gradient-x drop-shadow-2xl">
                                Dream Mission
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                            Connect with elite companies worldwide.
                            <span className="text-blue-600 dark:text-amber-400 font-semibold"> Advanced career matching</span> for the next generation of talent.
                        </p>
                    </motion.div>

                    {/* Search Bar - Action Style */}
                    <div className="w-full max-w-3xl relative z-50">
                        <ActionSearchBar
                            onSearch={(term) => {
                                if (term.trim()) {
                                    navigate(`/jobs?keyword=${encodeURIComponent(term)}`)
                                }
                            }}
                            placeholder="Search by job title, keywords, or company..."
                        />
                    </div>

                    {/* Stats / Proof */}
                    <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-5xl mb-32">
                        {[
                            { label: 'Active Jobs', value: '12k+' },
                            { label: 'Companies', value: '8.5k' },
                            { label: 'Candidates', value: '150k+' },
                            { label: 'Daily Matches', value: '5k+' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (index * 0.1) }}
                                className="flex flex-col items-center p-4 rounded-2xl hover:bg-blue-50/50 dark:hover:bg-white/5 transition-colors cursor-default"
                            >
                                <span className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-500 mb-2">{stat.value}</span>
                                <span className="text-sm font-bold text-blue-600 dark:text-amber-400 uppercase tracking-widest">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* About Us / Mission Statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-full max-w-4xl mx-auto mb-32 relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-amber-500 dark:to-yellow-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 space-y-4">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Driven by <span className="text-blue-600 dark:text-amber-400">Perfection</span></h2>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                    At JobSphere, we care deeply for our users. We seek perfection in every connection we make, striving to deliver only the best opportunities. Our mission is to bridge the gap between exceptional talent and world-class organizations with unwavering integrity and excellence.
                                </p>
                            </div>
                            <div className="md:w-1/3 flex-shrink-0">
                                <div className="p-4 bg-blue-50 dark:bg-white/5 rounded-2xl border border-blue-100 dark:border-white/10">
                                    <div className="flex items-center gap-3 mb-2 text-blue-700 dark:text-amber-400 font-bold">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-amber-400 animate-pulse" />
                                        Our Promise
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 italic">"To empower every career journey with precision, care, and state-of-the-art technology."</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Why JobSphere Section (New Professional Addition) */}
                    <div className="w-full max-w-6xl mx-auto text-left mb-20">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Top Talent Choose Us</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">We connect professionals with opportunities that matter.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Verified Companies', desc: 'Every company is vetted to ensure a safe and professional environment.', icon: '🛡️' },
                                { title: 'Salary Transparency', desc: 'Upfront salary ranges on all job listings. Know your worth.', icon: '💎' },
                                { title: 'Global Reach', desc: 'Opportunities in over 50 countries, including remote roles.', icon: '🌍' }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-blue-100 dark:border-white/10 hover:border-blue-300 dark:hover:border-amber-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-amber-500/5 group"
                                >
                                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Testimonials Section */}
                <section className="w-full relative z-10 py-24 bg-slate-50/50 dark:bg-black/20 backdrop-blur-sm border-y border-blue-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Trusted by Industry Leaders</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg mb-8">See what companies and candidates are saying about JobSphere.</p>

                            <motion.button
                                onClick={() => setIsReviewOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-blue-600 dark:bg-amber-400 text-white dark:text-black font-bold rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-amber-300 transition-colors"
                            >
                                Rate Your Experience
                            </motion.button>
                        </div>

                        <div className="relative max-w-7xl mx-auto">
                            {reviews.length > 0 && (
                                <>
                                    {/* Mobile Slider (Standard) */}
                                    <div className="block md:hidden">
                                        <StandardCarousel
                                            reviews={reviews}
                                            onReviewClick={(review) => setSelectedReview(review)}
                                        />
                                    </div>

                                    {/* Desktop Carousel (3D) */}
                                    <div className="hidden md:block">
                                        <ThreeDPhotoCarousel
                                            reviews={reviews}
                                            onReviewClick={(review) => setSelectedReview(review)}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <ReviewModal
                    isOpen={isReviewOpen}
                    onClose={() => setIsReviewOpen(false)}
                    companyName="JobSphere"
                />

                <ReviewDetailModal
                    isOpen={!!selectedReview}
                    onClose={() => setSelectedReview(null)}
                    review={selectedReview}
                />
            </div>
        </BackgroundPaths>
    )
}

export default Home
