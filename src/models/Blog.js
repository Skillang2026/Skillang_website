// src/models/Blog.js

/**
 * Raw API Blog Model (what comes from Strapi CMS)
 */
export const ApiBlogModel = {
  id: 0,
  documentId: "",
  title: "",
  slug: "",
  description: "",
  Keywords: "",
  createdAt: "",
  updatedAt: "",
  publishedAt: "",
  date: "",
  BlogAuthorName: "",
  featuredImage: null,
  sections: [],
  summarySection: null,
};

/**
 * Frontend Blog Model (after transformation to match your blogsData.js format)
 */
export const FrontendBlogModel = {
  id: "",
  title: "",
  date: "",
  views: 0,
  comments: 0,
  category: [],
  excerpt: "",
  featuredImage: "",
  content: {
    heading: "",
    intro: "",
    sections: [],
    conclusion: "",
  },
  keywords: [],
};

/**
 * Blog Section Model (matches your content.sections structure)
 */
export const BlogSectionModel = {
  title: "",
  text: "",
};

/**
 * BlogsData Model (matches your blogsData.js structure)
 */
export const BlogsDataModel = {
  categories: [],
  mainFeature: {
    id: "",
    title: "",
    featuredImage: "",
    excerpt: "",
  },
  posts: [],
};

/**
 * Validation Functions
 */
export const validateBlogData = (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid blog data: must be an object");
  }

  const required = ["id", "title"];
  for (const field of required) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  return true;
};

export const validateBlogApiResponse = (response) => {
  if (!response || !response.data) {
    throw new Error("Invalid API response: missing data");
  }

  if (!Array.isArray(response.data.data)) {
    throw new Error("Invalid API response: data.data must be an array");
  }

  return true;
};

/**
 * Default values and constants
 */
export const DEFAULT_CATEGORIES = [
  "All",
  "Trending",
  "Business",
  "Top Salary",
  "Editor's Choice",
];

export const DEFAULT_FALLBACK_IMAGE = "/assets/images/Blogs/trend-1.jpg";

export const BLOG_CONSTANTS = {
  WORDS_PER_MINUTE: 200,
  EXCERPT_MAX_LENGTH: 150,
  DEFAULT_VIEWS: 0,
  DEFAULT_COMMENTS: 0,
};
