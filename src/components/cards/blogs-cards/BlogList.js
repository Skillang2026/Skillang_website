// src/sections/common/BlogList.js
"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Form,
  Button,
  Spinner,
  Dropdown,
} from "react-bootstrap";
import { HiTrendingUp } from "react-icons/hi";
import { useRouter } from "next/navigation";
import useBlogData from "../../hooks/useBlogData";
import BlogCard from "./BlogCard";

/**
 * Enhanced Blog List Component with CMS Categories support
 */
const BlogList = ({
  showSearch = true,
  showFilter = true,
  itemsPerPage = 9,
  variant = "default", // default, grid, compact
  showStats = false,
  showExcerpt = true,
  className = "",
  initialCategory = "All",
}) => {
  const router = useRouter();
  const {
    blogsData,
    loading,
    error,
    fetchAllBlogsData,
    searchBlogs,
    fetchBlogsByCategory,
    filterPostsByCategory,
    getAvailableCMSCategories,
  } = useBlogData();

  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [filterMode, setFilterMode] = useState("client"); // 'client' or 'server'

  // Fetch initial data
  useEffect(() => {
    fetchAllBlogsData();
  }, [fetchAllBlogsData]);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearching(true);
      await searchBlogs(searchTerm);
      setSelectedCategory("All");
      setCurrentPage(1);
      setFilterMode("server");
      setIsSearching(false);
    } else {
      await fetchAllBlogsData();
      setFilterMode("client");
    }
  };

  // Handle category filter
  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    if (searchTerm) {
      // If we're in search mode, use client-side filtering
      setFilterMode("client");
    } else {
      // Normal category filtering via API
      if (category === "All") {
        await fetchAllBlogsData();
      } else {
        await fetchBlogsByCategory(category);
      }
      setFilterMode("server");
    }
  };

  // Handle blog card click
  const handleCardClick = (postId) => {
    router.push(`/blog/${postId}`);
  };

  // Get current posts for display
  const getCurrentPosts = () => {
    let postsToFilter = blogsData.posts;

    // Apply category filter based on mode
    if (selectedCategory !== "All") {
      if (filterMode === "client") {
        postsToFilter = filterPostsByCategory(selectedCategory);
      }
      // Server mode already has filtered posts from API
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return postsToFilter.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const getTotalPages = () => {
    let totalPosts = blogsData.posts.length;

    if (selectedCategory !== "All" && filterMode === "client") {
      totalPosts = filterPostsByCategory(selectedCategory).length;
    }

    return Math.ceil(totalPosts / itemsPerPage);
  };

  // Get available categories (mix of CMS categories and display categories)
  const getDisplayCategories = () => {
    // Start with your predefined categories
    const baseCategories = blogsData.categories;

    // Add any additional CMS categories that aren't in the base list
    const cmsCategories = getAvailableCMSCategories();
    const additionalCategories = cmsCategories.filter(
      (cat) => !baseCategories.includes(cat) && cat !== "All"
    );

    return [...baseCategories, ...additionalCategories];
  };

  // Get grid column classes based on variant
  const getColClasses = () => {
    switch (variant) {
      case "compact":
        return "lg-3 md-4 sm-6";
      case "grid":
        return "lg-4 md-6";
      default:
        return "lg-4 md-6";
    }
  };

  // Loading state
  if (loading && !blogsData.posts.length) {
    return (
      <Container className={`py-5 text-center ${className}`}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Loading blogs...</p>
      </Container>
    );
  }

  // Error state
  if (error && !blogsData.posts.length) {
    return (
      <Container className={`py-5 ${className}`}>
        <div className="alert alert-danger">
          <h4>Error Loading Blogs</h4>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={fetchAllBlogsData}>
            Try Again
          </Button>
        </div>
      </Container>
    );
  }

  const currentPosts = getCurrentPosts();
  const totalPages = getTotalPages();
  const displayCategories = getDisplayCategories();

  return (
    <Container className={`py-5 ${className}`}>
      {/* Search and Filter Section */}
      {(showSearch || showFilter) && (
        <Row className="mb-4">
          {/* Search */}
          {showSearch && (
            <Col lg={showFilter ? 8 : 12}>
              <Form onSubmit={handleSearch}>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    placeholder="Search blogs by title, content, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={isSearching}
                  />
                  <Button
                    type="submit"
                    variant="outline-primary"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <Spinner size="sm" className="me-1" />
                        Searching...
                      </>
                    ) : (
                      "Search"
                    )}
                  </Button>
                  {searchTerm && (
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setSearchTerm("");
                        fetchAllBlogsData();
                        setFilterMode("client");
                      }}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </Form>
            </Col>
          )}

          {/* Category Filter */}
          {showFilter && (
            <Col lg={showSearch ? 4 : 12}>
              {/* Desktop Filter */}
              <div className="filter-tabs d-none d-md-block">
                <Nav variant="pills" className="flex-nowrap">
                  {displayCategories.slice(0, 5).map((category, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link
                        active={selectedCategory === category}
                        onClick={() => handleCategoryFilter(category)}
                        className="text-nowrap"
                      >
                        {category === "Trending" && (
                          <HiTrendingUp
                            style={{ width: "16px", height: "auto" }}
                            className="me-1"
                          />
                        )}
                        {category}
                      </Nav.Link>
                    </Nav.Item>
                  ))}

                  {/* More categories dropdown */}
                  {displayCategories.length > 5 && (
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-secondary" size="sm">
                        More
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {displayCategories.slice(5).map((category, index) => (
                          <Dropdown.Item
                            key={index}
                            active={selectedCategory === category}
                            onClick={() => handleCategoryFilter(category)}
                          >
                            {category}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </Nav>
              </div>

              {/* Mobile Filter */}
              <div className="d-md-none">
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                >
                  {displayCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Col>
          )}
        </Row>
      )}

      {/* Results Count and Filter Info */}
      <Row className="mb-3">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="text-muted mb-0">
                {currentPosts.length > 0 ? (
                  <>
                    Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                    {Math.min(
                      currentPage * itemsPerPage,
                      selectedCategory === "All" && filterMode === "server"
                        ? blogsData.posts.length
                        : filterPostsByCategory(selectedCategory).length
                    )}{" "}
                    of{" "}
                    {selectedCategory === "All" && filterMode === "server"
                      ? blogsData.posts.length
                      : filterPostsByCategory(selectedCategory).length}{" "}
                    blog posts
                    {selectedCategory !== "All" && ` in "${selectedCategory}"`}
                    {searchTerm && ` for "${searchTerm}"`}
                  </>
                ) : (
                  "No blog posts found"
                )}
              </p>

              {/* Filter mode indicator */}
              {filterMode === "server" && selectedCategory !== "All" && (
                <small className="text-success">
                  ✓ Server-filtered results
                </small>
              )}
            </div>

            {/* View toggle for different variants */}
            <div className="btn-group btn-group-sm" role="group">
              <input
                type="radio"
                className="btn-check"
                name="viewType"
                id="grid-view"
                defaultChecked
              />
              <label className="btn btn-outline-secondary" htmlFor="grid-view">
                Grid
              </label>
              <input
                type="radio"
                className="btn-check"
                name="viewType"
                id="list-view"
              />
              <label className="btn btn-outline-secondary" htmlFor="list-view">
                List
              </label>
            </div>
          </div>
        </Col>
      </Row>

      {/* Blog Grid */}
      <Row>
        {currentPosts.map((post) => (
          <Col
            key={post.id || post.documentId}
            className={`mb-4 col-${getColClasses()}`}
          >
            <BlogCard
              post={post}
              onClick={handleCardClick}
              variant={variant}
              showStats={showStats}
              showExcerpt={showExcerpt}
            />
          </Col>
        ))}
      </Row>

      {/* No Results */}
      {currentPosts.length === 0 && !loading && (
        <Row>
          <Col className="text-center py-5">
            <div className="text-muted">
              <h4>No blogs found</h4>
              <p>
                {searchTerm
                  ? `No results found for "${searchTerm}". Try different keywords.`
                  : selectedCategory !== "All"
                  ? `No blogs found in "${selectedCategory}" category.`
                  : "No blog posts available at the moment."}
              </p>
              {(searchTerm || selectedCategory !== "All") && (
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    fetchAllBlogsData();
                    setFilterMode("client");
                  }}
                >
                  Show All Blogs
                </Button>
              )}
            </div>
          </Col>
        </Row>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Row className="mt-4">
          <Col>
            <nav aria-label="Blog pagination">
              <ul className="pagination justify-content-center">
                {/* Previous Button */}
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2);

                    if (!showPage) {
                      // Show ellipsis
                      if (
                        page === currentPage - 3 ||
                        page === currentPage + 3
                      ) {
                        return (
                          <li key={page} className="page-item disabled">
                            <span className="page-link">...</span>
                          </li>
                        );
                      }
                      return null;
                    }

                    return (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    );
                  }
                )}

                {/* Next Button */}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      )}

      {/* Category Stats */}
      {blogsData.posts.length > 0 && (
        <Row className="mt-4">
          <Col>
            <div className="bg-light rounded p-3">
              <h6 className="mb-2">Category Distribution</h6>
              <div className="d-flex flex-wrap gap-2">
                {displayCategories.map((category, index) => {
                  const count =
                    category === "All"
                      ? blogsData.posts.length
                      : filterPostsByCategory(category).length;

                  return count > 0 ? (
                    <span
                      key={index}
                      className={`badge ${
                        selectedCategory === category
                          ? "bg-primary"
                          : "bg-secondary"
                      } cursor-pointer`}
                      onClick={() => handleCategoryFilter(category)}
                      style={{ cursor: "pointer" }}
                    >
                      {category} ({count})
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          </Col>
        </Row>
      )}

      {/* Loading overlay for search/filter operations */}
      {(loading || isSearching) && blogsData.posts.length > 0 && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75"
          style={{ zIndex: 1050 }}
        >
          <div className="text-center">
            <Spinner animation="border" variant="primary" size="lg" />
            <h5 className="mt-3 text-muted">
              {isSearching ? "Searching blogs..." : "Loading blogs..."}
            </h5>
            <p className="text-muted">
              Please wait while we fetch the latest content
            </p>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <Row className="mt-5">
        <Col className="text-center">
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button
              variant="outline-primary"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setCurrentPage(1);
                fetchAllBlogsData();
                setFilterMode("client");
              }}
            >
              Refresh All Blogs
            </Button>

            {blogsData.posts.length > 0 && (
              <Button
                variant="outline-secondary"
                onClick={() => {
                  const randomPage = Math.floor(Math.random() * totalPages) + 1;
                  setCurrentPage(randomPage);
                }}
              >
                Random Page
              </Button>
            )}

            <Button
              variant="outline-info"
              onClick={() => router.push("/blog/search")}
            >
              Advanced Search
            </Button>
          </div>

          {/* Blog stats */}
          {blogsData.posts.length > 0 && (
            <div className="mt-3 text-muted">
              <small>
                Total: {blogsData.posts.length} blogs • Categories:{" "}
                {displayCategories.length} • Current page: {currentPage} of{" "}
                {totalPages}
              </small>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BlogList;
