import { useState } from 'react'
import client from '../api/client'
import { toast } from 'react-toastify'
import { X, CheckCircle, Briefcase, MapPin, Coins, List } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const CreateJobModal = ({ isOpen, onClose, onJobCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        salary: '',
        description: '',
        description: '',
        requirements: '', // We will split this by newlines
        qualifications: '',
        hardSkills: '',
        hardSkills: '',
        softSkills: '',
        companyLogo: '',
        companyBackground: ''
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const { user } = useAuth()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // Convert requirements string to array
            const jobData = {
                ...formData,
                requirements: formData.requirements.split('\n').filter(req => req.trim() !== ''),
                qualifications: formData.qualifications.split('\n').filter(q => q.trim() !== ''),
                hardSkills: formData.hardSkills.split('\n').filter(s => s.trim() !== ''),
                softSkills: formData.softSkills.split('\n').filter(s => s.trim() !== '')
            }

            await client.post('/jobs', jobData)
            setSuccess(true)
            toast.success('Job Posted Successfully!')
            setTimeout(() => {
                onClose()
                setSuccess(false)
                setFormData({
                    title: '',
                    company: '',
                    location: '',
                    salary: '',
                    description: '',
                    requirements: '',
                    qualifications: '',
                    hardSkills: '',
                    hardSkills: '',
                    softSkills: '',
                    companyLogo: '',
                    companyBackground: ''
                })
                if (onJobCreated) onJobCreated()
            }, 1000)
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to post job'
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
                        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <Briefcase className="w-6 h-6 mr-2 text-amber-400" />
                                Post a New Job
                            </h2>

                            {success ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Job Posted!</h3>
                                    <p className="text-slate-400">Candidates can now apply.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {error && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Job Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                                                placeholder="e.g. Senior Developer"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
                                                placeholder="e.g. TechCorp"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Company Logo URL</label>
                                            <input
                                                type="text"
                                                name="companyLogo"
                                                value={formData.companyLogo}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
                                                placeholder="https://... (Optional)"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Background Image URL</label>
                                            <input
                                                type="text"
                                                name="companyBackground"
                                                value={formData.companyBackground}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                                                placeholder="https://... (Optional)"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                                                    placeholder="e.g. Remote / NY"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Salary Range</label>
                                            <div className="relative">
                                                <Coins className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                                <input
                                                    type="text"
                                                    name="salary"
                                                    value={formData.salary}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
                                                    placeholder="e.g. $100k - $150k"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 min-h-[120px]"
                                            placeholder="Describe the role..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Requirements (One per line)</label>
                                        <div className="relative">
                                            <List className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                            <textarea
                                                name="requirements"
                                                value={formData.requirements}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 min-h-[100px]"
                                                placeholder="- React.js Experience&#10;- 3+ Years Coding"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Qualifications (One per line)</label>
                                        <textarea
                                            name="qualifications"
                                            value={formData.qualifications}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 min-h-[80px]"
                                            placeholder="- Master's Degree in CS&#10;- pHd in Data Science"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Hard Skills (One per line)</label>
                                            <textarea
                                                name="hardSkills"
                                                value={formData.hardSkills}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 min-h-[80px]"
                                                placeholder="React&#10;Node.js&#10;Python"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Soft Skills (One per line)</label>
                                            <textarea
                                                name="softSkills"
                                                value={formData.softSkills}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 min-h-[80px]"
                                                placeholder="Communication&#10;Leadership&#10;Problem Solving"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-xl text-black font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Posting...' : 'Post Job'}
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

export default CreateJobModal
