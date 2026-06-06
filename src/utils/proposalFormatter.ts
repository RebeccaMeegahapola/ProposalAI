export const formatProposalToHTML = (text: string): string => {
    return text
        .split('\n')
        .map(line => {
            if (line.startsWith('# ')) {
                return `<h1 class="text-2xl font-bold text-primary mb-4">${line.substring(2)}</h1>`
            }
            if (line.startsWith('## ')) {
                return `<h2 class="text-xl font-semibold text-accent mb-3 mt-5">${line.substring(3)}</h2>`
            }
            if (line.startsWith('**') && line.endsWith('**')) {
                return `<p class="text-gray-300 mb-3"><strong>${line.substring(2, line.length - 2)}</strong></p>`
            }
            if (line.startsWith('• ')) {
                return `<li class="text-gray-300 ml-4 mb-1">${line.substring(2)}</li>`
            }
            if (line === '---') {
                return `<hr class="my-6 border-gray-700">`
            }
            if (line.trim() === '') {
                return `<br/>`
            }
            return `<p class="text-gray-300 mb-3">${line}</p>`
        })
        .join('')
}

export const getPlainTextFromHTML = (html: string): string => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    return tempDiv.textContent || tempDiv.innerText || html
}