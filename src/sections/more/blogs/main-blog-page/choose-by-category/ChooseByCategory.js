"use client";

import React, { useState } from "react";
import { Container, Row, Col, Image, Nav } from "react-bootstrap";
import { HiTrendingUp } from "react-icons/hi";
import { useRouter } from "next/navigation";
import blogsData from "../../../../../data/blogsData";
import BlogCardComp from "../../../../../components/cards/blogs-cards/BlogCards";

const BlogMainPageHeader = () => {
  // State to track active filter
  const [activeFilter, setActiveFilter] = useState("Trending");
  const router = useRouter();

  // Filter posts based on active filter
  const getFilteredPosts = () => {
    if (activeFilter === "All") {
      return blogsData.posts.slice(0, 4); // Limit to 4 posts
    }
    return blogsData.posts
      .filter((post) => post.category.includes(activeFilter))
      .slice(0, 4); // Limit to 4 posts
  };

  // Get filtered posts
  const filteredPosts = getFilteredPosts();

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Handle blog card click
  const handleCardClick = (postId) => {
    router.push(`/blog/${postId}`);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col sm={12} xs={12} md={7} className="bg-primar">
            <Image
              src={blogsData.mainFeature.featuredImage}
              alt="blog-main-page-header"
              className="w-100 blog-main-header-left-img"
            />
            <div className="heading-big-medium mt-3">
              {blogsData.mainFeature.title}
            </div>
          </Col>
          <Col sm={12} xs={12} md={5}>
            <Row>
              <div className="filter-tabs">
                <Nav variant="pills" defaultActiveKey="Trending">
                  {blogsData.categories.map((category, index) => (
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
            <Row>
              {filteredPosts.map((post) => (
                <Col sm={12} xs={12} md={6} key={post.id} className="mb-3">
                  <BlogCardComp post={post} onClick={handleCardClick} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BlogMainPageHeader;
