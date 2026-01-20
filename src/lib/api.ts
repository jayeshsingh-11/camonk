
export const API_URL = 'http://localhost:3001';

export interface Blog {
    id: number;
    title: string;
    category: string[];
    description: string;
    date: string;
    coverImage: string;
    content: string;
}

export async function fetchBlogs(): Promise<Blog[]> {
    const response = await fetch(`${API_URL}/blogs`);
    if (!response.ok) {
        throw new Error('Failed to fetch blogs');
    }
    return response.json();
}

export async function fetchBlogById(id: string): Promise<Blog> {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch blog');
    }
    return response.json();
}

export async function createBlog(blog: Omit<Blog, 'id'>): Promise<Blog> {
    const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
    });
    if (!response.ok) {
        throw new Error('Failed to create blog');
    }
    return response.json();
}
