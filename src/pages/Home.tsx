import { useNavigate } from 'react-router-dom'
import Navbar from '../layout/Navbar'

const stats = [
    { value: '10×',  label: 'Faster drafts'   },
    { value: '500+', label: 'Teams using it'   },
    { value: '98%',  label: 'Satisfaction'     },
]

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="bg-space-dark min-h-screen flex flex-col font-sans">
            <Navbar />

            {/* ── Hero ── */}
            <main className="flex-1 relative flex items-center justify-center overflow-hidden pb-16">

                {/* Scrolling dot-grid */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div
                        className="grid-scroll"
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
                            backgroundSize: '36px 36px',
                            width: '100%',
                            height: '200%',
                        }}
                    />
                </div>

                {/* Ambient orbs */}
                <div
                    className="orb-1 absolute top-[-80px] left-[-60px] w-[420px] h-[420px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)' }}
                    aria-hidden="true"
                />
                <div
                    className="orb-2 absolute bottom-[-60px] right-[-40px] w-[500px] h-[500px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.14) 0%, transparent 70%)' }}
                    aria-hidden="true"
                />
                <div
                    className="orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 65%)' }}
                    aria-hidden="true"
                />

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    {/* Badge */}
                    <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/[0.08] mb-8">
                        <span className="dot-ping-1 inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="dot-ping-2 inline-block w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="text-xs font-medium text-gray-300 tracking-widest uppercase">
              AI-Powered · Instant Results
            </span>
                    </div>

                    {/* Headline */}
                    <h1 className="animate-fade-up-2 font-display text-5xl sm:text-6xl lg:text-[72px] font-bold leading-[1.08] tracking-tight mb-6">
                        <span className="text-white block">Generate</span>
                        <span className="shimmer-text block">Proposals</span>
                        <span className="text-white block">in Seconds.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="animate-fade-up-3 text-base sm:text-lg text-gray-400 font-light max-w-xl mx-auto mb-10 leading-relaxed">
                        Stop spending hours on proposals. Let AI draft professional, client-ready
                        documents — tailored to your brief in one click.
                    </p>

                    {/* CTA buttons */}
                    <div className="animate-[fadeUp_0.7s_ease_0.38s_both] flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                            onClick={() => navigate('/generate')}
                            className="cta-btn btn-gradient px-8 py-3.5 rounded-xl font-medium text-white text-base"
                        >
                            Start Generating
                            <span className="ml-2 inline-block">→</span>
                        </button>

                        <button
                            onClick={() => navigate('/demo')}
                            className="px-8 py-3.5 rounded-xl font-medium text-gray-300 text-base border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-200"
                        >
                            View Demo
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="animate-[fadeUp_0.7s_ease_0.38s_both] mt-16 grid grid-cols-3 gap-3 max-w-sm mx-auto">
                        {stats.map(({ value, label }) => (
                            <div key={label} className="stat-card rounded-xl py-3 px-2">
                                <p className="font-display text-xl font-bold text-white">{value}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </main>

            {/* ── Footer ── */}
            <footer className="fixed bottom-0 inset-x-0 z-50 border-t border-white/5 bg-space-dark/90 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
                    <p className="text-xs text-gray-700">
                        © {new Date().getFullYear()} ProposalAI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {['Privacy', 'Terms'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-xs text-gray-700 hover:text-gray-400 transition-colors duration-150"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home