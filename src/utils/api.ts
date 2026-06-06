import type {GenerateProposalResponse, ProposalFormData} from "../types";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const generateProposal = async (formData: ProposalFormData): Promise<string> => {
    try {
        const response = await fetch(`${API_URL}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formData }),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to generate proposal')
        }

        const data: GenerateProposalResponse = await response.json()

        if (!data.success) {
            throw new Error(data.message || 'Generation failed')
        }

        return data.proposal

    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}

export const checkHealth = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/health`)
        return response.ok
    } catch {
        return false
    }
}