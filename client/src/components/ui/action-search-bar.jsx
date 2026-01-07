"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Send,
    BarChart2,
    Globe,
    Video,
    PlaneTakeoff,
    AudioLines,
} from "lucide-react";

function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

const allActions = [
    {
        id: "1",
        label: "Software Engineer",
        icon: <PlaneTakeoff className="h-4 w-4 text-blue-500" />,
        description: "Job Title",
        short: "Job",
        end: "Search",
    },
    {
        id: "2",
        label: "React Developer",
        icon: <BarChart2 className="h-4 w-4 text-orange-500" />,
        description: "Skill / Title",
        short: "Tech",
        end: "Search",
    },
    {
        id: "3",
        label: "TechFlow",
        icon: <Video className="h-4 w-4 text-purple-500" />,
        description: "Company",
        short: "Biz",
        end: "Search",
    },
    {
        id: "4",
        label: "Remote",
        icon: <AudioLines className="h-4 w-4 text-green-500" />,
        description: "Location",
        short: "Loc",
        end: "Search",
    },
    {
        id: "5",
        label: "Full Stack",
        icon: <Globe className="h-4 w-4 text-blue-500" />,
        description: "Role",
        short: "Role",
        end: "Search",
    },
    {
        id: "6",
        label: "UI/UX Designer",
        icon: <BarChart2 className="h-4 w-4 text-pink-500" />,
        description: "Job Title",
        short: "Job",
        end: "Search",
    },
    {
        id: "7",
        label: "DevOps Engineer",
        icon: <PlaneTakeoff className="h-4 w-4 text-red-500" />,
        description: "Job Title",
        short: "Job",
        end: "Search",
    },
    {
        id: "8",
        label: "Data Scientist",
        icon: <BarChart2 className="h-4 w-4 text-indigo-500" />,
        description: "Job Title",
        short: "Job",
        end: "Search",
    },
    {
        id: "9",
        label: "Algeria",
        icon: <AudioLines className="h-4 w-4 text-green-600" />,
        description: "Location",
        short: "Loc",
        end: "Search",
    },
    {
        id: "10",
        label: "StartUp Inc",
        icon: <Video className="h-4 w-4 text-purple-500" />,
        description: "Company",
        short: "Biz",
        end: "Search",
    },
    {
        id: "11",
        label: "Flutter",
        icon: <Globe className="h-4 w-4 text-blue-400" />,
        description: "Skill",
        short: "Tech",
        end: "Search",
    },
    {
        id: "12",
        label: "Cybersecurity",
        icon: <PlaneTakeoff className="h-4 w-4 text-slate-500" />,
        description: "Field",
        short: "Sec",
        end: "Search",
    }
];

function ActionSearchBar({ actions = allActions, onSearch, placeholder = "Search jobs, skills, or companies..." }) {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);
    const debouncedQuery = useDebounce(query, 200);

    useEffect(() => {
        if (!isFocused) {
            setResult(null);
            return;
        }

        // Show all actions if query is empty
        if (!query || query.trim() === '') {
            setResult({ actions: allActions.slice(0, 5) }); // Show top 5 defaults
            return;
        }

        const normalizedQuery = query.toLowerCase().trim();
        const filteredActions = allActions.filter((action) => {
            const searchableText = action.label.toLowerCase();
            return searchableText.includes(normalizedQuery);
        });

        // Only show results if we found something
        if (filteredActions.length > 0) {
            setResult({ actions: filteredActions });
        } else {
            setResult(null);
        }
    }, [query, isFocused]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(query);
            setIsFocused(false);
        }
    }

    const container = {
        hidden: { opacity: 0, height: 0 },
        show: {
            opacity: 1,
            height: "auto",
            transition: {
                height: {
                    duration: 0.4,
                },
                staggerChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                height: {
                    duration: 0.3,
                },
                opacity: {
                    duration: 0.2,
                },
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
            },
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.2,
            },
        },
    };

    const handleFocus = () => {
        setSelectedAction(null);
        setIsFocused(true);
    };

    const handleSelectAction = (action) => {
        setSelectedAction(action);
        setQuery(action.label);
        if (onSearch) onSearch(action.label);
        setIsFocused(false);
    }

    return (
        <div className="w-full">
            <div className="relative flex flex-col justify-start items-center">
                <div className="w-full sticky top-0 z-10">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder={placeholder}
                            value={query}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onKeyDown={handleKeyDown}
                            onBlur={() =>
                                setTimeout(() => setIsFocused(false), 200)
                            }
                            className="bg-white/50 dark:bg-white/10 backdrop-blur-xl border-blue-200 dark:border-white/10 pl-12 pr-12 py-6 h-16 text-lg rounded-2xl shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500/50 transition-all w-full text-slate-900 dark:text-white placeholder:text-slate-400"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6">
                            <Search className="w-6 h-6 text-blue-500 dark:text-amber-400" />
                        </div>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5">
                            <AnimatePresence mode="popLayout">
                                {query.length > 0 ? (
                                    <motion.div
                                        key="send"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Send className="w-5 h-5 text-blue-600 dark:text-amber-400 cursor-pointer" onClick={() => onSearch && onSearch(query)} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="search"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {/* Optional decorative icon when empty */}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="w-full absolute top-[70px] z-50">
                    <AnimatePresence>
                        {isFocused && result && !selectedAction && (
                            <motion.div
                                className="w-full border border-blue-100 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md mt-1"
                                variants={container}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                            >
                                <motion.ul>
                                    {result.actions.map((action) => (
                                        <motion.li
                                            key={action.id}
                                            className="px-4 py-3 flex items-center justify-between hover:bg-blue-50 dark:hover:bg-white/5 cursor-pointer transition-colors border-b border-gray-50 dark:border-white/5 last:border-0"
                                            variants={item}
                                            layout
                                            onClick={() => handleSelectAction(action)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 dark:bg-white/10 rounded-lg">
                                                    {action.icon}
                                                </div>
                                                <div>
                                                    <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                                                        {action.label}
                                                    </span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                                        {action.description}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-white/10 rounded text-slate-500 dark:text-slate-400">
                                                    {action.short}
                                                </span>
                                            </div>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export { ActionSearchBar };
