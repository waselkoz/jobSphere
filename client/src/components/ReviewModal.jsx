import { useState } from 'react'
import client from '../api/client'
import { Star, X } from 'lucide-react'
import { toast } from 'react-toastify'

const ReviewModal = ({ isOpen, onClose, companyName = "JobSphere" }) => {
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [role, setRole] = useState('Candidate')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                toast.error('Please sign in to submit a review')
                onClose()
                return
            }

            await client.post('/reviews', {
                companyName,
                rating,
                comment,
                role
            })
            toast.success('Thank you for your feedback!')
            setComment('')
            setRating(5)
            onClose()
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Failed to submit review')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl w-full max-w-md border border-slate-200 dark:border-white/10 relative shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Rate Your Experience</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">How was your time with {companyName}?</p>

                <form onSubmit={handleSubmit}>
                    {/* Role Selection */}
                    <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl mb-6">
                        <button
                            type="button"
                            onClick={() => setRole('Candidate')}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${role === 'Candidate'
                                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-amber-400 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            Candidate
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('Recruiter')}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${role === 'Recruiter'
                                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-amber-400 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            Recruiter
                        </button>
                    </div>

                    <div className="flex gap-2 mb-8 justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setRating(star)}
                                onClick={() => setRating(star)}
                                className={`transition-all duration-200 hover:scale-110 ${star <= rating ? 'text-amber-400 drop-shadow-md' : 'text-slate-200 dark:text-slate-700'}`}
                            >
                                <Star className="w-10 h-10 fill-current" />
                            </button>
                        ))}
                    </div>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us what you liked or how we can improve..."
                        className="w-full p-4 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl mb-6 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all resize-none"
                        rows="4"
                        required
                    />

                    <button
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-amber-500 dark:to-amber-600 text-white dark:text-black font-bold text-lg rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ReviewModal
