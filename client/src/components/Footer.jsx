import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Github, Mail, Globe } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="relative z-10 bg-white/60 dark:bg-black/40 backdrop-blur-xl border-t border-blue-100 dark:border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900 dark:from-white dark:to-amber-100/80 mb-4 inline-block">
                            JobSphere
                        </Link>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                            Connecting exceptional talent with world-class opportunities. Your future starts here.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full bg-blue-50 dark:bg-white/5 text-blue-600 dark:text-amber-400 hover:bg-blue-100 dark:hover:bg-amber-500/20 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-blue-50 dark:bg-white/5 text-blue-600 dark:text-amber-400 hover:bg-blue-100 dark:hover:bg-amber-500/20 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-blue-50 dark:bg-white/5 text-blue-600 dark:text-amber-400 hover:bg-blue-100 dark:hover:bg-amber-500/20 transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Newsletter - New Section */}
                    <div className="col-span-1 md:col-span-1">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Stay Updated</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Subscribe to our newsletter for the latest job market trends.
                        </p>
                        <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-lg bg-white dark:bg-white/5 border border-blue-100 dark:border-white/10 focus:outline-none focus:border-blue-500 dark:focus:border-amber-400 text-sm"
                            />
                            <button className="px-4 py-2 bg-blue-600 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:shadow-lg hover:bg-blue-700 dark:hover:bg-slate-200 transition-all text-sm">
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link to="/jobs" className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors">Browse Jobs</Link></li>
                            <li><Link to="/companies" className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors">Top Companies</Link></li>
                            <li><Link to="/login" className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors">Sign In</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors">Press</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-blue-100 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">
                        © {new Date().getFullYear()} JobSphere Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <Globe className="w-4 h-4" />
                        <span>English (US)</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
