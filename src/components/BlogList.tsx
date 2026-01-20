import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export function BlogList() {
    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });

    if (isLoading) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardHeader>
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-6 w-full mt-2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4 mt-2" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Blogs</h2>
                    <p className="text-muted-foreground">{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs?.map((blog) => (
                <Link key={blog.id} to={`/blogs/${blog.id}`}>
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer group">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {blog.category.map((cat) => (
                                    <Badge key={cat} variant="secondary" className="text-xs">
                                        {cat}
                                    </Badge>
                                ))}
                            </div>
                            <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                {blog.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="line-clamp-3">
                                {blog.description}
                            </CardDescription>
                            <p className="text-xs text-muted-foreground mt-3">
                                {new Date(blog.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
