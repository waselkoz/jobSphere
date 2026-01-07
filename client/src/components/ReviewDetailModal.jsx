import { X, Quote } from 'lucide-react'

const ReviewDetailModal = ({ isOpen, onClose, review }) => {
    if (!isOpen || !review) return null

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl w-full max-w-2xl border border-slate-200 dark:border-white/10 relative shadow-2xl scale-100 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-full">
                        <Quote className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
                    <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-100 italic leading-relaxed text-center mb-8">
                        "{review.quote}"
                    </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-white/5 text-center">
                    <h3 className="text-lg font-bold text-blue-600 dark:text-amber-400 uppercase tracking-widest mb-1">
                        {review.author}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{review.role}</span>
                        {review.type && (
                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 rounded text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">
                                {review.type}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewDetailModal
