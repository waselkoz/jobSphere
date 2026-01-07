import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        const result = await login(formData.email, formData.password)

        if (result.success) {
            toast.success('Login successful!')
            navigate('/')
        } else {
            console.error('Login failed:', result)
            toast.error(result.message || 'Login failed. Please check your credentials.')
            setError(result.message || 'Login failed. Please check your credentials.')
        }
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
            <div className="w-full max-w-md p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-blue-200 dark:border-white/10 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-slate-900 dark:text-white">Welcome Back</h2>
                {error && (
                    <div className="p-3 mb-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-600 dark:text-red-200 text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-amber-100/80 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 border border-blue-200 dark:border-amber-500/20 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-amber-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-amber-200/20"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-amber-100/80 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 border border-blue-200 dark:border-amber-500/20 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-amber-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-amber-200/20"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-amber-600 dark:to-yellow-500 hover:shadow-lg hover:shadow-blue-600/20 dark:hover:shadow-amber-600/20 text-white dark:text-black font-bold rounded-lg transition-all border border-blue-400/20 dark:border-amber-400/20">
                        Sign In
                    </button>
                </form>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-slate-50 dark:bg-black text-slate-500">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                        type="button"
                        onClick={() => toast.info('To enable Google Auth, configure passport-google-oauth20 in backend with your Client ID.')}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-300 font-medium text-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </button>
                    <button
                        type="button"
                        onClick={() => toast.info('To enable GitHub Auth, configure passport-github2 in backend with your Client ID.')}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-300 font-medium text-sm"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                    </button>
                </div>

                <p className="mt-6 text-center text-slate-600 dark:text-amber-200/60 text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 dark:text-amber-400 hover:text-blue-500 dark:hover:text-amber-300">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
