import { Router, Request, Response } from 'express'
import { generateAIProposal } from '../services/aiService.js'
import { GenerateProposalRequest, GenerateProposalResponse, ApiError, ProposalFormData } from '../types/index.js'

const router = Router()

router.post('/', async (req: Request<{}, {}, GenerateProposalRequest>, res: Response<GenerateProposalResponse | ApiError>) => {
    try {
        const { formData } = req.body

        // Validate required fields
        const requiredFields: (keyof ProposalFormData)[] = [
            'clientName', 'companyName', 'projectTitle',
            'projectDescription', 'features', 'platformType'
        ]

        const missingFields = requiredFields.filter(field => !formData[field]?.trim())

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: 'Missing required fields',
                missing: missingFields
            })
        }

        console.log(`📝 Generating proposal for: ${formData.projectTitle}`)
        console.log(`   Client: ${formData.clientName} (${formData.companyName})`)
        console.log(`   Platform: ${formData.platformType}`)

        // Call AI service
        const proposal = await generateAIProposal(formData)

        res.json({
            success: true,
            proposal,
            message: 'Proposal generated successfully'
        })

    } catch (error) {
        console.error('Generation error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'

        res.status(500).json({
            error: 'Failed to generate proposal',
            details: errorMessage
        })
    }
})

export default router