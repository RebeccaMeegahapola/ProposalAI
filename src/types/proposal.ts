export interface SavedProposal {
    id: string
    title: string
    clientName: string
    companyName: string
    content: string
    createdAt: string
    updatedAt: string
}

export interface FormDataType {
    clientName: string
    companyName: string
    projectTitle: string
    projectDescription: string
    features: string
    timeline: string
    budgetRange: string
    platformType: string
}