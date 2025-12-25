import { ReactNode } from "react";
import Layout from "./Layout";

interface BlogPostProps {
  title: string;
  content: ReactNode;
  excerpt?: string;
  tags?: string[];
  publishedDate?: string;
  readingTime?: string;
  slug: string;
  allPosts?: any[];
}

const BlogPost = ({
  title,
  content,
  excerpt,
  tags = [],
  publishedDate,
  readingTime,
}: BlogPostProps) => {
  const seoTitle = `${title} | devnid.xyz`;
  const seoDescription = excerpt || `บทความเรื่อง ${title} จาก devnid.xyz`;
  const seoKeywords = `${tags.join(", ")}, บทความ, devnid.xyz, การเขียนโปรแกรม`;

  return (
    <Layout
      title={seoTitle}
      description={seoDescription}
      keywords={seoKeywords}
    >
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            {publishedDate && (
              <time dateTime={publishedDate}>
                📅 {new Date(publishedDate).toLocaleDateString("th-TH")}
              </time>
            )}
            {readingTime && <span>⏱️ อ่าน {readingTime} นาที</span>}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">{content}</div>
      </article>
    </Layout>
  );
};

export default BlogPost;
