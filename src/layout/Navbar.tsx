import { Link } from 'react-router-dom'

interface NavbarProps {
    user?: {
        name: string
        email: string
    }
    onLogout?: () => void
}

const Navbar = ({
                    user = { name: 'Rebecca Meegahapola', email: 'rebeccameegahapola@gmail.com' },
                    onLogout = () => alert('Logged out'),
                }: NavbarProps) => {
    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

    return (
        <nav className="bg-surface border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Left — logo pill + brand + subtitle */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        {/* Two-dot pill (replaces the icon box) */}
                        <div className="flex items-center justify-center space-x-1.5 w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 group-hover:border-primary/50 transition-colors duration-200 flex-shrink-0">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <div className="w-2 h-2 bg-accent rounded-full" />
                        </div>

                        {/* Brand + subtitle stacked */}
                        <div className="flex flex-col justify-center">
                          <span className="text-base font-semibold leading-tight tracking-tight">
                            <span className="text-white">Proposal</span>
                            <span className="text-primary">AI</span>
                          </span>
                          <span className="text-xs text-gray-400 leading-tight mt-0.5">
                            Generate professional proposals instantly with AI
                          </span>
                        </div>
                    </Link>

                    {/* Right — avatar + name/email + logout */}
                    <div className="flex items-center space-x-4">
                        {/* Avatar circle + user info */}
                        <div className="flex items-center space-x-2.5">
                            {/* Avatar */}
                            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-semibold text-primary leading-none">
                                  {initials}
                                </span>
                            </div>

                            {/* Name + email */}
                            <div className="hidden sm:flex flex-col justify-center">
                                <span className="text-sm font-medium text-white leading-tight">
                                  {user.name}
                                </span>
                                <span className="text-xs text-gray-400 leading-tight mt-0.5 truncate max-w-[200px]">
                                    {user.email}
                                </span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-6 bg-white/10" />

                        {/* Logout */}
                        <button
                            onClick={onLogout}
                            className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar