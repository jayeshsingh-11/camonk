import type { Blog } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
    blog: Blog;
    isSelected?: boolean;
    onClick: () => void;
}

export function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div
            onClick={onClick}
            className={cn(
                "group relative flex flex-col gap-3 rounded-xl border p-4 transition-all duration-300 hover:shadow-lg cursor-pointer",
                isSelected
                    ? "bg-accent/50 border-primary/50 shadow-md ring-1 ring-primary/20"
                    : "bg-card hover:border-primary/50 hover:bg-accent/5"
            )}
        >
            <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    {blog.category.slice(0, 2).map((cat) => (
                        <Badge
                            key={cat}
                            variant={isSelected ? "default" : "secondary"}
                            className="text-[10px] px-2 py-0 h-5 font-medium tracking-wide"
                        >
                            {cat}
                        </Badge>
                    ))}
                    {blog.category.length > 2 && (
                        <Badge variant="outline" className="text-[10px] px-2 py-0 h-5">
                            +{blog.category.length - 2}
                        </Badge>
                    )}
                </div>
                <span className="flex items-center text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    {formattedDate}
                </span>
            </div>

            <div className="space-y-2">
                <h3 className={cn(
                    "font-bold text-lg leading-tight transition-colors duration-300 line-clamp-2",
                    isSelected ? "text-primary" : "group-hover:text-primary"
                )}>
                    {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {blog.description}
                </p>
            </div>

            <div className="mt-auto pt-2 flex items-center text-xs font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                Read Article <ChevronRight className="ml-1 h-3 w-3" />
            </div>
        </div>
    );
}
