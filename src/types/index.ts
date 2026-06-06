// Renamed to avoid conflict with browser's native FormData
export interface ProposalFormData {
    clientName: string
    companyName: string
    projectTitle: string
    projectDescription: string
    features: string
    timeline: string
    budgetRange: string
    platformType: string
}

export interface GenerateProposalResponse {
    success: boolean
    proposal: string
    message?: string
    error?: string
}

export interface SavedProposal {
    id: string
    title: string
    clientName: string
    companyName: string
    content: string
    createdAt: string
    updatedAt: string
}