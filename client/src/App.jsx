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
import Navbar from './components/Navbar'
import Footer from './components/Footer'

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
