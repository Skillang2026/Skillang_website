// app/blogs/[id]/page.jsx
import BlogsSepPageHeader from "@/sections/more/blogs/sep-blog-page/header/blogsHeader";

export default function BlogDetailPage({ params }) {
  return <BlogsSepPageHeader />;
}

// Generate static params for popular blog posts (optional for ISR)
export async function generateStaticParams() {
  try {
    // Fetch popular/recent blog posts for pre-generation
    const response = await fetch(
      "https://cms.skillang.com/api/blog-posts?fields[0]=slug&sort[0]=date:desc&pagination[limit]=10"
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (data.data && Array.isArray(data.data)) {
      return data.data
        .filter((blog) => blog.slug)
        .map((blog) => ({
          id: blog.slug,
        }));
    }
  } catch (error) {
    console.error("Error generating static params for blogs:", error);
  }

  return [];
}
