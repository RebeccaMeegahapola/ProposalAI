// Communicates with Groq AI API to generate proposals

import Groq from 'groq-sdk'
import dotenv from 'dotenv'
import {ProposalFormData} from "../types";

dotenv.config()

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

const buildPrompt = (formData: ProposalFormData): string => {
    return `You are an expert proposal writer for a professional services agency. Write a detailed, professional business proposal based on the following client information.

CLIENT INFORMATION:
- Client Name: ${formData.clientName}
- Company Name: ${formData.companyName}
- Project Title: ${formData.projectTitle}
- Platform Type: ${formData.platformType}

PROJECT DETAILS:
- Description: ${formData.projectDescription}
- Required Features: ${formData.features}
- Timeline: ${formData.timeline || 'To be determined'}
- Budget Range: ${formData.budgetRange || 'To be discussed'}

REQUIREMENTS:
Write a comprehensive proposal with these sections:
1. Executive Summary
2. Project Understanding & Approach
3. Proposed Solution & Features
4. Technical Implementation
5. Timeline & Milestones
6. Investment & ROI
7. Why Choose Us
8. Next Steps

STYLE GUIDELINES:
- Professional and persuasive tone
- Use markdown formatting with # for main title, ## for sections
- Include bullet points where appropriate
- Be specific and detailed (500-800 words)
- Show confidence and expertise
- End with a strong call to action

The proposal should sound like it's from a premium AI proposal generation service called "ProposalAI".`
}

export const generateAIProposal = async (formData: ProposalFormData): Promise<string> => {
    try {
        console.log('🤖 Calling Groq AI to generate proposal...')
        console.log(`   Project: ${formData.projectTitle}`)
        console.log(`   Client: ${formData.clientName}`)

        const prompt = buildPrompt(formData)

        // Updated to use currently supported models
        // Options: 'llama3-70b-8192', 'llama3-8b-8192', 'mixtral-8x7b-32768' (deprecated), 'gemma2-9b-it'
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert business proposal writer. Write professional, detailed, and persuasive proposals that win clients.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 2000,
        })

        const proposal = completion.choices[0]?.message?.content || ''

        if (!proposal) {
            throw new Error('No proposal generated from AI')
        }

        console.log('✅ Proposal generated successfully')
        return proposal

    } catch (error) {
        console.error('Groq API Error:', error)
        throw new Error(`AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}