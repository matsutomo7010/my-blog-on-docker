import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function BlogHome() {
    const allPostsData = getSortedPostsData();
    return (
        <section style={{ padding: '2rem' }}>
            <h2>📝 Blog</h2>
            <ul>
                {allPostsData.map(({ slug, date, title }) => (
                    <li key={slug} style={{ marginBottom: '1rem' }}>
                        <Link href={`/blog/${slug}`} style={{ fontSize: '1.2rem' }}>
                            {title}
                        </Link>
                        <br />
                        <small style={{ color: 'gray' }}>{date}</small>
                    </li>
                ))}
            </ul>
        </section>
    );
}