// Defines data structures used throughout backend
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

export interface GenerateProposalRequest {
    formData: ProposalFormData
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

export interface ApiError {
    error: string
    details?: string
    missing?: string[]
}