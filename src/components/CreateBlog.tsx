import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Loader2 } from 'lucide-react';

export function CreateBlog() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        coverImage: '',
        category: [] as string[],
    });

    const [categoryInput, setCategoryInput] = useState('');

    const mutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            navigate('/');
        },
    });

    const handleAddCategory = () => {
        if (categoryInput.trim() && !formData.category.includes(categoryInput.trim())) {
            setFormData({
                ...formData,
                category: [...formData.category, categoryInput.trim().toUpperCase()],
            });
            setCategoryInput('');
        }
    };

    const handleRemoveCategory = (cat: string) => {
        setFormData({
            ...formData,
            category: formData.category.filter((c) => c !== cat),
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({
            ...formData,
            date: new Date().toISOString(),
        });
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Create New Blog</h1>
                <p className="text-muted-foreground">
                    Share your thoughts and ideas with the community
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                        id="title"
                        placeholder="Enter blog title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                        id="description"
                        placeholder="Brief description of your blog"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        rows={3}
                    />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image URL *</Label>
                    <Input
                        id="coverImage"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        required
                    />
                </div>

                {/* Categories */}
                <div className="space-y-2">
                    <Label htmlFor="category">Categories *</Label>
                    <div className="flex gap-2">
                        <Input
                            id="category"
                            placeholder="e.g., TECH, FINANCE"
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddCategory();
                                }
                            }}
                        />
                        <Button type="button" onClick={handleAddCategory} variant="outline">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    {formData.category.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.category.map((cat) => (
                                <Badge key={cat} variant="secondary" className="gap-1">
                                    {cat}
                                    <X
                                        className="h-3 w-3 cursor-pointer"
                                        onClick={() => handleRemoveCategory(cat)}
                                    />
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                        id="content"
                        placeholder="Write your blog content here..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        rows={12}
                        className="font-mono text-sm"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end">
                    <Button type="button" variant="outline" onClick={() => navigate('/')}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {mutation.isPending ? 'Publishing...' : 'Publish Blog'}
                    </Button>
                </div>

                {mutation.isError && (
                    <div className="text-sm text-destructive">
                        Failed to create blog. Please try again.
                    </div>
                )}
            </form>
        </div>
    );
}
