import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-9xl font-black text-blue-100 dark:text-white/5 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Page Not Found</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="px-8 py-3 rounded-full bg-blue-600 dark:bg-amber-500 text-white dark:text-black font-bold hover:bg-blue-700 dark:hover:bg-amber-400 transition-colors shadow-lg"
            >
                Return Home
            </Link>
        </div>
    )
}

export default NotFound
