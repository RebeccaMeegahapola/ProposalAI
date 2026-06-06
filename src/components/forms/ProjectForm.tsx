import FormField from './FormField'
import LoadingButton from '../common/LoadingButton'

interface ProjectFormProps {
    formData: {
        clientName: string
        companyName: string
        projectTitle: string
        projectDescription: string
        features: string
        timeline: string
        budgetRange: string
        platformType: string
    }
    validationErrors: Record<string, string>
    isLoading: boolean
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
    onGenerate: () => void
}

const ProjectForm = ({ formData, validationErrors, isLoading, onInputChange, onGenerate }: ProjectFormProps) => {
    const platformOptions = [
        { value: 'Web Application', label: 'Web Application' },
        { value: 'Mobile Application', label: 'Mobile Application' },
        { value: 'Both', label: 'Both' },
        { value: 'Desktop Application', label: 'Desktop Application' },
    ]

    return (
        <div className="card p-6 h-full">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="card-icon card-icon-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                </div>
                <h2 className="font-display text-sm font-semibold text-white tracking-tight">
                    Project Information
                </h2>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <FormField
                    label="Client Name"
                    name="clientName"
                    value={formData.clientName}
                    onChange={onInputChange}
                    placeholder="Enter client's full name"
                    required
                    error={validationErrors.clientName}
                />

                <FormField
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={onInputChange}
                    placeholder="Enter your company name"
                    required
                    error={validationErrors.companyName}
                />

                <FormField
                    label="Project Title"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={onInputChange}
                    placeholder="e.g., E-Commerce Platform Redesign"
                    required
                    error={validationErrors.projectTitle}
                />

                <FormField
                    label="Project Description"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={onInputChange}
                    type="textarea"
                    rows={4}
                    placeholder="Describe the project goals, scope, and any specific requirements..."
                    required
                    hint="Min. 50 characters"
                    error={validationErrors.projectDescription}
                    minChars={50}
                />

                <FormField
                    label="Required Features"
                    name="features"
                    value={formData.features}
                    onChange={onInputChange}
                    type="textarea"
                    rows={3}
                    placeholder="e.g., User authentication, Payment gateway, Dashboard, Analytics, Real-time notifications"
                    required
                    hint="Min. 10 characters, comma-separated"
                    error={validationErrors.features}
                    minChars={10}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Budget Range"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={onInputChange}
                        placeholder="e.g., $5,000 - $10,000"
                        hint="Optional"
                        error={validationErrors.budgetRange}
                    />

                    <FormField
                        label="Timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={onInputChange}
                        placeholder="e.g., 3 months"
                        hint="Optional"
                        error={validationErrors.timeline}
                    />
                </div>

                <FormField
                    label="Platform Type"
                    name="platformType"
                    value={formData.platformType}
                    onChange={onInputChange}
                    type="select"
                    options={platformOptions}
                    required
                    error={validationErrors.platformType}
                />

                <LoadingButton isLoading={isLoading} onClick={onGenerate} text="Generate Proposal" />
            </form>
        </div>
    )
}

export default ProjectForm