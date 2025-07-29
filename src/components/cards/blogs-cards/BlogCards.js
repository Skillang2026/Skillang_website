// src/sections/common/BlogCard.js
import React from "react";
import { Card, CardImg, CardBody, CardTitle } from "react-bootstrap";
import { Chat, Heart } from "react-bootstrap-icons";
import "./BlogCards.css";

/**
 * Enhanced Blog Card Component for sections folder
 *
 * @param {Object} props
 * @param {Object} props.post - The blog post data
 * @param {string} props.post.id - Unique identifier for the post
 * @param {string} props.post.title - Title of the blog post
 * @param {string} props.post.featuredImage - URL to the featured image
 * @param {string} props.post.date - Publication date of the post
 * @param {number} props.post.views - Number of views (fallback to 0)
 * @param {number} props.post.comments - Number of comments (fallback to 0)
 * @param {Array<string>} props.post.category - Categories the post belongs to
 * @param {string} props.post.excerpt - Short excerpt of the post
 * @param {Function} props.onClick - Click handler for the card (optional)
 * @param {string} props.className - Additional class names (optional)
 * @param {boolean} props.showStats - Whether to show views/comments stats
 * @param {boolean} props.showExcerpt - Whether to show excerpt text
 * @param {string} props.variant - Card style variant (default, compact, featured)
 * @returns {JSX.Element} - The rendered blog card component
 */
const BlogCard = ({
  post,
  onClick,
  className = "",
  showStats = false,
  showExcerpt = false,
  variant = "default",
}) => {
  // Handle card click if onClick is provided
  const handleCardClick = () => {
    if (onClick) {
      onClick(post.id);
    }
  };

  // Get card classes based on variant
  const getCardClasses = () => {
    const baseClasses = "blog-card border-0 h-100 blogs-trending-card";
    const variantClasses = {
      default: "blog-trending-cards",
      compact: "blog-compact-card",
      featured: "blog-featured-card",
    };

    return `${baseClasses} ${variantClasses[variant]} ${className}`;
  };

  // Get image height based on variant
  const getImageHeight = () => {
    const heights = {
      default: "200px",
      compact: "150px",
      featured: "250px",
    };
    return heights[variant];
  };

  return (
    <Card
      className={getCardClasses()}
      data-categories={post.category?.join(",")}
      onClick={handleCardClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Featured Image */}
      <CardImg
        className="blog-card-image blog-trending-cards-image "
        src={post.featuredImage}
        alt={post.title}
        style={{
          height: getImageHeight(),
          objectFit: "cover",
        }}
      />

      <CardBody className={variant === "compact" ? "px-1 py-2" : "p-3"}>
        {/* Categories (only for featured variant) */}
        {variant === "featured" && post.category && (
          <div className="blog-categories mb-2">
            {post.category.slice(1, 3).map((cat, index) => (
              <span key={index} className="badge bg-light text-dark me-1 small">
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <CardTitle
          className={
            variant === "compact"
              ? "paragraph-big-medium"
              : variant === "featured"
              ? "h5 fw-bold"
              : "h6"
          }
        >
          {post.title}
        </CardTitle>

        {/* Excerpt (if enabled) */}
        {showExcerpt && post.excerpt && (
          <p className="card-text text-muted small mb-2">
            {post.excerpt.length > 100
              ? `${post.excerpt.substring(0, 100)}...`
              : post.excerpt}
          </p>
        )}

        {/* Footer with date and stats */}
        <div className="blog-card-footer">
          <div className="text-content-tertiary caption-regular d-flex justify-content-between align-items-center">
            {/* Date */}
            <div className="blog-date">
              <small className="text-muted">{post.date}</small>
            </div>

            {/* Stats (views and comments) */}
            {/* {showStats && (
              <div className="blog-stats d-flex flex-row gap-2">
                <div className="d-flex align-items-center">
                  <Heart size={14} className="me-1" />
                  <small>{post.views || 0}</small>
                </div>
                <div className="d-flex align-items-center">
                  <Chat size={14} className="me-1" />
                  <small>{post.comments || 0}</small>
                </div>
              </div>
            )} */}
          </div>

          {/* Read more link for featured variant */}
          {variant === "featured" && (
            <div className="mt-2">
              <span className="text-primary small fw-medium">Read More →</span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default BlogCard;
