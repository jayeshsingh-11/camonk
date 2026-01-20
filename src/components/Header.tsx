import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
    return (
        <div className="flex flex-col w-full">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-primary text-primary-foreground p-1.5 rounded-lg font-black text-sm tracking-tighter group-hover:scale-110 transition-transform">CA</div>
                        <span className="font-bold text-xl tracking-tight text-foreground/90 group-hover:text-primary transition-colors">MONK</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                        {['Tools', 'Practice', 'Events', 'Job Board', 'Points'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="relative hover:text-primary transition-colors after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button size="sm" className="rounded-full px-6 font-semibold shadow-sm hover:shadow-md transition-all">
                            Profile
                        </Button>
                    </div>
                </div>
            </header>

            {/* Blog Page Hero Header */}
            <div className="w-full py-16 md:py-24 text-center bg-gradient-to-b from-muted/30 to-background border-b relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] opacity-100" style={{ backgroundSize: '24px 24px' }}></div>
                <div className="relative container mx-auto px-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 dark:from-white dark:to-slate-400 animate-in fade-in slide-in-from-bottom-3 duration-700">
                        CA Monk Blog
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto px-4 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                        Stay ahead in finance, accounting, and career growth with our latest insights.
                    </p>
                </div>
            </div>
        </div>
    );
}
