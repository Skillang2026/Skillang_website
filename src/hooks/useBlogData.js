// src/hooks/useBlogData.js
// Hook designed to work with CMS categories and your existing blogsData.js format

import { useState, useEffect, useCallback } from "react";
import blogService from "../services/blogService";

export const useBlogData = (initialBlogSlug = null) => {
  // State to match your blogsData.js structure
  const [blogsData, setBlogsData] = useState({
    categories: [
      "All",
      "Trending",
      "Business",
      "Top Salary",
      "Editor's Choice",
    ],
    mainFeature: null,
    posts: [],
  });
  const [singleBlog, setSingleBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all blogs in your blogsData format
  const fetchAllBlogsData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await blogService.getAllBlogs();
      setBlogsData(data);
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch blogs";
      console.error("Error in fetchAllBlogsData:", err);
      setError(errorMessage);
      // Keep default structure on error
      setBlogsData({
        categories: [
          "All",
          "Trending",
          "Business",
          "Top Salary",
          "Editor's Choice",
        ],
        mainFeature: null,
        posts: [],
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch specific blog data for detailed view
  const fetchBlogData = useCallback(async (slug) => {
    if (!slug) {
      console.warn("No slug provided to fetchBlogData");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await blogService.getBlogBySlug(slug);
      setSingleBlog(data);
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch blog data";
      console.error("Error in fetchBlogData:", err);
      setError(errorMessage);
      setSingleBlog(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search blogs and update posts array
  const searchBlogs = useCallback(async (searchTerm) => {
    setLoading(true);
    setError(null);

    try {
      const posts = await blogService.searchBlogs(searchTerm);
      setBlogsData((prev) => ({
        ...prev,
        posts,
      }));
    } catch (err) {
      const errorMessage = err.message || "Failed to search blogs";
      console.error("Error in searchBlogs:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch blogs by category using category name or slug
  const fetchBlogsByCategory = useCallback(async (categoryNameOrSlug) => {
    setLoading(true);
    setError(null);

    try {
      // Convert category name to slug if needed
      let categorySlug = categoryNameOrSlug;

      // Handle common category name to slug conversions
      const categoryMapping = {
        All: "all",
        Trending: "trending",
        Business: "business",
        "Top Salary": "top-salary",
        "Editor's Choice": "editors-choice",
      };

      if (categoryMapping[categoryNameOrSlug]) {
        categorySlug = categoryMapping[categoryNameOrSlug];
      } else if (categoryNameOrSlug.includes(" ")) {
        // Convert spaces to hyphens for slug
        categorySlug = categoryNameOrSlug.toLowerCase().replace(/\s+/g, "-");
      }

      const posts = await blogService.getBlogsByCategory(categorySlug);
      setBlogsData((prev) => ({
        ...prev,
        posts,
      }));
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch blogs by category";
      console.error("Error in fetchBlogsByCategory:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter posts by category (for client-side filtering)
  const getFilteredPosts = useCallback(
    (category) => {
      if (!blogsData.posts.length) return [];

      if (category === "All") {
        return blogsData.posts;
      }

      return blogsData.posts.filter(
        (post) => post.category && post.category.includes(category)
      );
    },
    [blogsData.posts]
  );

  // Get blog by ID from current posts
  const getBlogById = useCallback(
    (id) => {
      if (!blogsData.posts.length) return null;
      return blogsData.posts.find((post) => post.id === id);
    },
    [blogsData.posts]
  );

  // Get posts by CMS category (using cmsCategories field)
  const getPostsByCMSCategory = useCallback(
    (categoryName) => {
      if (!blogsData.posts.length) return [];

      return blogsData.posts.filter(
        (post) =>
          post.cmsCategories && post.cmsCategories.includes(categoryName)
      );
    },
    [blogsData.posts]
  );

  // Get all available CMS categories from current posts
  const getAvailableCMSCategories = useCallback(() => {
    if (!blogsData.posts.length) return [];

    const allCategories = blogsData.posts.flatMap(
      (post) => post.cmsCategories || []
    );
    return [...new Set(allCategories)];
  }, [blogsData.posts]);

  // Enhanced category filter that works with both display names and CMS categories
  const filterPostsByCategory = useCallback(
    (category) => {
      if (!blogsData.posts.length) return [];

      if (category === "All") {
        return blogsData.posts;
      }

      // Check both category array and cmsCategories
      return blogsData.posts.filter((post) => {
        const hasInCategory = post.category && post.category.includes(category);
        const hasInCMSCategory =
          post.cmsCategories && post.cmsCategories.includes(category);
        return hasInCategory || hasInCMSCategory;
      });
    },
    [blogsData.posts]
  );

  // Effect to fetch data when initialBlogSlug changes
  useEffect(() => {
    if (initialBlogSlug) {
      fetchBlogData(initialBlogSlug);
    }
  }, [initialBlogSlug, fetchBlogData]);

  // Refetch function
  const refetch = useCallback(() => {
    if (initialBlogSlug) {
      fetchBlogData(initialBlogSlug);
    } else {
      fetchAllBlogsData();
    }
  }, [initialBlogSlug, fetchBlogData, fetchAllBlogsData]);

  // Clear data function
  const clearData = useCallback(() => {
    setBlogsData({
      categories: [
        "All",
        "Trending",
        "Business",
        "Top Salary",
        "Editor's Choice",
      ],
      mainFeature: null,
      posts: [],
    });
    setSingleBlog(null);
    setError(null);
  }, []);

  return {
    // Data in your existing format
    blogsData,
    singleBlog,
    loading,
    error,

    // Basic actions
    fetchBlogData,
    fetchAllBlogsData,
    searchBlogs,
    fetchBlogsByCategory,
    refetch,
    clearData,

    // Filtering functions
    getFilteredPosts,
    getBlogById,
    filterPostsByCategory,

    // CMS-specific functions
    getPostsByCMSCategory,
    getAvailableCMSCategories,

    // Computed values
    hasBlogsData: blogsData.posts.length > 0,
    hasSingleBlog: !!singleBlog,
    isInitialLoading: loading && !blogsData.posts.length && !singleBlog,
    availableCategories: blogsData.categories,
    totalPosts: blogsData.posts.length,
  };
};

export default useBlogData;
