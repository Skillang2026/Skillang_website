"use client";

import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import {
  BiLike,
  BiChat,
  BiDotsHorizontalRounded,
  BiShare,
  BiBookmark,
  BiSmile,
  BiLink,
  BiImage,
  BiUser,
} from "react-icons/bi";
import "./blogsComments.css";

const BlogsCommentsComp = () => {
  const [comment, setComment] = useState("");

  // Sample comments data - you can replace this with actual data from your backend
  const comments = [
    {
      id: 1,
      user: {
        name: "Purnima Randhawa",
        avatar: null,
      },
      text: "This is a really inspirational journey 👏👏",
      likes: 23,
      timestamp: "Yesterday at 5:58 PM",
      replies: [],
    },
    {
      id: 2,
      user: {
        name: "Mayank Yadav",
        avatar: null,
      },
      text: "Hello Team, how can I get a similar course on your website? Do I have to visit your office or can I find some link on your website?",
      likes: 8,
      timestamp: "Jan 21, 2025 at 2:13 PM",
      replies: 2,
    },
  ];

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    // Add logic to submit comment
    // console.log("Comment submitted:", comment);
    setComment("");
  };

  return (
    <Container>
      {/* Post interactions */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center justify-content-between text-secondary">
            <div className="d-flex align-items-center gap-3">
              <Button
                variant="link"
                className="text-secondary p-0 d-flex align-items-center gap-1"
              >
                <BiLike size={20} />
                <span>23</span>
              </Button>
              <Button
                variant="link"
                className="text-secondary p-0 d-flex align-items-center gap-1"
              >
                <BiChat size={20} />
                <span>23</span>
              </Button>
            </div>
            <div className="d-flex align-items-center gap-3">
              <Button variant="link" className="text-secondary p-0">
                <BiBookmark size={20} />
              </Button>
              <Button variant="link" className="text-secondary p-0">
                <BiShare size={20} />
              </Button>
              <Button variant="link" className="text-secondary p-0">
                <BiDotsHorizontalRounded size={20} />
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Comments header */}
      <Row className="mt-4 mb-3">
        <Col>
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="fs-4 mb-0">Comments (9)</h3>
            <div className="d-flex align-items-center">
              <Form.Select
                size="sm"
                className="text-content-primary-accent border-0 bg-transparent"
              >
                <option>Displaying Newest</option>
                <option>Displaying Oldest</option>
                <option>Displaying Most Liked</option>
              </Form.Select>
            </div>
          </div>
        </Col>
      </Row>

      {/* Comment input */}
      <Row className="mb-4">
        <Col>
          <div className="comment-input-container bg-light p-3 rounded">
            <Form onSubmit={handleSubmitComment}>
              <div className="d-flex gap-3">
                <div
                  className="avatar-placeholder rounded-circle d-flex justify-content-center align-items-center bg-secondary"
                  style={{ width: 40, height: 40 }}
                >
                  <BiUser size={24} color="#fff" />
                </div>
                <div className="flex-grow-1">
                  <Form.Group className="mb-2">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Write your comment..."
                      value={comment}
                      onChange={handleCommentChange}
                      className="border-0 bg-light"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2">
                      <Button variant="link" className="p-1 text-secondary">
                        <BiSmile size={20} />
                      </Button>
                      <Button variant="link" className="p-1 text-secondary">
                        <BiLink size={20} />
                      </Button>
                      <Button variant="link" className="p-1 text-secondary">
                        <BiImage size={20} />
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      className="post-btn"
                      variant="primary"
                    >
                      Post Comment
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Comments list */}
      <Row>
        <Col>
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item mb-4">
                <div className="d-flex gap-3">
                  {comment.user.avatar ? (
                    <Image
                      src={comment.user.avatar}
                      roundedCircle
                      className="avatar-placeholder bg-secondary"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div
                      className="avatar-placeholder rounded-circle d-flex justify-content-center align-items-center bg-secondary"
                      style={{ width: 40, height: 40 }}
                    >
                      <BiUser size={24} color="#fff" />
                    </div>
                  )}
                  <div className="flex-grow-1">
                    <div className="comment-header">
                      <strong className="d-block">{comment.user.name}</strong>
                      <p className="mb-2">{comment.text}</p>
                    </div>
                    <div className="comment-actions d-flex gap-3 align-items-center">
                      <Button
                        variant="link"
                        className="text-secondary p-0 d-flex align-items-center gap-1"
                      >
                        <BiLike size={16} />
                        <span className="small">{comment.likes} Likes</span>
                      </Button>
                      <Button variant="link" className="text-secondary p-0">
                        <span className="small">Reply</span>
                      </Button>
                      <Button variant="link" className="text-secondary p-0">
                        <span className="small">Report</span>
                      </Button>
                      <div className="ms-auto text-muted small">
                        {comment.timestamp}
                      </div>
                    </div>
                    {comment.replies > 0 && (
                      <div className="comment-replies mt-2">
                        <Button
                          variant="link"
                          className="text-secondary p-0 d-flex align-items-center gap-1"
                        >
                          <span className="small">
                            {comment.replies} replies
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogsCommentsComp;
