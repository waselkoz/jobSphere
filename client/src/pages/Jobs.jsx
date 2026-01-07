import { useState, useEffect } from 'react'
import client from '../api/client'
import { Search, MapPin, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ActionSearchBar } from '../components/ui/action-search-bar'
import { JobListSkeleton } from '../components/ui/JobSkeleton'

const Jobs = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams] = useSearchParams()
    const initialKeyword = searchParams.get('keyword') || ''
    const [keyword, setKeyword] = useState(initialKeyword)
    const { user } = useAuth()
    const navigate = useNavigate()

    const fetchJobs = async (search = '') => {
        try {
            const { data } = await client.get(`/jobs?keyword=${search}`)
            setJobs(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJobs(initialKeyword)
    }, [initialKeyword])

    const handleSearch = (e) => {
        e.preventDefault()
        fetchJobs(keyword)
    }

    const handleApply = async (jobId) => {
        if (!user) {
            alert('Please sign in to apply for jobs.')
            navigate('/login')
            return
        }

        try {
            await client.post('/applications', { jobId })
            alert('Application submitted successfully!')
        } catch (error) {
            console.error(error)
            alert(error.response?.data?.message || 'Failed to apply')
        }
    }

    return (
        <div className="pt-24 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-white dark:to-slate-400">
                        Explore Opportunities
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">Find your next career move in the metaverse.</p>
                </div>

                {/* Search Bar */}
                <div className="w-full md:w-auto relative z-50">
                    <ActionSearchBar
                        onSearch={(term) => {
                            setKeyword(term)
                            fetchJobs(term)
                        }}
                        placeholder="Search jobs, main..."
                    />
                </div>
            </div>

            {loading ? (
                <JobListSkeleton />
            ) : (
                <div className="grid gap-4">
                    {jobs.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-24 bg-white/50 dark:bg-white/5 rounded-3xl border border-blue-100 dark:border-white/5 backdrop-blur-sm shadow-xl"
                        >
                            <div className="w-24 h-24 bg-blue-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-10 h-10 text-blue-400 dark:text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No jobs found</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                                We couldn't find any matches for "{keyword}". Try removing filters or checking for typos.
                            </p>
                            <button
                                onClick={() => {
                                    setKeyword('')
                                    fetchJobs('')
                                }}
                                className="mt-8 px-6 py-2 bg-blue-600 dark:bg-white text-white dark:text-black font-semibold rounded-full hover:shadow-lg transition-all"
                            >
                                Clear Search
                            </button>
                        </motion.div>
                    ) : (
                        jobs.map((job, i) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group glass-card rounded-2xl p-6 hover:bg-blue-50/80 dark:hover:bg-white/[0.08] hover:border-blue-500/30 dark:hover:border-amber-500/30 hover:shadow-blue-500/10 dark:hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-white p-1 shadow-sm shrink-0 border border-slate-100 dark:border-white/10">
                                            {job.companyLogo ? (
                                                <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain rounded-lg" />
                                            ) : (
                                                <div className="w-full h-full bg-slate-50 dark:bg-white/5 rounded-lg flex items-center justify-center">
                                                    <Building2 className="w-8 h-8 text-slate-300" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors">
                                                {job.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                                                <span className="flex items-center gap-1.5 px-3 py-1 bg-white/50 dark:bg-white/5 rounded-lg border border-blue-100 dark:border-white/5">
                                                    <Building2 className="w-4 h-4 text-blue-500 dark:text-amber-400" /> {job.company}
                                                </span>
                                                <span className="flex items-center gap-1.5 px-3 py-1 bg-white/50 dark:bg-white/5 rounded-lg border border-blue-100 dark:border-white/5">
                                                    <MapPin className="w-4 h-4 text-cyan-500 dark:text-amber-200" /> {job.location}
                                                </span>
                                                <span className="flex items-center gap-1.5 px-3 py-1 bg-white/50 dark:bg-white/5 rounded-lg border border-blue-100 dark:border-white/5">
                                                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">DA</span> {job.salary}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/jobs/${job._id}`)}
                                        className="px-6 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-blue-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold hover:bg-blue-600 dark:hover:bg-amber-600 hover:border-blue-500 dark:hover:border-amber-500 hover:text-white dark:hover:text-black transition-all shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-amber-500/25 whitespace-nowrap"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default Jobs
