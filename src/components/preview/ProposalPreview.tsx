import EmptyState from '../common/EmptyState'
import SaveProposalButton from '../saved/SaveProposalButton'

interface ProposalPreviewProps {
    proposal: string
    isGenerated: boolean
    onEdit: (e: React.FormEvent<HTMLDivElement>) => void
    onCopy: () => void
    onExport: () => void
    onSave?: () => void
    onUpdate?: () => void  // NEW: For updating existing proposal
    isEditingSaved?: boolean  // NEW: Show update button instead of save
    formatToHTML: (text: string) => string
}

const ProposalPreview = ({
                             proposal,
                             isGenerated,
                             onEdit,
                             onCopy,
                             onExport,
                             onSave,
                             onUpdate,
                             isEditingSaved = false,
                             formatToHTML
                         }: ProposalPreviewProps) => {
    return (
        <div className="card p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="card-icon card-icon-accent">
                        <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                    </div>
                    <h2 className="font-display text-sm font-semibold text-white tracking-tight">
                        Proposal Preview
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    {isEditingSaved ? (
                        <button
                            onClick={onUpdate}
                            className="px-3 py-1 rounded-md text-xs transition-all duration-200 flex items-center gap-1 bg-accent/20 text-accent hover:bg-accent/30 border border-accent/30 cursor-pointer"
                        >
                            ✏️ Update
                        </button>
                    ) : (
                        <SaveProposalButton isGenerated={isGenerated} onSave={onSave || (() => {})} />
                    )}
                    <button
                        onClick={onCopy}
                        disabled={!isGenerated}
                        className={`px-3 py-1 rounded-md text-xs transition-all duration-200 ${
                            isGenerated
                                ? 'bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30 cursor-pointer'
                                : 'text-gray-700 border border-white/5 cursor-not-allowed'
                        }`}
                    >
                        Copy
                    </button>
                    <button
                        onClick={onExport}
                        disabled={!isGenerated}
                        className={`px-3 py-1 rounded-md text-xs transition-all duration-200 ${
                            isGenerated
                                ? 'bg-accent/20 text-accent hover:bg-accent/30 border border-accent/30 cursor-pointer'
                                : 'text-gray-700 border border-white/5 cursor-not-allowed'
                        }`}
                    >
                        Export
                    </button>
                </div>
            </div>

            {!isGenerated ? (
                <EmptyState
                    title="No proposal yet"
                    message="Fill in the project details and hit Generate — your AI-drafted proposal will appear here."
                />
            ) : (
                <div className="flex-1 overflow-y-auto max-h-[800px]">
                    <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={onEdit}
                        className="prose prose-invert max-w-none outline-none focus:ring-1 focus:ring-primary/30 p-4 rounded-lg transition-all"
                        dangerouslySetInnerHTML={{ __html: formatToHTML(proposal) }}
                    />
                    {isEditingSaved && (
                        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
                            <p className="text-xs text-gray-400">
                                ✏️ Editing saved proposal - click "Update" to save changes
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProposalPreview