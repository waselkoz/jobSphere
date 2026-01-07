import { motion } from 'framer-motion'

const JobSkeleton = () => {
    return (
        <div className="glass-card rounded-2xl p-6 border border-slate-100 dark:border-white/5">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                <div className="flex-1 flex items-center gap-4">
                    {/* Logo Skeleton */}
                    <motion.div
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-16 h-16 rounded-xl bg-slate-200 dark:bg-white/10 shrink-0"
                    />
                    <div className="w-full">
                        {/* Title Skeleton */}
                        <motion.div
                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                            className="h-6 w-1/3 bg-slate-200 dark:bg-white/10 rounded-md mb-3"
                        />
                        {/* Tags Skeleton */}
                        <div className="flex gap-4">
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 + (i * 0.1) }}
                                    className="h-8 w-24 bg-slate-100 dark:bg-white/5 rounded-lg"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {/* Button Skeleton */}
                <motion.div
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    className="h-12 w-32 bg-slate-200 dark:bg-white/10 rounded-xl"
                />
            </div>
        </div>
    )
}

export const JobListSkeleton = () => {
    return (
        <div className="grid gap-4">
            {[1, 2, 3, 4].map((i) => (
                <JobSkeleton key={i} />
            ))}
        </div>
    )
}

export default JobSkeleton
