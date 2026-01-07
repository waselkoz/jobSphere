import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [jobs, setJobs] = useState([])
    const { user, loading: authLoading } = useAuth()
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const [usersRes, jobsRes] = await Promise.all([
                client.get('/admin/users'),
                client.get('/jobs')
            ])
            setUsers(usersRes.data)
            setJobs(jobsRes.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        // Protected Route Logic
        if (!authLoading && (!user || user.realm !== 'admin')) {
            navigate('/')
            return
        }

        if (user && user.realm === 'admin') {
            fetchData()
        }
    }, [user, authLoading, navigate])

    const handleDeleteJob = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return
        try {
            await client.delete(`/jobs/${id}`)
            toast.success('Job deleted successfully')
            setJobs(jobs.filter(job => job._id !== id))
        } catch (error) {
            console.error("Failed to delete job", error)
            toast.error("Failed to delete job")
        }
    }

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user? This cannot be undone.')) return
        try {
            await client.delete(`/admin/users/${id}`)
            toast.success('User deleted successfully')
            setUsers(users.filter(u => u._id !== id))
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete user")
        }
    }

    const handleToggleBan = async (id, currentStatus) => {
        try {
            const { data } = await client.put(`/admin/users/${id}/status`, {})
            toast.success(data.message)
            setUsers(users.map(u => u._id === id ? { ...u, isBanned: data.isBanned } : u))
        } catch (error) {
            toast.error("Failed to update user status")
        }
    }

    const handleSendWarning = async (id, username) => {
        const message = window.prompt(`Enter warning message for ${username}:`)
        if (!message) return

        try {
            await client.post(`/admin/users/${id}/warning`,
                { message }
            )
            toast.success(`Warning sent to ${username}`)
        } catch (error) {
            toast.error("Failed to send warning")
        }
    }

    if (loading || authLoading) return <div className="text-white text-center pt-20">Loading...</div>

    return (
        <div className="pt-24 px-6 max-w-7xl mx-auto min-h-screen pb-20">
            <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Admin Dashboard</h1>

            {/* Users Section */}
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xl mb-12">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">User Management</h2>
                </div>

                <div className="overflow-x-auto max-h-96">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-sm z-10">
                            <tr className="text-slate-600 dark:text-slate-300">
                                <th className="px-6 py-3 font-medium">Username</th>
                                <th className="px-6 py-3 font-medium">Email</th>
                                <th className="px-6 py-3 font-medium">Role</th>
                                <th className="px-6 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                            {users.map((u) => (
                                <tr key={u._id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                        {u.username}
                                        {u.isBanned && <span className="ml-2 text-xs bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-500 px-2 py-0.5 rounded">BANNED</span>}
                                    </td>
                                    <td className="px-6 py-4">{u.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${u.realm === 'admin'
                                            ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                                            : u.realm === 'recruiter'
                                                ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-500 dark:border-yellow-500/20'
                                                : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20'
                                            }`}>
                                            {u.realm}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        {/* Actions */}
                                        {u.realm !== 'admin' && (
                                            <>
                                                <button
                                                    onClick={() => handleSendWarning(u._id, u.username)}
                                                    className="px-3 py-1 bg-yellow-100 text-yellow-700 border border-yellow-200 rounded-md hover:bg-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20 dark:hover:bg-yellow-500 dark:hover:text-black transition-colors text-xs"
                                                >
                                                    Warn
                                                </button>
                                                <button
                                                    onClick={() => handleToggleBan(u._id, u.isBanned)}
                                                    className={`px-3 py-1 rounded-md text-xs border transition-colors ${u.isBanned
                                                        ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20 dark:hover:bg-green-500/20'
                                                        : 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20 dark:hover:bg-orange-500/20'
                                                        }`}
                                                >
                                                    {u.isBanned ? 'Enable' : 'Disable'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(u._id)}
                                                    className="px-3 py-1 bg-red-100 text-red-700 border border-red-200 rounded-md hover:bg-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20 dark:hover:bg-red-500 dark:hover:text-white transition-colors text-xs"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Jobs Section */}
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Job Listings Management</h2>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{jobs.length} Active Jobs</span>
                </div>

                <div className="overflow-x-auto max-h-96">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-sm z-10">
                            <tr className="text-slate-600 dark:text-slate-300">
                                <th className="px-6 py-3 font-medium">Title</th>
                                <th className="px-6 py-3 font-medium">Company</th>
                                <th className="px-6 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                            {jobs.map((job) => (
                                <tr key={job._id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{job.title}</td>
                                    <td className="px-6 py-4">{job.company}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDeleteJob(job._id)}
                                            className="px-3 py-1 bg-red-100 text-red-700 border border-red-200 rounded-md hover:bg-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20 dark:hover:bg-red-500 dark:hover:text-white transition-colors text-xs"
                                        >
                                            Delete
                                        </button>
                                        {/* Placeholder for Warn Recruiter */}
                                        <button
                                            className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-700 border border-yellow-200 rounded-md hover:bg-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20 dark:hover:bg-yellow-500 dark:hover:text-black transition-colors text-xs"
                                            onClick={() => toast.info(`Warning sent to recruiter for job: ${job.title}`)}
                                        >
                                            Warn Recruiter
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
