// app/blogs/page.js

import EditorsChoiceSection from "@/sections/more/blogs/main-blog-page/editors-choice-section/EditorsChoiceSection";
import BlogMainPageHeader from "@/sections/more/blogs/main-blog-page/header/BlogMainPageHeader";
import LatestArticlesSection from "@/sections/more/blogs/main-blog-page/latesest-article/LatestArticlesSection";

export const metadata = {
  title: "Blog | Skillang Careers - Study Abroad Insights",
  description:
    "Discover the latest insights, tips, and guides for studying abroad. Expert advice on university applications, visa processes, and destination guides.",
  keywords:
    "study abroad blog, international education, university guides, visa tips, student life",
  alternates: {
    canonical: "https://www.skillang.com/blog",
  },
};

export default function BlogsPage() {
  return (
    <>
      <BlogMainPageHeader />
      <EditorsChoiceSection />
      <LatestArticlesSection />
    </>
  );
}
