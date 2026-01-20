import { useQuery } from '@tanstack/react-query';
import { fetchBlogById } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Share2, ThumbsUp, MessageSquare, ArrowLeft } from 'lucide-react';

interface BlogDetailPanelProps {
    blogId: number | null;
}

export function BlogDetailPanel({ blogId }: BlogDetailPanelProps) {
    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', blogId],
        queryFn: () => fetchBlogById(String(blogId)),
        enabled: !!blogId,
    });

    if (!blogId) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-12 bg-muted/10 rounded-xl border-2 border-dashed border-muted">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                    <ArrowLeft className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">
                    Select an article
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto text-lg">
                    Choose a blog post from the list on the left to start reading.
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-8 animate-in fade-in duration-500">
                <Skeleton className="h-[400px] w-full rounded-2xl" />
                <div className="space-y-4 max-w-3xl mx-auto px-4">
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-12 w-3/4" />
                    <div className="flex gap-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="space-y-2 pt-8">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <h3 className="text-lg font-semibold mb-2 text-destructive">Unable to load blog</h3>
                <p className="text-muted-foreground">Please try again later.</p>
            </div>
        );
    }

    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    // Calculate read time (approx 200 words per minute)
    const wordCount = blog.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero Section */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden group mb-8 shadow-xl">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Blog+Cover+Image';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>

            <div className="max-w-4xl mx-auto px-2">
                {/* Header Metadata */}
                <div className="space-y-6 mb-8 border-b pb-8">
                    <div className="flex flex-wrap gap-2">
                        {blog.category.map((cat) => (
                            <Badge
                                key={cat}
                                variant="secondary"
                                className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 text-xs tracking-wider font-semibold"
                            >
                                {cat}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{readTime} min read</span>
                            </div>
                        </div>

                        <Button variant="outline" size="sm" className="gap-2 h-8 rounded-full">
                            <Share2 className="h-3 w-3" />
                            Share
                        </Button>
                    </div>

                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                        {blog.description}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-slate prose-lg dark:prose-invert max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
          prose-p:text-muted-foreground prose-p:leading-8
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:shadow-lg">
                    <div className="whitespace-pre-wrap">
                        {blog.content}
                    </div>
                </div>

                {/* Engagement Footer */}
                <div className="mt-12 pt-8 border-t flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-4">
                        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                            <ThumbsUp className="h-5 w-5" /> Liked
                        </Button>
                        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                            <MessageSquare className="h-5 w-5" /> Comment
                        </Button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center text-primary font-bold">
                            AM
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold text-foreground">Arjun Mehta</p>
                            <p className="text-muted-foreground text-xs">Senior Financial Analyst</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
