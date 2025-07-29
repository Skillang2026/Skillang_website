"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiPhoneCall, FiChevronDown } from "react-icons/fi";
import "./nav.css";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";

const logo = "/assets/images/logos/logo-3.svg";

function FreshNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [moreExpanded, setMoreExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Define the dropdown menu items as an array
  const moreMenuItems = [
    {
      label: "Education Loan",
      path: "/education-loan",
    },
    {
      label: "Scholarships",
      path: "/scholarships",
    },
    {
      label: "SOP & Resume Writing",
      path: "/sop-and-resume-writing",
    },
    {
      label: "German Opportunity Card",
      path: "/german-opportunity-card",
    },
    // {
    //   label: "Events",
    //   path: "/events",
    // },
    {
      label: "Blogs",
      path: "/blog",
    },
    {
      label: "Partner With Us",
      path: "/more/partner-with-us",
    },
  ];

  useEffect(() => {
    setExpanded(false);
    setMoreExpanded(false);
  }, [pathname]);

  const isActive = (path) => pathname === path;

  // Check if any of the dropdown paths are active
  const isDropdownActive = () => {
    return moreMenuItems.some((item) => isActive(item.path));
  };

  const handleNavigation = (path) => {
    if (pathname !== path) {
      router.push(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setExpanded(false);
    setMoreExpanded(false);
  };

  const handleContactClick = () => {
    handleNavigation("/more/contact-us");
  };

  const toggleMore = () => {
    setMoreExpanded(!moreExpanded);
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="py-2 navcont navbar-default"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand
          onClick={() => handleNavigation("/")}
          style={{ cursor: "pointer" }}
          className="mb-0"
        >
          <img src={logo} className="navbar-logo" alt="Skillang Logo" />
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible Content */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="mx-auto">
            <Nav.Link
              className={`navpaths ${
                isActive("/") || isActive("/home") ? "active-link" : ""
              }`}
              onClick={() => handleNavigation("/")}
            >
              Home
            </Nav.Link>

            <Nav.Link
              className={`navpaths ${
                isActive("/nursing") ? "active-link" : ""
              }`}
              onClick={() => handleNavigation("/nursing")}
            >
              Nursing
            </Nav.Link>

            <Nav.Link
              className={`navpaths ${
                isActive("/work-abroad") ? "active-link" : ""
              }`}
              onClick={() => handleNavigation("/work-abroad")}
            >
              Work Abroad
            </Nav.Link>

            <Nav.Link
              className={`navpaths ${
                isActive("/study-abroad") ? "active-link" : ""
              }`}
              onClick={() => handleNavigation("/study-abroad")}
            >
              Study Abroad
            </Nav.Link>

            <Nav.Link
              className={`navpaths ${
                isActive("/lang-test-prep") ? "active-link" : ""
              }`}
              onClick={() => handleNavigation("/lang-test-prep")}
            >
              Language & Test
            </Nav.Link>

            {/* More Dropdown - Desktop Only */}
            <NavDropdown
              title="More"
              id="more-dropdown"
              className={`navpaths-dropdown d-none d-lg-block ${
                isDropdownActive() ? "active-link" : ""
              }`}
            >
              {moreMenuItems.map((item, index) => (
                <NavDropdown.Item
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={isActive(item.path) ? "active" : ""}
                >
                  {item.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {/* More Section - Mobile Only */}
            <div className="d-lg-none mobile-more-section">
              <Nav.Link
                className={`navpaths mobile-more-toggle ${
                  isDropdownActive() ? "active-link" : ""
                }`}
                onClick={toggleMore}
              >
                More
                <FiChevronDown
                  className={`ms-2 chevron-icon ${
                    moreExpanded ? "rotated" : ""
                  }`}
                />
              </Nav.Link>

              {moreExpanded && (
                <div className="mobile-more-items">
                  {moreMenuItems.map((item, index) => (
                    <Nav.Link
                      key={index}
                      className={`navpaths mobile-more-item ${
                        isActive(item.path) ? "active-link" : ""
                      }`}
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.label}
                    </Nav.Link>
                  ))}
                </div>
              )}
            </div>
          </Nav>

          {/* Contact Button */}
          <div className="d-flex justify-content-center align-items-center mt-3">
            <Button
              variant="outline-primary"
              className="btn-primary-outline  "
              onClick={handleContactClick}
            >
              <FiPhoneCall
                className="me-3"
                style={{ width: "18px", height: "auto" }}
              />
              Contact Us
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FreshNavbar;
