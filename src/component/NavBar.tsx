import { useNavigate } from "react-router-dom";

// This is our home page navbar, which is used across the entire app. It contains links to the main pages of the app, as well as a login and signup button. The navbar is responsive and will collapse into a hamburger menu on smaller screens.

export default function NavBar() {
    const navigate = useNavigate();
    return (
        <header className="w-full h-14 text-black border-b border-gray-200">
            <nav className="h-full mx-10 px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-headings tracking-wide">RealSync</h1>
                </div>
                <div className="hidden md:flex items-center gap-9 text-sm">
                    <button className="hover:text-surface hover:font-medium" onClick={() => navigate('/features')}>
                        Features
                    </button>
                    <button className="hover:text-surface hover:font-medium" onClick={() => navigate('/collaboration')}>
                        Collaboration
                    </button>
                    <button className="hover:text-surface hover:font-medium" onClick={() => navigate('/pricing')}>
                        Pricing
                    </button>
                    <button className="hover:text-surface hover:font-medium" onClick={() => navigate('/support')}>
                        Support
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <button className="hidden sm:inline-flex hover:text-surface hover:font-medium px-3 py-1.5 rounded border border-white/30 text-sm hover:border-white/60"
                        onClick={() => navigate('/login')}>
                        Log in
                    </button>
                    <button className="px-3 py-1.5 rounded bg-white text-surface text-sm font-semibold hover:bg-white/90 "
                        onClick={() => navigate('/signup')}>
                        Get started
                    </button>
                </div>
            </nav>
        </header>
    );
}   