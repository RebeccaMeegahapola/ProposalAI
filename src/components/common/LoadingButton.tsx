import { Loader2 } from 'lucide-react'

interface LoadingButtonProps {
    isLoading: boolean
    onClick: () => void
    text: string
    loadingText?: string
}

const LoadingButton = ({ isLoading, onClick, text, loadingText = 'Generating...' }: LoadingButtonProps) => {
    return (
        <button
            onClick={onClick}
            type="button"
            disabled={isLoading}
            className="btn-gradient w-full py-3 rounded-lg text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 text-white animate-spin" />
                    {loadingText}
        </span>
            ) : (
                `${text} →`
            )}
        </button>
    )
}

export default LoadingButton