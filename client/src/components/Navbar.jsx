import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Briefcase, LogOut, Shield, Moon, Sun, Menu, X, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMenuOpen(false);
    }

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/[0.05] dark:border-white/[0.05] transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-amber-600 dark:to-yellow-500 rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-amber-500/20 group-hover:shadow-blue-500/40 dark:group-hover:shadow-amber-500/40 transition-all duration-300 group-hover:scale-105">
                            <Briefcase className="w-5 h-5 text-white dark:text-black" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900 dark:from-white dark:to-amber-100/80 group-hover:from-blue-600 group-hover:to-cyan-600 dark:group-hover:from-amber-300 dark:group-hover:to-yellow-300 transition-all duration-300">
                            JobSphere
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5 backdrop-blur-sm">
                        <Link to="/jobs" className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all">Find Jobs</Link>
                        <Link to="/companies" className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all">Companies</Link>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-500/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4 pl-4 border-l border-black/10 dark:border-white/10">
                                {user.realm === 'admin' && (
                                    <Link to="/admin" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold hover:bg-amber-500/20 transition-all">
                                        <Shield className="w-3 h-3" /> Admin
                                    </Link>
                                )}
                                {user.realm === 'recruiter' && (
                                    <Link to="/recruiter" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border border-yellow-500/20 text-xs font-semibold hover:bg-yellow-500/20 transition-all">
                                        <Briefcase className="w-3 h-3" /> Dashboard
                                    </Link>
                                )}
                                {user.realm === 'candidate' && (
                                    <Link to="/my-applications" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-semibold hover:bg-blue-500/20 transition-all">
                                        <Briefcase className="w-3 h-3" /> My Applications
                                    </Link>
                                )}
                                <div className="text-right">
                                    <Link to="/profile" className="text-sm font-medium text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">{user.username}</Link>
                                    <div className="text-xs text-slate-500 dark:text-slate-500 capitalize">{user.realm}</div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-slate-400 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link to="/login" className="px-5 py-2 text-sm font-medium text-slate-700 dark:text-white hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                                    Sign In
                                </Link>
                                <Link to="/register" className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-amber-600 to-yellow-500 text-white dark:text-black font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/25 active:scale-95 transition-all">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300 rounded-lg transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-black/5 dark:border-white/5 shadow-2xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">
                    <Link to="/jobs" onClick={closeMenu} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-medium">
                        <Briefcase className="w-5 h-5" /> Find Jobs
                    </Link>
                    <Link to="/companies" onClick={closeMenu} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-medium">
                        <Shield className="w-5 h-5" /> Companies
                    </Link>

                    <div className="h-px bg-slate-100 dark:bg-white/10 my-2" />

                    {user ? (
                        <>
                            <div className="px-3 py-2">
                                <div className="text-sm font-medium text-slate-900 dark:text-white">{user.username}</div>
                                <div className="text-xs text-slate-500 capitalize">{user.realm}</div>
                            </div>

                            <Link to="/profile" onClick={closeMenu} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-medium">
                                <User className="w-5 h-5" /> My Profile
                            </Link>

                            {user.realm === 'admin' && (
                                <Link to="/admin" onClick={closeMenu} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-medium">
                                    <Shield className="w-5 h-5 text-amber-500" /> Admin Dashboard
                                </Link>
                            )}
                            {user.realm === 'recruiter' && (
                                <Link to="/recruiter" onClick={closeMenu} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-medium">
                                    <Briefcase className="w-5 h-5 text-yellow-500" /> Recruiter Dashboard
                                </Link>
                            )}
                            {user.realm === 'candidate' && (
                                <Link to="/my-applications" onClick={closeMenu} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-medium">
                                    <Briefcase className="w-5 h-5 text-blue-500" /> My Applications
                                </Link>
                            )}

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 font-medium w-full text-left"
                            >
                                <LogOut className="w-5 h-5" /> Sign Out
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3 mt-2">
                            <Link to="/login" onClick={closeMenu} className="w-full py-3 text-center font-medium border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5">
                                Sign In
                            </Link>
                            <Link to="/register" onClick={closeMenu} className="w-full py-3 text-center font-bold bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-xl shadow-lg">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar
