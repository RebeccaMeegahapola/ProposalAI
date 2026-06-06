import { BookmarkPlus } from 'lucide-react'

interface SaveProposalButtonProps {
    isGenerated: boolean
    onSave: () => void
}

const SaveProposalButton = ({ isGenerated, onSave }: SaveProposalButtonProps) => {
    if (!isGenerated) return null

    return (
        <button
            onClick={onSave}
            className="px-3 py-1 rounded-md text-xs transition-all duration-200 flex items-center gap-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 cursor-pointer"
        >
            <BookmarkPlus className="w-3 h-3" />
            Save Proposal
        </button>
    )
}

export default SaveProposalButton