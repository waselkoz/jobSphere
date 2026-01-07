import { useState, useEffect } from 'react'
import client from '../api/client'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, Building2, CheckCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const MyApplications = () => {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const { data } = await client.get('/applications/me')
                setApplications(data)
            } catch (error) {
                console.error('Error fetching applications:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchApplications()
    }, [])

    if (loading) {
        return <div className="min-h-screen pt-32 text-center text-slate-500">Loading your journey...</div>
    }

    return (
        <div className="pt-32 px-6 max-w-5xl mx-auto min-h-screen pb-20">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500 dark:from-white dark:to-amber-400 mb-8">
                My Applications
            </h1>

            {applications.length === 0 ? (
                <div className="text-center py-20 bg-white/50 dark:bg-white/5 rounded-3xl border border-blue-100 dark:border-white/10">
                    <Briefcase className="w-16 h-16 text-blue-200 dark:text-slate-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No applications yet</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">You haven't applied to any jobs yet. Your next adventure awaits!</p>
                    <Link to="/jobs" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors">
                        Browse Jobs
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {applications.map((app, index) => (
                        <motion.div
                            key={app._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-blue-100 dark:border-white/10 p-6 rounded-2xl hover:shadow-lg hover:border-blue-300 dark:hover:border-amber-500/30 transition-all group"
                        >
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors">
                                        {app.job?.title || 'Job Title Unavailable'}
                                    </h2>
                                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Building2 className="w-4 h-4 text-blue-500" />
                                            {app.job?.company || 'Unknown Company'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4 text-cyan-500" />
                                            {app.job?.location || 'Location N/A'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            Applied {new Date(app.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 font-medium text-sm border border-blue-100 dark:border-blue-800 flex items-center gap-2">
                                        {/* Since status isn't in the model yet, we mock 'Applied' or verify if the user submitted it */}
                                        <CheckCircle className="w-4 h-4" />
                                        Applied
                                    </div>
                                    <Link
                                        to={`/jobs/${app.job?._id}`}
                                        className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                                        title="View Job"
                                    >
                                        <Briefcase className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyApplications
