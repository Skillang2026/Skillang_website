// src/sections/common/BlogSidebar.js
"use client";

import React, { useState, useEffect } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import { HiTrendingUp } from "react-icons/hi";
import { useRouter } from "next/navigation";
import useBlogData from "@/hooks/useBlogData";
import BlogCardComp from "@/components/cards/blogs-cards/BlogCards";
import "./BlogSidebar.css";

/**
 * Common Blog Sidebar Component
 * Used in both main blog page and individual blog pages
 */
const BlogSidebar = ({
  className = "",
  showCategories = true,
  initialFilter = "Trending",
  maxPosts = 4,
}) => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const { blogsData, loading, error, fetchAllBlogsData, getFilteredPosts } =
    useBlogData();

  // Fetch data on component mount
  useEffect(() => {
    fetchAllBlogsData();
  }, [fetchAllBlogsData]);

  // Get filtered posts based on active filter
  const filteredPosts = getFilteredPosts(activeFilter).slice(0, maxPosts);

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Handle blog card click
  const handleCardClick = (postId) => {
    router.push(`/blog/${postId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className={`blog-sidebar ${className}`}>
        <Row>
          <div className="filter-tabs">
            <Nav variant="pills">
              {["All", "Trending", "Business"].map((category, index) => (
                <Nav.Item key={index}>
                  <Nav.Link className="placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </Row>
        <Row>
          {Array.from({ length: maxPosts }).map((_, index) => (
            <Col sm={12} xs={12} md={6} key={index} className="mb-3">
              <div className="card">
                <div
                  className="card-img-top bg-light placeholder-glow"
                  style={{ height: "120px" }}
                >
                  <span className="placeholder w-100 h-100"></span>
                </div>
                <div className="card-body">
                  <div className="placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`blog-sidebar ${className}`}>
        <Row>
          <Col>
            <div className="alert alert-warning">
              <small>Unable to load sidebar content</small>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className={`blog-sidebar ${className}`}>
      {/* Category Filter Tabs */}
      {showCategories && (
        <Row>
          <div className="filter-tabs">
            <Nav variant="pills">
              {blogsData.categories
                .filter((category) => category !== "Editors Choice") // Exclude Editor's Choice from sidebar
                .map((category, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link
                      active={activeFilter === category}
                      onClick={() => handleFilterChange(category)}
                    >
                      {category === "Trending" && (
                        <HiTrendingUp
                          style={{ width: "20px", height: "auto" }}
                        />
                      )}{" "}
                      {category}
                    </Nav.Link>
                  </Nav.Item>
                ))}
            </Nav>
          </div>
        </Row>
      )}

      {/* Blog Posts Grid */}
      <Row>
        {filteredPosts.map((post) => (
          <Col sm={12} xs={12} md={6} key={post.id} className="mb-3">
            <BlogCardComp post={post} onClick={handleCardClick} />
          </Col>
        ))}
      </Row>

      {/* No posts message */}
      {filteredPosts.length === 0 && !loading && (
        <Row>
          <Col>
            <div className="text-center text-muted py-3">
              <small>No posts found for {activeFilter}</small>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BlogSidebar;
