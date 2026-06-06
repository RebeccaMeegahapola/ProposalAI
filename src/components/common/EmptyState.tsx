interface EmptyStateProps {
    title: string
    message: string
}

const EmptyState = ({ title, message }: EmptyStateProps) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
            <div className="empty-ring">
                <div className="empty-ring-inner">
                    <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary/40 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-accent/40 inline-block" />
                    </div>
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-xs text-gray-700 mt-1 max-w-xs">{message}</p>
            </div>
            <div className="w-full max-w-sm space-y-2 mt-4 opacity-25">
                {[70, 90, 60, 80, 50, 75, 65].map((w, i) => (
                    <div key={i} className="h-2 rounded-full bg-gray-800" style={{ width: `${w}%` }} />
                ))}
            </div>
        </div>
    )
}

export default EmptyState