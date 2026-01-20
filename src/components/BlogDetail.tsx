import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogById } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';

export function BlogDetail() {
    const { id } = useParams<{ id: string }>();

    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => fetchBlogById(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto">
                <Skeleton className="h-8 w-32 mb-6" />
                <Skeleton className="h-[400px] w-full rounded-lg mb-8" />
                <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-4 w-40 mb-8" />
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Blog</h2>
                    <p className="text-muted-foreground mb-4">{error.message}</p>
                    <Link to="/">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blogs
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Blog Not Found</h2>
                    <Link to="/">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blogs
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto">
            <Link to="/">
                <Button variant="ghost" className="mb-6 -ml-2">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blogs
                </Button>
            </Link>

            <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {blog.category.map((cat) => (
                    <Badge key={cat} variant="secondary">
                        {cat}
                    </Badge>
                ))}
            </div>

            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

            <p className="text-muted-foreground mb-8">
                {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </p>

            <div className="prose prose-lg max-w-none">
                {blog.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-foreground/90 leading-relaxed">
                        {paragraph}
                    </p>
                ))}
            </div>
        </article>
    );
}
