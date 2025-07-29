// src/sections/more/blogs/main-blog-page/header/BlogMainPageHeader.js
"use client";

import React, { useEffect } from "react";
import "./BlogMainPageHeader.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import useBlogData from "@/hooks/useBlogData";
import BlogSidebar from "../../side-area/BlogSidebar";

const BlogMainPageHeader = () => {
  // Use the new hook to fetch CMS data
  const { blogsData, loading, error, fetchAllBlogsData } = useBlogData();

  // Fetch data on component mount
  useEffect(() => {
    fetchAllBlogsData();
  }, [fetchAllBlogsData]);

  // Loading state
  if (loading) {
    return (
      <section>
        <Container>
          <Row>
            <Col sm={12} xs={12} md={7} className="bg-primar">
              <div
                className="w-100 blog-main-header-left-img bg-light placeholder-glow d-flex align-items-center justify-content-center"
                style={{ height: "300px" }}
              >
                <span className="placeholder w-100 h-100"></span>
              </div>
              <div className="mt-3 placeholder-glow">
                <span className="placeholder col-8 heading-big-medium"></span>
              </div>
            </Col>
            <Col sm={12} xs={12} md={5}>
              <BlogSidebar />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section>
        <Container>
          <div className="alert alert-danger">
            <h4>Error Loading Blogs</h4>
            <p>{error}</p>
            <button
              className="btn btn-outline-danger"
              onClick={fetchAllBlogsData}
            >
              Try Again
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container>
        <Row>
          <Col sm={12} xs={12} md={7} className="bg-primar">
            <Image
              src={
                blogsData.mainFeature?.featuredImage ||
                "/assets/images/Blogs/header-blog-main.jpg"
              }
              className="w-100 blog-main-header-left-img"
              alt="Study Abroad Consultants In Chennai"
            />
            <h1 className="heading-big-medium mt-3">
              {blogsData.mainFeature?.title || "Latest Blog Posts"}
            </h1>
            {blogsData.mainFeature?.excerpt && (
              <p className="mt-2 text-muted">{blogsData.mainFeature.excerpt}</p>
            )}
          </Col>
          <Col sm={12} xs={12} md={5}>
            <BlogSidebar initialFilter="Trending" maxPosts={4} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BlogMainPageHeader;
