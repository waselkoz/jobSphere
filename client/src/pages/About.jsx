import { motion } from 'framer-motion'

const About = () => {
    return (
        <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-20">
            {/* Mission Section */}
            <div className="text-center mb-24">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-500 dark:from-white dark:via-amber-200 dark:to-amber-400 mb-6"
                >
                    Connecting Potential <br /> with Possibility
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
                >
                    JobSphere is more than a job board. We are a global network dedicated to empowering professionals
                    and helping forward-thinking companies build their dream teams.
                </motion.p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                {[
                    { title: 'Innovation', desc: 'We embrace the latest technology to create seamless recruiting experiences.' },
                    { title: 'Transparency', desc: 'We believe in open communication, clear salary ranges, and honest feedback.' },
                    { title: 'Inclusivity', desc: 'Talent has no borders. We champion diverse workplaces across the globe.' }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-white/60 dark:bg-white/5 border border-blue-100 dark:border-white/10 hover:shadow-xl transition-all"
                    >
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Team Section */}
            <div className="bg-blue-50/50 dark:bg-white/5 rounded-3xl p-12 md:p-20 text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Built by Developers, for Developers</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                    We understand the challenges of job hunting because we've been there. Our mission is to make the process as human and efficient as possible.
                </p>
            </div>
        </div>
    )
}

export default About
