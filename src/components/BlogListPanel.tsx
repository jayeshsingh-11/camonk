import { useQuery } from '@tanstack/react-query';
import { fetchBlogs } from '@/lib/api';
import { BlogCard } from './BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface BlogListPanelProps {
    selectedBlogId: number | null;
    onSelectBlog: (id: number) => void;
}

export function BlogListPanel({ selectedBlogId, onSelectBlog }: BlogListPanelProps) {
    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Latest Articles</h2>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="space-y-3 p-4 border rounded-lg">
                        <div className="flex justify-between">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-lg font-semibold mb-2">Failed to load blogs</h3>
                <p className="text-sm text-muted-foreground">
                    {error instanceof Error ? error.message : 'An error occurred'}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Latest Articles</h2>
            <div className="space-y-3">
                {blogs?.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        isSelected={selectedBlogId === blog.id}
                        onClick={() => onSelectBlog(blog.id)}
                    />
                ))}
            </div>
        </div>
    );
}
