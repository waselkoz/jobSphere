import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Briefcase, LogOut, Shield, Moon, Sun } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Companies from './pages/Companies'
import JobDetails from './pages/JobDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import RecruiterDashboard from './pages/RecruiterDashboard'
import MyApplications from './pages/MyApplications'
import Profile from './pages/Profile'
import About from './pages/About'
import NotFound from './pages/NotFound'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Footer from './components/Footer'

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-black/[0.05] dark:border-white/[0.05] transition-all duration-300">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-amber-600 dark:to-yellow-500 rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-amber-500/20 group-hover:shadow-blue-500/40 dark:group-hover:shadow-amber-500/40 transition-all duration-300 group-hover:scale-105">
          <Briefcase className="w-5 h-5 text-white dark:text-black" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900 dark:from-white dark:to-amber-100/80 group-hover:from-blue-600 group-hover:to-cyan-600 dark:group-hover:from-amber-300 dark:group-hover:to-yellow-300 transition-all duration-300">
          JobSphere
        </span>
      </Link>

      <div className="flex gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5 backdrop-blur-sm">
        <Link to="/jobs" className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all">Find Jobs</Link>
        <Link to="/companies" className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all">Companies</Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-500/10 dark:hover:bg-white/10 rounded-lg transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {user && (
          <div className="relative group">
            <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-500/10 dark:hover:bg-white/10 rounded-lg transition-colors">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                {user.warnings?.length > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-white dark:border-black"></span>}
              </div>
            </button>
            {user.warnings?.length > 0 && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-50">
                <div className="p-3 border-b border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 font-semibold text-sm">Notifications</div>
                <div className="max-h-64 overflow-y-auto">
                  {user.warnings.map((w, i) => (
                    <div key={i} className="p-3 border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 text-sm">
                      <p className="text-red-500 font-medium mb-1">⚠️ Admin Warning</p>
                      <p className="text-slate-600 dark:text-slate-300">{w.message}</p>
                      <p className="text-xs text-slate-400 mt-2">{new Date(w.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

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
            <div className="text-right hidden md:block">
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
    </nav>
  )
}

function App() {
  return (
    // ThemeProvider is now in main.jsx
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-sans overflow-x-hidden relative transition-colors duration-300">
          <ToastContainer position="top-right" theme="dark" />
          {/* Enhanced Background Gradients */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Deep Space Background */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-black transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-200/60 dark:from-amber-700/20 dark:via-black dark:to-black transition-colors duration-300" />


            {/* Golden/Dark Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-400/20 dark:bg-amber-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10000ms]" />
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/20 dark:bg-yellow-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[7000ms]" />
            <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-300/20 dark:bg-orange-600/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
          </div>

          <Navbar />

          {/* Routes */}
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/recruiter" element={<RecruiterDashboard />} />
              <Route path="/my-applications" element={<MyApplications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
