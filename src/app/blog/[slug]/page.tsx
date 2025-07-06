import { getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), '_posts');
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => ({
        slug: fileName.replace(/\.md$/, ''),
    }));
}

export default async function Post({ params }: { params: { slug: string } }) {
    try {
        const postData = await getPostData(params.slug);
        return (
            <article style={{ padding: '2rem' }}>
                <h1 style={{ fontSize: '2rem' }}>{postData.title}</h1>
                <div style={{ color: 'gray', marginBottom: '1.5rem' }}>{postData.date}</div>
                <div
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                    style={{ lineHeight: '1.7' }}
                />
            </article>
        );
    } catch {
        notFound();
    }
}