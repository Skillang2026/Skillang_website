// src/services/blogService.js
import axios from "axios";

const API_BASE_URL = "https://cms.skillang.com/api";

// Create axios instance for blog API calls
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

class BlogService {
  /**
   * Get all blog categories from CMS (using correct endpoint)
   */
  async getAllCategories() {
    try {
      // console.log(
      //   "Fetching categories from:",
      //   `${API_BASE_URL}/blogs-categories`
      // );

      const response = await api.get("/blogs-categories", {
        params: {
          "sort[0]": "id:asc",
        },
      });

      // console.log("Categories response:", response.data);

      if (!response.data || !response.data.data) {
        console.warn("Invalid categories response structure, using fallback");
        return ["All", "Trending", "Business", "Top Salary", "Editors Choice"];
      }

      // Map CMS categories to your format
      const categories = response.data.data.map((cat) => cat.name);

      return categories; // Return as-is since "All" is already in CMS
    } catch (error) {
      console.error(
        "Error fetching blog categories:",
        error.response?.data || error.message
      );
      return ["All", "Trending", "Business", "Top Salary", "Editors Choice"];
    }
  }

  /**
   * Get all blog posts formatted for your existing UI components
   */
  async getAllBlogs() {
    try {
      // console.log("Fetching blogs from:", `${API_BASE_URL}/blog-posts`);

      const [blogsResponse, categoriesResponse] = await Promise.all([
        api.get("/blog-posts", {
          params: {
            "populate[featuredImage]": true,
            "populate[sections]": true,
            "populate[summarySection]": true,
            "populate[blogs_categories]": true,
            "sort[0]": "date:desc",
          },
        }),
        this.getAllCategories(),
      ]);

      // console.log("Blogs response:", blogsResponse.data);

      if (!blogsResponse.data || !blogsResponse.data.data) {
        console.warn("Invalid blogs response structure");
        return {
          categories: categoriesResponse,
          mainFeature: null,
          posts: [],
        };
      }

      const apiPosts = blogsResponse.data.data;
      const transformedData = this.transformApiDataToUIFormat(
        apiPosts,
        categoriesResponse
      );

      // console.log("Transformed blog data:", transformedData);
      return transformedData;
    } catch (error) {
      console.error(
        "Error fetching blog posts:",
        error.response?.data || error.message
      );

      const fallbackCategories = await this.getAllCategories();
      return {
        categories: fallbackCategories,
        mainFeature: null,
        posts: [],
      };
    }
  }

  /**
   * Get blog posts by category slug - returns in your UI format
   */
  async getBlogsByCategory(categorySlug) {
    try {
      // console.log("Fetching blogs by category:", categorySlug);

      // Handle "All" category
      if (categorySlug.toLowerCase() === "all") {
        const allBlogs = await this.getAllBlogs();
        return allBlogs.posts;
      }

      const response = await api.get("/blog-posts", {
        params: {
          "filters[blogs_categories][slug][$eq]": categorySlug,
          "populate[featuredImage]": true,
          "populate[sections]": true,
          "populate[blogs_categories]": true,
          "sort[0]": "date:desc",
        },
      });

      // console.log(`Blogs for category ${categorySlug}:`, response.data);

      if (!response.data || !response.data.data) {
        return [];
      }

      return response.data.data.map((blog) =>
        this.transformBlogToPostFormat(blog)
      );
    } catch (error) {
      console.error(
        `Error fetching blogs for category ${categorySlug}:`,
        error.response?.data || error.message
      );
      return [];
    }
  }

  /**
   * Get latest articles (sorted by date)
   */
  async getLatestArticles(limit = 4) {
    try {
      // console.log("Fetching latest articles, limit:", limit);

      const response = await api.get("/blog-posts", {
        params: {
          "populate[featuredImage]": true,
          "populate[blogs_categories]": true,
          "sort[0]": "date:desc",
          "pagination[limit]": limit,
        },
      });

      if (!response.data || !response.data.data) {
        return [];
      }

      return response.data.data.map((blog) =>
        this.transformBlogToPostFormat(blog)
      );
    } catch (error) {
      console.error(
        "Error fetching latest articles:",
        error.response?.data || error.message
      );
      return [];
    }
  }

  /**
   * Get Editor's Choice articles
   */
  async getEditorsChoice(limit = 3) {
    try {
      // console.log("Fetching Editor's Choice articles, limit:", limit);

      const response = await api.get("/blog-posts", {
        params: {
          "filters[blogs_categories][slug][$eq]": "editors-choice",
          "populate[featuredImage]": true,
          "populate[blogs_categories]": true,
          "sort[0]": "date:desc",
          "pagination[limit]": limit,
        },
      });

      // console.log("Editor's Choice response:", response.data);

      if (!response.data || !response.data.data) {
        return [];
      }

      return response.data.data.map((blog) =>
        this.transformBlogToPostFormat(blog)
      );
    } catch (error) {
      console.error(
        "Error fetching Editor's Choice:",
        error.response?.data || error.message
      );
      return [];
    }
  }

  /**
   * Get specific blog post by slug/id with full details
   */
  async getBlogBySlug(slug) {
    try {
      if (!slug) {
        throw new Error("Blog slug is required");
      }

      // console.log("Fetching blog by slug:", slug);

      const response = await api.get("/blog-posts", {
        params: {
          "filters[slug][$eq]": slug,
          "populate[featuredImage]": true,
          "populate[sections]": true,
          "populate[summarySection]": true,
          "populate[blogs_categories]": true,
        },
      });

      if (
        !response.data ||
        !response.data.data ||
        response.data.data.length === 0
      ) {
        throw new Error(`Blog with slug '${slug}' not found`);
      }

      const blogData = response.data.data[0];
      // console.log("Single blog data:", blogData);

      return this.transformSingleBlogToUIFormat(blogData);
    } catch (error) {
      console.error(
        `Error fetching blog ${slug}:`,
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to fetch blog data for '${slug}': ${error.message}`
      );
    }
  }

  /**
   * Search blog posts - returns in your UI format
   */
  async searchBlogs(searchTerm) {
    try {
      // console.log("Searching blogs for:", searchTerm);

      const response = await api.get("/blog-posts", {
        params: {
          "filters[$or][0][title][$containsi]": searchTerm,
          "filters[$or][1][description][$containsi]": searchTerm,
          "filters[$or][2][Keywords][$containsi]": searchTerm,
          "populate[featuredImage]": true,
          "populate[sections]": true,
          "populate[blogs_categories]": true,
          "sort[0]": "date:desc",
        },
      });

      if (!response.data || !response.data.data) {
        return [];
      }

      return response.data.data.map((blog) =>
        this.transformBlogToPostFormat(blog)
      );
    } catch (error) {
      console.error(
        `Error searching blogs for term ${searchTerm}:`,
        error.response?.data || error.message
      );
      return [];
    }
  }

  /**
   * Transform API data to match your existing blogsData.js format
   */
  transformApiDataToUIFormat(apiPosts, categories) {
    const posts = apiPosts.map((blog) => this.transformBlogToPostFormat(blog));

    // Set the first blog as main feature
    const mainFeature =
      posts.length > 0
        ? {
            id: posts[0].id,
            title: posts[0].title,
            featuredImage: posts[0].featuredImage,
            excerpt: posts[0].excerpt,
          }
        : null;

    return {
      categories,
      mainFeature,
      posts,
    };
  }

  /**
   * Transform single blog to your post format
   */
  transformBlogToPostFormat(blog) {
    const {
      id,
      documentId,
      title = "",
      slug = "",
      description = "",
      Keywords = "",
      date = "",
      BlogAuthorName = "",
      featuredImage = null,
      sections = [],
      blogs_categories = [],
    } = blog;

    // Get featured image URL
    const featuredImageUrl = featuredImage?.url
      ? `https://cms.skillang.com${featuredImage.url}`
      : "/assets/images/Blogs/trend-1.jpg";

    // Create categories array from CMS categories
    const cmsCategories = blogs_categories?.map((cat) => cat.name) || [];
    const categories = ["All", ...cmsCategories];

    const keywords = Keywords ? Keywords.split(",").map((k) => k.trim()) : [];

    return {
      id: slug || documentId || id.toString(),
      title,
      date: this.formatDateToUI(date),
      views: 0,
      comments: 0,
      category: categories,
      excerpt: this.createExcerpt(description),
      featuredImage: featuredImageUrl,
      content: this.transformContentToUIFormat(blog),
      keywords: keywords,
      author: BlogAuthorName,
      cmsCategories: cmsCategories,
    };
  }

  /**
   * Transform single blog for detailed view
   */
  transformSingleBlogToUIFormat(blog) {
    const {
      title = "",
      slug = "",
      description = "",
      Keywords = "",
      date = "",
      BlogAuthorName = "",
      featuredImage = null,
      sections = [],
      summarySection = null,
      blogs_categories = [],
    } = blog;

    const featuredImageUrl = featuredImage?.url
      ? `https://cms.skillang.com${featuredImage.url}`
      : "/assets/images/Blogs/trend-1.jpg";

    const keywords = Keywords ? Keywords.split(",").map((k) => k.trim()) : [];
    const cmsCategories = blogs_categories?.map((cat) => cat.name) || [];
    const categories = ["All", ...cmsCategories];

    return {
      id: slug,
      title,
      date: this.formatDateToUI(date),
      views: 0,
      comments: 0,
      category: categories,
      excerpt: this.createExcerpt(description),
      featuredImage: featuredImageUrl,
      keywords: keywords,
      author: BlogAuthorName,
      cmsCategories: cmsCategories,
      content: {
        heading: title,
        intro: description,
        sections: sections.map((section) => ({
          title: section.title,
          text: section.description,
        })),
        conclusion: summarySection?.summary || "",
      },
    };
  }

  /**
   * Transform content to match your UI content structure
   */
  transformContentToUIFormat(blog) {
    const { title, description, sections = [], summarySection = null } = blog;

    return {
      heading: title,
      intro: description,
      sections: sections.map((section) => ({
        title: section.title,
        text: section.description,
      })),
      conclusion: summarySection?.summary || "",
    };
  }

  /**
   * Utility functions
   */
  createExcerpt(description, maxLength = 150) {
    if (!description) return "";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + "...";
  }

  formatDateToUI(dateString) {
    if (!dateString) return new Date().toLocaleDateString();

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }
}

// Export singleton instance
const blogService = new BlogService();
export default blogService;
