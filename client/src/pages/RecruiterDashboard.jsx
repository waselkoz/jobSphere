import { useState, useEffect } from 'react'
import client from '../api/client'
import { toast } from 'react-toastify'
import { Plus, Users, Briefcase, FileText, Download, Trash2, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import CreateJobModal from '../components/CreateJobModal'

const RecruiterDashboard = () => {
    const [jobs, setJobs] = useState([])
    const [selectedJob, setSelectedJob] = useState(null)
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const fetchMyJobs = async () => {
        try {
            const { data } = await client.get('/jobs/my')
            setJobs(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    const fetchApplications = async (jobId) => {
        try {
            const { data } = await client.get(`/applications/job/${jobId}`)
            setApplications(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchMyJobs()
    }, [])

    const handleSelectJob = (job) => {
        if (selectedJob?._id === job._id) {
            setSelectedJob(null) // Deselect
            setApplications([])
        } else {
            setSelectedJob(job)
            fetchApplications(job._id)
        }
    }

    const handleDeleteJob = async (e, jobId) => {
        e.stopPropagation()
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await client.delete(`/jobs/${jobId}`)
                toast.success('Job deleted successfully')
                fetchMyJobs()
                if (selectedJob?._id === jobId) setSelectedJob(null)
            } catch (error) {
                console.error(error)
                toast.error('Failed to delete job')
            }
        }
    }

    const getFileUrl = (path) => {
        if (!path) return '#';
        const cleanPath = path.replace(/\\/g, '/');
        return import.meta.env.MODE === 'production'
            ? `/${cleanPath}`
            : `http://localhost:5000/${cleanPath}`;
    };

    return (
        <div className="pt-24 px-6 max-w-7xl mx-auto min-h-screen pb-20">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Recruiter Dashboard</h1>
                    <p className="text-slate-400 text-lg">Manage your job postings and find your next star.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 hover:scale-105 text-black rounded-xl font-bold transition-all shadow-lg hover:shadow-amber-500/25"
                >
                    <Plus className="w-5 h-5" /> Post New Job
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Jobs List */}
                <div className="glass-card rounded-3xl p-6 md:p-8 h-fit">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <Briefcase className="w-6 h-6 mr-3 text-amber-400" />
                        Your Posted Jobs
                    </h2>

                    {loading ? (
                        <div className="text-amber-200/50 animate-pulse">Loading jobs...</div>
                    ) : jobs.length === 0 ? (
                        <div className="p-8 bg-white/5 rounded-2xl border border-white/5 text-center text-slate-500">
                            You haven't posted any jobs yet.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {jobs.map((job) => (
                                <motion.div
                                    key={job._id}
                                    onClick={() => handleSelectJob(job)}
                                    className={`group p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${selectedJob?._id === job._id
                                        ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                                        : 'bg-white/5 border-white/5 hover:bg-white/[0.08] hover:border-white/10'
                                        }`}
                                >
                                    <div className="relative z-10 flex justify-between items-start">
                                        <div>
                                            <h3 className={`text-lg font-bold mb-1 transition-colors ${selectedJob?._id === job._id ? 'text-amber-300' : 'text-white'}`}>{job.title}</h3>
                                            <p className="text-sm text-slate-400 font-medium">{job.location} • {job.salary}</p>
                                            <p className="text-xs text-slate-500 mt-2">Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <button
                                            onClick={(e) => handleDeleteJob(e, job._id)}
                                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Applications View */}
                <div className="glass-card rounded-3xl p-6 md:p-8 min-h-[500px]">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <Users className="w-6 h-6 mr-3 text-amber-400" />
                        Applications
                        {selectedJob && <span className="ml-2 text-slate-400 text-base font-normal">for <span className="text-amber-300">{selectedJob.title}</span></span>}
                    </h2>

                    {!selectedJob ? (
                        <div className="h-96 flex flex-col items-center justify-center bg-white/5 rounded-2xl border border-white/5 text-slate-500 p-8 text-center">
                            <Briefcase className="w-12 h-12 mb-4 opacity-20" />
                            <p>Select a job from the list to view its applicants.</p>
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="h-96 flex flex-col items-center justify-center bg-white/5 rounded-2xl border border-white/5 text-slate-500 p-8 text-center">
                            <Users className="w-12 h-12 mb-4 opacity-20" />
                            <p>No applications received for this job yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {applications.map((app) => (
                                <motion.div
                                    key={app._id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-6 bg-white/5 hover:bg-white/[0.08] rounded-2xl border border-white/5 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-bold text-white">{app.applicant?.username || 'Unknown Applicant'}</h4>
                                            <p className="text-sm text-slate-400">{app.applicant?.email}</p>
                                            <p className="text-xs text-slate-500 mt-1">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`px-3 py-1 text-xs rounded-full border ${app.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                            app.status === 'accepted' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                                                'bg-slate-500/10 text-slate-500 border-slate-500/20'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </div>

                                    {app.coverLetter && (
                                        <div className="mb-4 p-3 bg-black/40 border border-white/5 rounded-lg text-sm text-slate-300 italic">
                                            "{app.coverLetter}"
                                        </div>
                                    )}

                                    {app.resume && (
                                        <a
                                            href={getFileUrl(app.resume)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                                        >
                                            <FileText className="w-4 h-4" /> View Resume <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <CreateJobModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onJobCreated={fetchMyJobs}
            />
        </div>
    )
}

export default RecruiterDashboard
