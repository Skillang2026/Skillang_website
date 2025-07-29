// src/sections/more/blogs/sep-blog-page/header/blogsHeader.js
"use client";

import React, { useEffect } from "react";
import "./blogsHeader.css";
import { Container, Row, Col, Image, Breadcrumb } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import UniContactComp from "@/sections/resuable/uni-contact/UniContact";
import useBlogData from "@/hooks/useBlogData";
import BlogSidebar from "../../side-area/BlogSidebar";

const BlogsSepPageHeader = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  // Use the new hook to fetch blog data
  const { singleBlog, loading, error, fetchBlogData } = useBlogData();

  // Fetch specific blog data
  useEffect(() => {
    if (id) {
      fetchBlogData(id);
    }
  }, [id, fetchBlogData]);

  // Loading state
  if (loading && !singleBlog) {
    return (
      <section>
        <Container>
          <Row>
            <Col sm={12} xs={12} md={7}>
              <Container>
                {/* Breadcrumb placeholder */}
                <div className="mt-3 placeholder-glow">
                  <span className="placeholder col-4"></span>
                </div>

                {/* Featured Image placeholder */}
                <div
                  className="w-100 blog-main-header-left-img mb-4 bg-light placeholder-glow d-flex align-items-center justify-content-center"
                  style={{ height: "300px" }}
                >
                  <span className="placeholder w-100 h-100"></span>
                </div>

                {/* Title placeholder */}
                <div className="placeholder-glow mb-4">
                  <span className="placeholder col-8 heading-big-medium"></span>
                </div>

                {/* Content placeholders */}
                <div className="placeholder-glow">
                  <p>
                    <span className="placeholder col-12"></span>
                  </p>
                  <p>
                    <span className="placeholder col-10"></span>
                  </p>
                  <p>
                    <span className="placeholder col-8"></span>
                  </p>
                </div>
              </Container>
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
            <h4>Error Loading Blog</h4>
            <p>{error}</p>
            <button
              className="btn btn-outline-danger"
              onClick={() => fetchBlogData(id)}
            >
              Try Again
            </button>
          </div>
        </Container>
      </section>
    );
  }

  // No blog found
  if (!singleBlog) {
    return (
      <section>
        <Container>
          <div className="alert alert-warning">
            <h4>Blog Not Found</h4>
            <p>The requested blog post could not be found.</p>
            <button
              className="btn btn-outline-warning"
              onClick={() => router.push("/blogs")}
            >
              Back to Blog List
            </button>
          </div>
        </Container>
      </section>
    );
  }

  const {
    title,
    content,
    featuredImage,
    keywords = [],
    date,
    author,
  } = singleBlog;

  return (
    <section>
      <Container>
        <Row>
          <Col sm={12} xs={12} md={7}>
            <Container>
              {/* Breadcrumb */}
              <Breadcrumb className="my-3 caption-medium">
                <Breadcrumb.Item href="/blog" className="caption-medium">
                  Blogs
                </Breadcrumb.Item>
                <Breadcrumb.Item active className="caption-medium">
                  {title}
                </Breadcrumb.Item>
              </Breadcrumb>

              {/* Featured Image */}
              <Image
                src={featuredImage}
                className="w-100 blog-main-header-left-img mb-4"
                alt={title}
              />

              {/* Blog Meta */}
              <div className="blog-meta mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-muted">{date}</span>
                    {author && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="text-muted">By {author}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Blog Title */}
              <div className="heading-big-medium mb-4">{title}</div>

              {/* Blog Content */}
              <div className="blog-content">
                {/* Intro */}
                {content.intro && <p className="lead mb-4">{content.intro}</p>}

                {/* First Section */}
                {content.sections && content.sections.length > 0 && (
                  <div className="mb-4">
                    <div className="subheading-big-medium mb-3">
                      {content.sections[0].title}
                    </div>
                    <div className="paragraph-big-regular text-content-secondary">
                      {content.sections[0].text}
                    </div>
                  </div>
                )}

                {/* Summary/Conclusion after first section */}
                {content.conclusion && (
                  <div className="blogs-summary-bg mb-4">
                    <div className="paragraph-small-regular text-content-secondary">
                      {content.conclusion}
                    </div>
                  </div>
                )}

                {/* Remaining Sections (starting from index 1) */}
                {content.sections?.slice(1).map((section, index) => (
                  <div key={index + 1} className="mb-4">
                    <div className="subheading-big-medium mb-3">
                      {section.title}
                    </div>
                    <div className="paragraph-big-regular text-content-secondary">
                      {section.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Component */}
              <UniContactComp
                heading="Lost in Your University Search?"
                description="Let Us Guide You to Your Ideal Destination!"
                buttonText="Book a Free Consultation"
                leftColSize="12"
                rightColSize="12"
              />

              {/* Keywords */}
              {keywords && keywords.length > 0 && (
                <div className="my-5">
                  <h3 className="subheading-small-medium">Keywords</h3>
                  <div className="d-flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <div
                        key={index}
                        className="bg-secondary rounded-3 px-2 text-white"
                      >
                        {keyword}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Container>
          </Col>

          {/* Sidebar with same styling */}
          <Col sm={12} xs={12} md={5}>
            <div className="sticky-sidebar">
              <BlogSidebar initialFilter="Trending" maxPosts={4} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BlogsSepPageHeader;
