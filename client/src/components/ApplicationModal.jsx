import { useState } from 'react'
import client from '../api/client'
import { toast } from 'react-toastify'
import { X, Upload, FileText, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const ApplicationModal = ({ job, isOpen, onClose }) => {
    const [coverLetter, setCoverLetter] = useState('')
    const [resume, setResume] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const { user } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (!resume) {
            setError('Please upload your resume.')
            setLoading(false)
            return
        }

        const formData = new FormData()
        formData.append('jobId', job._id)
        formData.append('coverLetter', coverLetter)
        formData.append('resume', resume)

        try {
            await client.post('/applications', formData)

            setSuccess(true)
            toast.success('Application Sent Successfully!')
            setTimeout(() => {
                onClose()
                setSuccess(false)
                setCoverLetter('')
                setResume(null)
            }, 2000)
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to submit application'
            toast.error(errorMsg)
            setError(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Apply for {job.title}</h2>
                            <p className="text-slate-400 text-sm mb-6">at {job.company}</p>

                            {success ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Application Sent!</h3>
                                    <p className="text-slate-400">Good luck! We'll be in touch soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {error && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Cover Letter
                                        </label>
                                        <textarea
                                            value={coverLetter}
                                            onChange={(e) => setCoverLetter(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 min-h-[150px]"
                                            placeholder="Tell us why you're a great fit..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Resume (PDF/DOC)
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                onChange={(e) => setResume(e.target.files[0])}
                                                accept=".pdf,.doc,.docx"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="flex items-center justify-center px-4 py-8 bg-white/5 border-2 border-dashed border-white/10 rounded-xl group-hover:border-amber-500/30 transition-colors">
                                                {resume ? (
                                                    <div className="flex items-center text-amber-400">
                                                        <FileText className="w-6 h-6 mr-2" />
                                                        <span className="truncate max-w-[200px]">{resume.name}</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center text-slate-400 group-hover:text-amber-400 transition-colors">
                                                        <Upload className="w-8 h-8 mb-2" />
                                                        <span className="text-sm">Click to upload or drag & drop</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-xl text-black font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Sending...' : 'Submit Application'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default ApplicationModal
