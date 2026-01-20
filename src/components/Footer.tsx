export function Footer() {
    return (
        <footer className="bg-[#0f172a] text-slate-300 w-full mt-auto">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white">
                            <div className="bg-white text-[#0f172a] p-1 rounded font-bold text-xs">CA</div>
                            <span className="font-bold text-lg">MONK</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Empowering the next generation of financial leaders with tools, community, and knowledge.
                        </p>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">RESOURCES</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                        </ul>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">PLATFORM</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors">Job Board</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Practice Tests</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Mentorship</a></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">CONNECT</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center bg-[#0f172a] gap-4 text-xs text-slate-500">
                    <p>© 2024 CA Monk. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
