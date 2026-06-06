# 🚀 ProposalAI - Intelligent Proposal Generator

## 📋 Overview

ProposalAI is a full-stack application that generates professional business proposals using AI. Simply fill out a project information form, and the AI creates a comprehensive, customized proposal. Edit inline, save to library, export as text, and manage all your proposals in one place.

**Live Demo:** [Coming Soon](#)

---

## ✨ Features

### ✅ Phase 1 - Complete
- 🎨 Modern SaaS UI with dark theme
- 📝 8-field project information form
- 🤖 AI-powered proposal generation (Groq API)
- ✏️ Inline proposal editing
- 💾 Save proposals to localStorage
- 📂 Load and manage saved proposals
- 📋 Copy to clipboard
- 📄 Export as .txt file
- ✅ Form validation with character counters
- 🔔 Toast notifications
- 📱 Fully responsive design

### 🔜 Coming Soon
- 📄 PDF export
- 🔐 User authentication
- ☁️ Cloud database (PostgreSQL)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS | Styling |
| React Router DOM | Navigation |
| Lucide React | Icons |
| React Hot Toast | Notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express | Server framework |
| TypeScript | Type safety |
| Groq SDK | AI integration |
| CORS | Cross-origin requests |

### AI Model
- **Provider:** Groq
- **Model:** Llama 3 70B
- **Speed:** ~2 seconds per proposal

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/RebeccaMeegahapola/ProposalAI.git
cd proposal-ai
