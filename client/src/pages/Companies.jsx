import { motion } from 'framer-motion'
import { Building2, Globe, Users, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ActionSearchBar } from '../components/ui/action-search-bar'

const companies = [
    {
        name: 'TechFlow',
        description: 'Leading the way in digital transformation and cloud solutions.',
        location: 'algeria,el 7arach',
        employees: '1000-5000',
        color: 'from-blue-400 to-blue-600',
        rating: 4.8,
        reviews: 124
    },
    {
        name: 'StartUp Inc',
        description: 'Building the future of e-commerce with intelligent personalization.',
        location: 'algeria,blida',
        employees: '50-200',
        color: 'from-purple-400 to-purple-600',
        rating: 4.2,
        reviews: 8
    },
    {
        name: 'Creative Studio',
        description: 'Award-winning design agency crafting digital experiences.',
        location: 'algeria,zeralda',
        employees: '10-50',
        color: 'from-pink-400 to-pink-600',
        rating: 4.9,
        reviews: 45
    },
    {
        name: 'CloudSystems',
        description: 'Enterprise-grade infrastructure for mission-critical applications.',
        location: 'algeria,el biar',
        employees: '500-1000',
        color: 'from-emerald-400 to-emerald-600',
        rating: 4.6,
        reviews: 200
    },
    {
        name: 'InnovateNow',
        description: 'Incubating the next generation of unicorn startups.',
        location: 'algeria,bab zouar',
        employees: '200-500',
        color: 'from-orange-400 to-orange-600',
        rating: 4.4,
        reviews: 15
    },
    {
        name: 'DataCorp',
        description: 'Turning big data into actionable business intelligence.',
        location: 'algeria,djelfa',
        employees: '1000+',
        color: 'from-cyan-400 to-cyan-600',
        rating: 4.7,
        reviews: 5
    }
]

const Companies = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="pt-24 px-6 max-w-7xl mx-auto min-h-screen pb-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-500 dark:from-white dark:via-amber-200 dark:to-amber-400 mb-4">
                    Top Companies to Work For
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-8">
                    Discover companies that are shaping the future. From fast-growing startups to established tech giants.
                </p>

                <div className="max-w-xl mx-auto">
                    <ActionSearchBar
                        onSearch={setSearchTerm}
                        placeholder="Search companies by name or keyword..."
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCompanies.map((company, index) => (
                    <motion.div
                        key={company.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white/60 dark:bg-white/5 backdrop-blur-md border border-blue-200 dark:border-white/10 rounded-3xl p-8 hover:bg-blue-50/50 dark:hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-amber-500/10 overflow-hidden"
                    >
                        {/* Dynamic Background Gradient */}
                        <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${company.color} opacity-0 group-hover:opacity-10 blur-3xl rounded-full transition-opacity duration-500`} />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/50 dark:bg-white/10 flex items-center justify-center border border-blue-100 dark:border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner relative">
                                    <Building2 className="text-blue-600 dark:text-white w-7 h-7" />
                                    {company.rating > 4.5 && company.reviews > 10 && (
                                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-white dark:border-slate-900 flex items-center">
                                            <span>TOP</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center text-xs font-bold text-blue-600 dark:text-yellow-400 bg-blue-100 dark:bg-yellow-400/10 px-3 py-1.5 rounded-full mb-1">
                                        <Trophy className="w-3 h-3 mr-1" />
                                        {company.rating}
                                    </div>
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{company.reviews} reviews</span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-amber-300 transition-colors">{company.name}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed flex-grow">{company.description}</p>

                            <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/5">
                                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                    <Globe className="w-4 h-4 mr-3 text-cyan-500 dark:text-amber-400" />
                                    {company.location}
                                </div>
                                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                    <Users className="w-4 h-4 mr-3 text-blue-500 dark:text-yellow-400" />
                                    {company.employees} Employees
                                </div>
                            </div>

                            <Link
                                to={`/jobs?keyword=${encodeURIComponent(company.name)}`}
                                className="mt-8 block w-full py-3.5 text-center rounded-xl bg-white/50 dark:bg-white/5 border border-blue-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold hover:bg-blue-600 dark:hover:bg-amber-600 hover:border-blue-500 dark:hover:border-amber-500 hover:text-white dark:hover:text-black transition-all shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-amber-500/20"
                            >
                                View Open Positions
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Companies
// Forced update
