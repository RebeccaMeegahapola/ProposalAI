import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Navbar from '../layout/Navbar'
import ProjectForm from '../components/forms/ProjectForm'
import ProposalPreview from '../components/preview/ProposalPreview'
import SavedProposalsList from '../components/saved/SavedProposalsList'
import { generateProposal } from '../utils/api'
import { formatProposalToHTML, getPlainTextFromHTML } from '../utils/proposalFormatter'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type {ProposalFormData, SavedProposal} from "../types";

const Generate = () => {
    const [activeTab, setActiveTab] = useState<'generate' | 'saved'>('generate')
    const [formData, setFormData] = useState<ProposalFormData>({
        clientName: '',
        companyName: '',
        projectTitle: '',
        projectDescription: '',
        features: '',
        timeline: '',
        budgetRange: '',
        platformType: 'Web Application',
    })
    const [proposal, setProposal] = useState<string>('')
    const [isProposalGenerated, setIsProposalGenerated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
    const [loadedProposalId, setLoadedProposalId] = useState<string | null>(null)
    const [savedProposals, setSavedProposals] = useLocalStorage<SavedProposal[]>('proposals', [])

    // Check backend health on mount
    useEffect(() => {
        const checkBackend = async () => {
            const { checkHealth } = await import('../utils/api')
            const isHealthy = await checkHealth()
            if (!isHealthy) {
                toast.error('Backend server not running. Please start the backend.', {
                    duration: 5000,
                })
            } else {
                toast.success('Backend connected!', {
                    duration: 2000,
                    icon: '🚀',
                })
            }
        }
        checkBackend()
    }, [])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: '' }))
        }
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {}

        if (!formData.clientName.trim()) errors.clientName = 'Client name is required'
        if (!formData.companyName.trim()) errors.companyName = 'Company name is required'
        if (!formData.projectTitle.trim()) errors.projectTitle = 'Project title is required'
        if (!formData.projectDescription.trim()) {
            errors.projectDescription = 'Project description is required'
        } else if (formData.projectDescription.length < 50) {
            errors.projectDescription = 'Must be at least 50 characters'
        }
        if (!formData.features.trim()) {
            errors.features = 'Features are required'
        } else if (formData.features.length < 10) {
            errors.features = 'Must be at least 10 characters'
        }
        if (formData.budgetRange.trim() && !/^[\$\d\s\,\-]+$/.test(formData.budgetRange)) {
            errors.budgetRange = 'Use format: $5,000 - $10,000'
        }
        if (formData.timeline.trim() && !/^[\d\s\-\/monthsweeksdays]+$/i.test(formData.timeline)) {
            errors.timeline = 'Use format: 3 months, 4-6 weeks, etc.'
        }
        if (!formData.platformType) errors.platformType = 'Platform type is required'

        setValidationErrors(errors)

        if (Object.keys(errors).length > 0) {
            toast.error('Please fix the form errors before generating')
        }

        return Object.keys(errors).length === 0
    }

    const handleGenerateProposal = async () => {
        if (!validateForm()) {
            document.querySelector('.card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return
        }

        setIsLoading(true)
        setValidationErrors({})

        const loadingToast = toast.loading('Generating your proposal with AI...', {
            style: { background: '#111827', color: '#6C63FF' },
        })

        try {
            const proposalContent = await generateProposal(formData)
            setProposal(proposalContent)
            setIsProposalGenerated(true)
            toast.success('Proposal generated successfully! ✨', { id: loadingToast })
        } catch (error) {
            console.error('Generation failed:', error)
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            toast.error(`Failed to generate: ${errorMessage}`, { id: loadingToast })
        } finally {
            setIsLoading(false)
        }
    }

    const handleProposalEdit = (e: React.FormEvent<HTMLDivElement>) => {
        setProposal(e.currentTarget.innerHTML)
    }

    const handleCopyToClipboard = async () => {
        if (!proposal) return
        const plainText = getPlainTextFromHTML(formatProposalToHTML(proposal))
        try {
            await navigator.clipboard.writeText(plainText)
            toast.success('Proposal copied to clipboard! 📋', {
                icon: '✅',
                duration: 2000,
            })
        } catch (err) {
            toast.error('Failed to copy. Please try again.')
        }
    }

    const handleExportAsTxt = () => {
        if (!proposal) return
        const plainText = getPlainTextFromHTML(formatProposalToHTML(proposal))
        const blob = new Blob([plainText], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `proposal-${formData.projectTitle || 'untitled'}-${Date.now()}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success('Proposal exported as .txt file! 📄', {
            duration: 2000,
        })
    }

    const handleSaveProposal = () => {
        if (!proposal || !formData.projectTitle) {
            toast.error('No proposal to save. Generate one first!')
            return
        }

        const newProposal: SavedProposal = {
            id: Date.now().toString(),
            title: formData.projectTitle,
            clientName: formData.clientName,
            companyName: formData.companyName,
            content: proposal,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        setSavedProposals([newProposal, ...savedProposals])
        toast.success('Proposal saved to library! 💾', {
            icon: '📌',
            duration: 2000,
        })
    }

    const handleUpdateProposal = () => {
        if (!proposal || !formData.projectTitle) {
            toast.error('No proposal to update')
            return
        }

        if (!loadedProposalId) {
            // If no loaded proposal, just save as new
            handleSaveProposal()
            return
        }

        // Update existing proposal
        const updatedProposal: SavedProposal = {
            id: loadedProposalId,
            title: formData.projectTitle,
            clientName: formData.clientName,
            companyName: formData.companyName,
            content: proposal,
            createdAt: savedProposals.find(p => p.id === loadedProposalId)?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        const updatedProposals = savedProposals.map(p =>
            p.id === loadedProposalId ? updatedProposal : p
        )

        setSavedProposals(updatedProposals)
        setLoadedProposalId(null) // Reset after update

        toast.success('Proposal updated successfully! ✏️', {
            icon: '💾',
            duration: 2000,
        })
    }

    const handleLoadProposal = (savedProposal: SavedProposal) => {
        setProposal(savedProposal.content)
        setIsProposalGenerated(true)
        setLoadedProposalId(savedProposal.id)

        // Also load the form data for better UX
        setFormData({
            clientName: savedProposal.clientName,
            companyName: savedProposal.companyName,
            projectTitle: savedProposal.title,
            projectDescription: formData.projectDescription,
            features: formData.features,
            timeline: formData.timeline,
            budgetRange: formData.budgetRange,
            platformType: formData.platformType,
        })

        setActiveTab('generate')
        toast.success(`Loaded: ${savedProposal.title}`, {
            icon: '📂',
            duration: 2000,
        })
    }

    const handleDeleteProposal = (id: string) => {
        toast.custom((t) => (
            <div className="bg-surface rounded-xl border border-red-500/30 p-4 shadow-xl max-w-sm">
                <p className="text-white text-sm mb-3">Delete this proposal?</p>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 rounded-lg text-xs bg-gray-700 text-white hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            setSavedProposals(savedProposals.filter(p => p.id !== id))
                            toast.dismiss(t.id)
                            toast.success('Proposal deleted', { icon: '🗑️', duration: 1500 })
                        }}
                        className="px-3 py-1 rounded-lg text-xs bg-red-500 text-white hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), { duration: 5000 })
    }

    return (
        <div className="bg-space-dark min-h-screen flex flex-col font-sans">
            <Navbar />

            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pb-16">
                {/* Tabs */}
                <div className="animate-fade-up flex items-center gap-3 mb-7">
                    {(['generate', 'saved'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`tab-btn ${activeTab === tab ? 'tab-btn-active' : 'tab-btn-inactive'}`}
                        >
                            {tab === 'generate' ? 'Generate Proposal' : 'Saved Proposals'}
                            {tab === 'saved' && savedProposals.length > 0 && (
                                <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary/20 rounded-full">
                  {savedProposals.length}
                </span>
                            )}
                        </button>
                    ))}
                    <div className="ml-auto flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                        <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                        <span className="text-xs text-gray-700 ml-1">ProposalAI</span>
                    </div>
                </div>

                {activeTab === 'generate' && (
                    <div className="animate-fade-up-2 flex flex-col lg:flex-row gap-5 items-stretch">
                        <div className="lg:w-2/5 w-full">
                            <ProjectForm
                                formData={formData}
                                validationErrors={validationErrors}
                                isLoading={isLoading}
                                onInputChange={handleInputChange}
                                onGenerate={handleGenerateProposal}
                            />
                        </div>

                        <div className="lg:w-3/5 w-full">
                            <ProposalPreview
                                proposal={proposal}
                                isGenerated={isProposalGenerated}
                                onEdit={handleProposalEdit}
                                onCopy={handleCopyToClipboard}
                                onExport={handleExportAsTxt}
                                onSave={handleSaveProposal}
                                onUpdate={handleUpdateProposal}
                                isEditingSaved={!!loadedProposalId}
                                formatToHTML={formatProposalToHTML}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'saved' && (
                    <div className="animate-fade-up-2">
                        <SavedProposalsList
                            proposals={savedProposals}
                            onLoad={handleLoadProposal}
                            onDelete={handleDeleteProposal}
                        />
                    </div>
                )}
            </div>

            {/* Fixed footer */}
            <footer className="fixed bottom-0 inset-x-0 z-50 border-t border-white/5 bg-space-dark/90 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
                    <p className="text-xs text-gray-700">© {new Date().getFullYear()} ProposalAI. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        {['Privacy', 'Terms'].map((item) => (
                            <a key={item} href="#" className="text-xs text-gray-700 hover:text-gray-400 transition-colors duration-150">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Generate