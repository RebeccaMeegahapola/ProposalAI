
import { Calendar, FileText, Trash2, Eye } from 'lucide-react'
import type {SavedProposal} from "../../types/proposal.ts";

interface SavedProposalsListProps {
    proposals: SavedProposal[]
    onLoad: (proposal: SavedProposal) => void
    onDelete: (id: string) => void
}

const SavedProposalsList = ({ proposals, onLoad, onDelete }: SavedProposalsListProps) => {
    if (proposals.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center gap-3">
                <div className="empty-ring">
                    <div className="empty-ring-inner">
                        <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-primary/40 inline-block" />
                            <span className="w-2 h-2 rounded-full bg-accent/40 inline-block" />
                        </div>
                    </div>
                </div>
                <p className="text-sm font-medium text-gray-500 mt-2">No saved proposals</p>
                <p className="text-xs text-gray-700 max-w-xs">
                    Generated proposals you save will show up here for easy access and re-export.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proposals.map((proposal) => (
                <div
                    key={proposal.id}
                    className="card p-5 hover:border-primary/30 transition-all duration-200 group"
                >
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-white text-lg truncate flex-1">
                            {proposal.title}
                        </h3>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onLoad(proposal)}
                                className="p-1.5 rounded-md bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                                title="Load proposal"
                            >
                                <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={() => onDelete(proposal.id)}
                                className="p-1.5 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                title="Delete proposal"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <FileText className="w-3 h-3" />
                            <span>{proposal.clientName} · {proposal.companyName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>Saved: {new Date(proposal.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SavedProposalsList