interface FormFieldProps {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
    type?: 'input' | 'textarea' | 'select'
    rows?: number
    placeholder?: string
    hint?: string
    required?: boolean
    error?: string
    options?: Array<{ value: string; label: string }>
    minChars?: number
}

const FormField = ({
                       label,
                       name,
                       value,
                       onChange,
                       type = 'input',
                       rows = 3,
                       placeholder,
                       hint,
                       required = false,
                       error,
                       options,
                       minChars,
                   }: FormFieldProps) => {
    const showMinCharWarning = minChars && value.length > 0 && value.length < minChars

    const renderField = () => {
        if (type === 'textarea') {
            return (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    rows={rows}
                    className={`form-input resize-none ${error ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder={placeholder}
                />
            )
        }

        if (type === 'select' && options) {
            return (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`form-input ${error ? 'border-red-500 focus:border-red-500' : ''}`}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            )
        }

        return (
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                className={`form-input ${error ? 'border-red-500 focus:border-red-500' : ''}`}
                placeholder={placeholder}
            />
        )
    }

    return (
        <div>
            <div className="field-label">
        <span className="field-label-left">
          {label}{required && <span className="req">*</span>}
        </span>
                {hint && <span className="field-label-hint">{hint}</span>}
            </div>

            {renderField()}

            {(error || (minChars && value.length > 0)) && (
                <div className="flex justify-between mt-1">
                    {minChars && (
                        <span className={showMinCharWarning ? 'char-warn' : 'char-count'}>
              {value.length}/{minChars} characters
            </span>
                    )}
                    {error && <span className="text-red-400 text-xs">{error}</span>}
                </div>
            )}
        </div>
    )
}

export default FormField