// src/sections/more/blogs/main-blog-page/editors-choice-section/EditorsChoiceSection.js
"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import blogService from "@/services/blogService";
import BlogCardComp from "@/components/cards/blogs-cards/BlogCards";

const EditorsChoiceSection = () => {
  const router = useRouter();
  const [editorsPicks, setEditorsPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Editor's Choice posts
  useEffect(() => {
    const fetchEditorsChoice = async () => {
      try {
        setLoading(true);
        const posts = await blogService.getEditorsChoice(3);
        // console.log("Editor's Choice posts:", posts);
        setEditorsPicks(posts);
      } catch (err) {
        console.error("Error fetching Editor's Choice:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEditorsChoice();
  }, []);

  // Handle blog card click
  const handleCardClick = (postId) => {
    router.push(`/blog/${postId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <Container>
          <Row>
            <div className="heading-big-medium mb-4">Editor's Choice</div>
          </Row>
          <Row>
            {[1, 2, 3].map((i) => (
              <Col sm={12} xs={12} md={4} key={i} className="mb-3">
                <div className="card">
                  <div
                    className="card-img-top bg-light d-flex align-items-center justify-content-center placeholder-glow"
                    style={{ height: "200px" }}
                  >
                    <span className="placeholder w-100 h-100"></span>
                  </div>
                  <div className="card-body">
                    <div className="placeholder-glow">
                      <span className="placeholder col-7"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-6"></span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <Container>
          <Row>
            <div className="heading-big-medium mb-4">Editor's Choice</div>
          </Row>
          <Row>
            <Col>
              <div className="alert alert-warning">
                <h5>Unable to load Editor's Choice</h5>
                <p className="mb-2">{error}</p>
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  // No posts available
  if (editorsPicks.length === 0) {
    return (
      <div>
        <Container>
          <Row>
            <div className="heading-big-medium mb-4">Editor's Choice</div>
          </Row>
          <Row>
            <Col>
              <div className="text-center py-5 text-muted">
                <h5>No Editor's Choice posts available</h5>
                <p>Check back later for curated content from our editors.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Container>
        <Row>
          <div className="heading-big-medium mb-4">Editor's Choice</div>
        </Row>
        <Row>
          {editorsPicks.map((post) => (
            <Col sm={12} xs={12} md={4} key={post.id} className="mb-3">
              <BlogCardComp
                post={post}
                onClick={handleCardClick}
                showStats={true}
                showExcerpt={true}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default EditorsChoiceSection;
