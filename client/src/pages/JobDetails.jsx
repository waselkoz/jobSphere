import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import client from '../api/client'
import { MapPin, Building2, ArrowLeft, Calendar, Briefcase, Star, MessageSquare } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import ApplicationModal from '../components/ApplicationModal'
import { BackgroundPaths } from '../components/ui/background-paths'

const JobDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isReviewOpen, setIsReviewOpen] = useState(false)
    const [reviewRating, setReviewRating] = useState(5)
    const [reviewComment, setReviewComment] = useState('')

    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        try {
            await client.post('/reviews', {
                companyName: job.company,
                rating: reviewRating,
                comment: reviewComment
            })
            toast.success('Review Submitted!')
            setIsReviewOpen(false)
            setReviewComment('')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit review')
        }
    }

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const { data } = await client.get(`/jobs/${id}`)
                setJob(data)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }
        fetchJob()
    }, [id])

    const handleApplyClick = () => {
        if (!user) {
            toast.warn('Please sign in to apply')
            navigate('/login')
            return
        }
        setIsModalOpen(true)
    }

    if (loading) return <div className="pt-24 text-center text-slate-500">Loading details...</div>
    if (!job) return <div className="pt-24 text-center text-slate-500">Job not found.</div>

    // Helper to safely check array
    const hasArray = (arr) => Array.isArray(arr) && arr.length > 0;

    return (
        <BackgroundPaths>
            <div className="pt-24 px-6 max-w-4xl mx-auto min-h-screen pb-20 relative z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Jobs
                </button>

                <div className="relative mb-8 group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-amber-600 dark:to-yellow-500 rounded-3xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500" />

                    <div className="relative bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-blue-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                        <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-blue-100 dark:border-white/5 pb-8 relative z-10">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                                    {job.title}
                                </h1>
                                <div className="flex flex-wrap gap-4 text-slate-600 dark:text-slate-300 font-medium">
                                    <span className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-xl border border-blue-100 dark:border-white/5 shadow-sm">
                                        <Building2 className="w-5 h-5 text-blue-500 dark:text-amber-400" /> {job.company}
                                    </span>
                                    <span className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-xl border border-blue-100 dark:border-white/5 shadow-sm">
                                        <MapPin className="w-5 h-5 text-cyan-500 dark:text-amber-200" /> {job.location}
                                    </span>
                                    <span className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-xl border border-blue-100 dark:border-white/5 shadow-sm">
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">DA</span> {job.salary}
                                    </span>
                                    <span className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-xl border border-blue-100 dark:border-white/5 shadow-sm">
                                        <Calendar className="w-5 h-5 text-blue-500 dark:text-amber-400" /> Posted {new Date(job.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setIsReviewOpen(true)}
                                        className="flex-1 px-4 py-3 bg-white/10 dark:bg-white/5 border border-blue-200/20 dark:border-white/10 text-slate-900 dark:text-white font-semibold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <MessageSquare className="w-5 h-5 text-blue-500 dark:text-amber-400" />
                                        Rate Company
                                    </button>
                                    <button
                                        onClick={handleApplyClick}
                                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-amber-600 dark:to-yellow-500 text-white dark:text-black font-bold text-lg rounded-2xl transition-all shadow-xl shadow-blue-600/20 dark:shadow-amber-500/20 hover:shadow-blue-600/40 dark:hover:shadow-amber-500/40 hover:scale-105 active:scale-95 whitespace-nowrap"
                                    >
                                        Apply for this Position
                                    </button>
                                </div>

                                {/* Review Modal */}
                                {isReviewOpen && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl w-full max-w-md border border-slate-200 dark:border-white/10 relative">
                                            <button onClick={() => setIsReviewOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Rate {job.company}</h3>
                                            <form onSubmit={handleReviewSubmit}>
                                                <div className="flex gap-2 mb-6 justify-center">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setReviewRating(star)}
                                                            className={`transition-colors ${star <= reviewRating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
                                                        >
                                                            <Star className="w-8 h-8 fill-current" />
                                                        </button>
                                                    ))}
                                                </div>
                                                <textarea
                                                    value={reviewComment}
                                                    onChange={(e) => setReviewComment(e.target.value)}
                                                    placeholder="Share your experience..."
                                                    className="w-full p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl mb-4 text-slate-900 dark:text-white"
                                                    rows="4"
                                                    required
                                                />
                                                <button className="w-full py-3 bg-blue-600 dark:bg-amber-500 text-white dark:text-black font-bold rounded-xl hover:opacity-90">
                                                    Submit Review
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-8">
                                    <section>
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                            <Briefcase className="w-5 h-5 mr-2 text-blue-600 dark:text-amber-400" />
                                            Job Description
                                        </h2>
                                        <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                            {job.description}
                                        </div>
                                    </section>

                                    {hasArray(job.requirements) && (
                                        <section>
                                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                                <Briefcase className="w-5 h-5 mr-2 text-blue-600 dark:text-amber-400" />
                                                Requirements
                                            </h2>
                                            <ul className="grid grid-cols-1 gap-3">
                                                {job.requirements.map((req, i) => (
                                                    <li key={i} className="flex items-start text-slate-600 dark:text-slate-300 bg-blue-50/50 dark:bg-white/[0.02] p-3 rounded-lg border border-blue-100 dark:border-white/5">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-amber-500 mt-2 mr-3 flex-shrink-0" />
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {hasArray(job.qualifications) && (
                                        <section>
                                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                                <Briefcase className="w-5 h-5 mr-2 text-blue-600 dark:text-amber-400" />
                                                Needed Qualifications
                                            </h2>
                                            <ul className="grid grid-cols-1 gap-3">
                                                {job.qualifications.map((qual, i) => (
                                                    <li key={i} className="flex items-start text-slate-600 dark:text-slate-300 bg-purple-50/50 dark:bg-purple-500/[0.05] p-3 rounded-lg border border-purple-100 dark:border-purple-500/10">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-3 flex-shrink-0" />
                                                        {qual}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {(hasArray(job.hardSkills) || hasArray(job.softSkills)) && (
                                        <section className="grid md:grid-cols-2 gap-8">
                                            {hasArray(job.hardSkills) && (
                                                <div>
                                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Hard Skills</h2>
                                                    <div className="flex flex-wrap gap-2">
                                                        {job.hardSkills.map((skill, i) => (
                                                            <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-500/30">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {hasArray(job.softSkills) && (
                                                <div>
                                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Soft Skills</h2>
                                                    <div className="flex flex-wrap gap-2">
                                                        {job.softSkills.map((skill, i) => (
                                                            <span key={i} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-500/30">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </section>
                                    )}
                                </div>
                            </div>
                        </div>

                        <ApplicationModal
                            job={job}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            </div>
        </BackgroundPaths>
    )
}

export default JobDetails
