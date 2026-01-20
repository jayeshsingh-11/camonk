import { useState, useEffect } from 'react';
import { BlogListPanel } from '@/components/BlogListPanel';
import { BlogDetailPanel } from '@/components/BlogDetailPanel';

export function Home() {
    const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

    // Auto-select first blog on mount
    useEffect(() => {
        if (!selectedBlogId) {
            // We'll set the first blog when the BlogListPanel loads
            // For now, we'll let the user select manually
        }
    }, [selectedBlogId]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)] min-h-[600px]">
            {/* Left Panel - Blog List */}
            <div className="lg:col-span-4 h-full flex flex-col overflow-hidden bg-background/50 rounded-2xl border shadow-sm">
                <div className="p-4 border-b bg-muted/30 backdrop-blur-sm">
                    <h2 className="font-semibold text-lg tracking-tight">Latest Articles</h2>
                    <p className="text-xs text-muted-foreground">Select an article to read details</p>
                </div>
                <div className="overflow-y-auto p-4 flex-1 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                    <BlogListPanel
                        selectedBlogId={selectedBlogId}
                        onSelectBlog={setSelectedBlogId}
                    />
                </div>
            </div>

            {/* Right Panel - Blog Detail */}
            <div className="lg:col-span-8 h-full rounded-2xl border shadow-sm bg-background overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                <div className="p-6 md:p-8 lg:p-10">
                    <BlogDetailPanel blogId={selectedBlogId} />
                </div>
            </div>
        </div>
    );
}
