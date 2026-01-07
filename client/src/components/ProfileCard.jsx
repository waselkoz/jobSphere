import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import {
    Clock,
    Mail,
    ArrowUpRight,
    Globe,
    Briefcase,
    Code,
    Award,
    MapPin,
    Camera,
    Edit2,
    Save,
    X,
    Plus,
    Trash2
} from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";

export default function ProfileCard({
    user = {},
    initialData = {},
    onSave,
    avatarSrc = null,
    statusColor = "bg-emerald-500",
    className,
}) {
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [role, setRole] = useState("Software Engineer");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [statusText, setStatusText] = useState("Open to Work");
    const [skills, setSkills] = useState(["React", "Node.js"]);
    const [qualifications, setQualifications] = useState([]);
    const [projects, setProjects] = useState([]);

    // UI State
    const [newSkill, setNewSkill] = useState("");
    const [copied, setCopied] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [avatar, setAvatar] = useState(avatarSrc);
    const fileInputRef = useRef(null);

    // Initialize state from props
    useEffect(() => {
        if (initialData) {
            setRole(initialData.title || (user?.realm === 'recruiter' ? 'Recruiter' : user?.realm === 'admin' ? 'Administrator' : 'Software Engineer'));
            setBio(initialData.bio || "");
            setLocation(initialData.location || "");
            setStatusText(initialData.statusText || "Open to Work");
            if (initialData.skills && initialData.skills.length > 0) setSkills(initialData.skills);

            if (initialData.qualifications) {
                setQualifications(initialData.qualifications.map((q, index) => ({
                    id: index + 1,
                    title: q.degree,
                    institution: q.institution,
                    year: q.year
                })));
            }

            if (initialData.projects) {
                setProjects(initialData.projects.map((p, index) => ({
                    id: index + 1,
                    title: p.title,
                    description: p.description,
                    tags: p.tags || [],
                    link: p.link || ""
                })));
            }
        }
    }, [initialData, user]);

    const handleSaveProfile = () => {
        const profileData = {
            title: role,
            bio,
            location,
            skills,
            statusText,
            qualifications: qualifications.map(q => ({
                degree: q.title,
                institution: q.institution,
                year: q.year
            })),
            projects: projects.map(p => ({
                title: p.title,
                description: p.description,
                tags: p.tags,
                link: p.link
            }))
        };
        onSave(profileData);
        setIsEditing(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    // Skill Handlers
    const addSkill = (e) => {
        e.preventDefault();
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    // Qualification Handlers
    const addQualification = () => {
        setQualifications([...qualifications, { id: Date.now(), title: "", institution: "", year: "" }]);
    };

    const updateQualification = (id, field, value) => {
        setQualifications(qualifications.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const removeQualification = (id) => {
        setQualifications(qualifications.filter(q => q.id !== id));
    };

    // Project Handlers
    const addProject = () => {
        setProjects([...projects, { id: Date.now(), title: "", description: "", tags: [] }]);
    };

    const updateProject = (id, field, value) => {
        setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const removeProject = (id) => {
        setProjects(projects.filter(p => p.id !== id));
    };

    const timeText = useMemo(() => {
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes().toString().padStart(2, "0");
        const hour12 = ((h + 11) % 12) + 1;
        const ampm = h >= 12 ? "PM" : "AM";
        return `${hour12}:${m} ${ampm}`;
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(user?.email || "");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn("relative w-full max-w-4xl mx-auto flex justify-center items-center py-12", className)}
        >
            <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 opacity-10 blur-3xl" />
            </div>

            <Card className="group relative overflow-hidden rounded-3xl border border-blue-500/20 dark:border-amber-500/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-2xl w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10 dark:from-amber-600/10 dark:to-yellow-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-700 dark:from-amber-500 dark:via-yellow-500 dark:to-amber-700" />

                <CardContent className="relative p-8 sm:p-10">
                    <button
                        onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-blue-500 dark:hover:text-amber-500 hover:bg-blue-500/10 dark:hover:bg-amber-500/10 rounded-full transition-all z-20"
                        title={isEditing ? "Save Profile" : "Edit Profile"}
                    >
                        {isEditing ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                    </button>

                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="relative flex items-center justify-center h-3 w-3">
                                <span className={cn("absolute h-3 w-3 rounded-full animate-pulse", statusColor)} />
                                <span className={cn("absolute h-3 w-3 rounded-full", statusColor, "animate-ping")} />
                            </div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={statusText}
                                    onChange={(e) => setStatusText(e.target.value)}
                                    className="bg-transparent border-b border-blue-500/30 dark:border-amber-500/30 text-sm font-medium text-slate-500 dark:text-slate-300 focus:outline-none focus:border-blue-500 dark:focus:border-amber-500"
                                />
                            ) : (
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-300">{statusText}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-mono">{timeText}</span>
                        </div>
                    </div>

                    <div className="mb-8 flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={cn("relative group/avatar cursor-pointer")}
                                onClick={() => isEditing && fileInputRef.current?.click()}
                            >
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-amber-500 dark:to-yellow-500 blur-md opacity-60" />
                                <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/20 shadow-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <div className={`absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 ${isEditing ? 'group-hover/avatar:opacity-100' : ''} transition-opacity z-10`}>
                                        <Camera className="w-8 h-8 text-white/80" />
                                    </div>
                                    {avatar ? (
                                        <img
                                            src={avatar}
                                            alt={`${user?.username} avatar`}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="text-slate-400 flex items-center justify-center w-full h-full text-3xl font-bold bg-slate-800">
                                            {user?.username?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        <div className="flex-1 text-center sm:text-left w-full">
                            {isEditing ? (
                                <div className="space-y-3">
                                    <div className="text-3xl font-bold text-slate-900 dark:text-white">
                                        {user?.username || "Guest User"}
                                    </div>
                                    <input
                                        type="text"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full text-lg font-medium bg-transparent border-b border-blue-500/30 dark:border-amber-500/30 text-blue-600 dark:text-amber-400 focus:outline-none focus:border-blue-500 dark:focus:border-amber-500 placeholder-slate-500"
                                        placeholder="Your Role"
                                    />
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <MapPin size={14} />
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="bg-transparent border-b border-blue-500/30 dark:border-amber-500/30 focus:outline-none focus:border-blue-500 dark:focus:border-amber-500 placeholder-slate-500"
                                            placeholder="Location"
                                        />
                                    </div>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className="w-full text-sm bg-transparent border border-blue-500/30 dark:border-amber-500/30 rounded-lg p-2 text-slate-600 dark:text-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-amber-500 resize-none"
                                        rows={3}
                                        placeholder="Short bio..."
                                    />
                                </div>
                            ) : (
                                <>
                                    <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                                        {user?.username || "Guest User"}
                                    </h1>
                                    <p className="mb-3 text-lg font-medium text-blue-600 dark:text-amber-400">{role}</p>
                                    {location && (
                                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                                            <MapPin size={14} />
                                            <span>{location}</span>
                                        </div>
                                    )}
                                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg">{bio}</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Qualifications Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <Award className="w-5 h-5 text-blue-500 dark:text-yellow-400" />
                                Qualifications
                            </h3>
                            {isEditing && (
                                <button onClick={addQualification} className="text-xs flex items-center gap-1 text-blue-600 dark:text-amber-400 hover:underline">
                                    <Plus className="w-3 h-3" /> Add
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {qualifications.map((qual) => (
                                <div key={qual.id} className="relative p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-blue-500/30 dark:hover:border-amber-500/30 transition-colors">
                                    {isEditing ? (
                                        <div className="space-y-2">
                                            <input
                                                value={qual.title}
                                                onChange={(e) => updateQualification(qual.id, 'title', e.target.value)}
                                                className="w-full bg-transparent border-b border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-medium text-sm focus:outline-none"
                                                placeholder="Degree/Certificate"
                                            />
                                            <input
                                                value={qual.institution}
                                                onChange={(e) => updateQualification(qual.id, 'institution', e.target.value)}
                                                className="w-full bg-transparent border-b border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 text-xs focus:outline-none"
                                                placeholder="Institution"
                                            />
                                            <input
                                                value={qual.year}
                                                onChange={(e) => updateQualification(qual.id, 'year', e.target.value)}
                                                className="w-full bg-transparent border-b border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 text-xs focus:outline-none"
                                                placeholder="Year"
                                            />
                                            <button onClick={() => removeQualification(qual.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-600">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <h4 className="text-slate-900 dark:text-white font-medium">{qual.title}</h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{qual.institution}, {qual.year}</p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Projects Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <Code className="w-5 h-5 text-blue-500 dark:text-amber-400" />
                                Featured Projects
                            </h3>
                            {isEditing && (
                                <button onClick={addProject} className="text-xs flex items-center gap-1 text-blue-600 dark:text-amber-400 hover:underline">
                                    <Plus className="w-3 h-3" /> Add
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {projects.map((proj) => (
                                <div key={proj.id} className="relative p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors group/project">
                                    {isEditing ? (
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <input
                                                    value={proj.title}
                                                    onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                                                    className="w-full mr-8 bg-transparent border-b border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-medium focus:outline-none"
                                                    placeholder="Project Title"
                                                />
                                                <button onClick={() => removeProject(proj.id)} className="text-red-500 hover:text-red-600">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <textarea
                                                value={proj.description}
                                                onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                                                className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded p-1 text-slate-500 dark:text-slate-400 text-sm focus:outline-none"
                                                rows={2}
                                                placeholder="Project Description"
                                            />
                                            <input
                                                value={proj.tags.join(", ")}
                                                onChange={(e) => updateProject(proj.id, 'tags', e.target.value.split(", "))}
                                                className="w-full bg-transparent border-b border-black/10 dark:border-white/10 text-blue-600 dark:text-amber-400 text-xs focus:outline-none"
                                                placeholder="Tags (comma separated)"
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-slate-900 dark:text-white font-medium group-hover/project:text-blue-500 dark:group-hover/project:text-amber-400 transition-colors">{proj.title}</h4>
                                                <ArrowUpRight className="w-4 h-4 text-slate-400 slate-500 group-hover/project:text-slate-900 dark:group-hover/project:text-white transition-colors" />
                                            </div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{proj.description}</p>
                                            <div className="flex gap-2 flex-wrap">
                                                {proj.tags.map((tag, i) => (
                                                    <span key={i} className="px-2 py-1 rounded-md bg-blue-500/20 dark:bg-amber-500/20 text-blue-700 dark:text-amber-300 text-xs">{tag}</span>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Editable Skills Section */}
                    <div className="mb-6 flex flex-wrap gap-2 justify-center sm:justify-start items-center">
                        {skills.map((skill) => (
                            <motion.span
                                key={skill}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative group/skill rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 dark:from-amber-500/20 dark:to-yellow-500/20 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 backdrop-blur-sm border border-black/10 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-amber-500/50 transition-all cursor-default"
                            >
                                {skill}
                                {isEditing && (
                                    <button
                                        onClick={() => removeSkill(skill)}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover/skill:opacity-100 transition-opacity"
                                    >
                                        <X className="w-2 h-2" />
                                    </button>
                                )}
                            </motion.span>
                        ))}
                        {isEditing && (
                            <form onSubmit={addSkill} className="flex items-center">
                                <input
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    placeholder="Add skill..."
                                    className="w-24 px-3 py-1.5 text-sm bg-white/5 border border-black/10 dark:border-white/10 rounded-l-full focus:outline-none focus:border-blue-500 dark:focus:border-amber-500 text-slate-700 dark:text-white"
                                />
                                <button
                                    type="submit"
                                    className="px-2 py-1.5 bg-blue-500/20 dark:bg-amber-500/20 border-y border-r border-blue-500/30 dark:border-amber-500/30 rounded-r-full hover:bg-blue-500/30 dark:hover:bg-amber-500/30 transition-colors"
                                >
                                    <Plus className="w-4 h-4 text-blue-600 dark:text-amber-400" />
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => setHoveredButton("hire")}
                            onHoverEnd={() => setHoveredButton(null)}
                        >
                            <Button
                                onClick={() => window.location.href = `mailto:${user?.email || ""}`}
                                className="relative h-14 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-amber-600 dark:to-yellow-600 font-semibold text-white dark:text-black shadow-lg transition-all hover:shadow-xl hover:from-blue-600 hover:to-cyan-600 dark:hover:from-amber-700 dark:hover:to-yellow-700 cursor-pointer"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Briefcase className="h-5 w-5" />
                                    Let's Work Together
                                    <ArrowUpRight className="h-4 w-4" />
                                </span>
                                <AnimatePresence>
                                    {hoveredButton === "hire" && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-white/20"
                                        />
                                    )}
                                </AnimatePresence>
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                onClick={handleCopy}
                                variant="outline"
                                className="h-14 w-full rounded-2xl border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 font-semibold text-slate-900 dark:text-white backdrop-blur-sm transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30 cursor-pointer"
                            >
                                <Mail className="mr-2 h-5 w-5" />
                                {copied ? "Email Copied!" : "Copy Email"}
                            </Button>
                        </motion.div>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-4">
                        {[
                            { icon: FaGithub, label: "GitHub" },
                            { icon: FaTwitter, label: "Twitter" },
                            { icon: Globe, label: "Website" },
                        ].map(({ icon: Icon, label }) => (
                            <motion.button
                                key={label}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-full bg-black/5 dark:bg-white/5 p-3 text-slate-500 dark:text-slate-400 backdrop-blur-sm transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                                aria-label={label}
                            >
                                <Icon className="h-5 w-5" />
                            </motion.button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
