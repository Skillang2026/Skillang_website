"use client";

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Stories from "react-insta-stories";
import countryWiseData from "../../../../data/countryWiseData";
const lifeStoryIcon1 =
  "/assets/icons/study-abroad-country-wise/lifeStoryIcon1.svg";
const lifeStoryIcon2 =
  "/assets/icons/study-abroad-country-wise/lifeStoryIcon2.svg";
const lifeStoryIcon3 =
  "/assets/icons/study-abroad-country-wise/lifeStoryIcon3.svg";
const lifeStoryIcon4 =
  "/assets/icons/study-abroad-country-wise/lifeStoryIcon4.svg";
const lifeStoryIcon5 =
  "/assets/icons/study-abroad-country-wise/lifeStoryIcon5.svg";
const lifeStoryIcon6 =
  "/assets/icons/study-abroad-country-wise/lifeStoryIcon6.svg";
const lifeStoryIcon7 =
  "/assets/icons/study-abroad-country-wise/lifeStoryIcon7.svg";
const lifeStoryIcon8 =
  "/assets/icons/study-abroad-country-wise/lifeStoryIcon8.svg";
const lifeStoryIcon9 =
  "/assets/icons/study-abroad-country-wise/lifeStoryIcon9.svg";
import "./life.css";
import { FaTimes } from "react-icons/fa";

const LifeKeyDestination = ({ country = "uk" }) => {
  const [activeCity, setActiveCity] = useState("London");
  const [showStories, setShowStories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const data = countryWiseData[country];
  const cities = data.life.cities; // Cities data
  const cityStoriesData = data.life.cityStories; // City stories data
  const cityImages = data.life.cityImages; // City images data
  // Cities data

  // Categories data with icons
  const categories = [
    {
      id: 1,
      name: "Landmarks",
      icon: lifeStoryIcon1,
      key: "landmarks",
    },
    {
      id: 2,
      name: "Industry",
      icon: lifeStoryIcon2,
      key: "landmarks",
    },
    {
      id: 3,
      name: "Educational Institutions",
      icon: lifeStoryIcon3,
      key: "universities",
    },
    {
      id: 4,
      name: "Must Visits",
      icon: lifeStoryIcon4,
      key: "landmarks",
    },
    {
      id: 5,
      name: "Historic sites",
      icon: lifeStoryIcon5,
      key: "landmarks",
    },
    {
      id: 6,
      name: "Parks",
      icon: lifeStoryIcon6,
      key: "landmarks",
    },
    {
      id: 7,
      name: "Shopping",
      icon: lifeStoryIcon7,
      key: "landmarks",
    },
    {
      id: 8,
      name: "Cultural Events",
      icon: lifeStoryIcon8,
      key: "landmarks",
    },
    {
      id: 9,
      name: "Public Transport",
      icon: lifeStoryIcon9,
      key: "landmarks",
    },
  ];

  const handleCategoryClick = (category) => {
    // Log data to debug
    // console.log("Country data:", data);
    // console.log("Life data:", data.life);
    // console.log("City stories data:", data.life.cityStoriesData);

    // Check if the property exists
    if (!data || !data.life || !data.life.cityStoriesData) {
      console.error("Missing data structure:", { data });
      alert("Sorry, story data is not available at the moment");
      return;
    }

    // Check if the active city exists in cityStoriesData
    if (!data.life.cityStoriesData[activeCity]) {
      console.error(`No data for city: ${activeCity}`);
      alert(`No stories available for ${activeCity}`);
      return;
    }

    // Get stories for the active city and category
    const storiesKey = category.key || "landmarks";
    const cityStories = data.life.cityStoriesData[activeCity][storiesKey] || [];

    if (cityStories.length > 0) {
      // Modify the stories to include the category name in the header and icon as profile image
      const storiesWithCategoryHeader = cityStories.map((story) => {
        // Check if the story is an object with a url property (image story)
        if (typeof story === "object" && story.url) {
          return {
            ...story,
            header: {
              ...story.header,
              heading: `${category.name} - ${
                story.header?.heading || activeCity
              }`,
              profileImage: category.icon, // Use the category icon as profile image
            },
          };
        }
        // If it's a simple URL string, convert to object with header
        else if (typeof story === "string") {
          return {
            url: story,
            header: {
              heading: `${category.name} - ${activeCity}`,
              subheading: "",
              profileImage: category.icon, // Use the category icon as profile image
            },
          };
        }
        // Return original if neither case matches
        return story;
      });

      setActiveCategory({
        ...category,
        stories: storiesWithCategoryHeader,
        cityName: activeCity,
      });
      setShowStories(true);
    } else {
      alert(`No stories available for ${category.name} in ${activeCity}`);
    }
  };

  const handleStoriesEnd = () => {
    setShowStories(false);
    setActiveCategory(null);
  };

  // Story options
  const storyOptions = {
    width: "100%",
    height: "100vh",
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="subheading-big-medium text-content-secondary">
          Key Destinations in {data.fullForm}
        </h2>
      </div>

      {/* City tabs */}
      <div className="d-flex flex-wrap mb-4 city-tabs">
        {cities.map((city) => (
          <Button
            key={city}
            variant={activeCity === city ? "dark" : "light"}
            className="rounded-pill me-2 mb-2 px-3 py-1"
            onClick={() => setActiveCity(city)}
          >
            {city}
          </Button>
        ))}
      </div>

      {/* Categories */}
      <div className="categories-scroll-container text-center">
        <div className="categories-scroll-wrapper d-flex overflow-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-item-scroll flex-shrink-0 mx-2"
              onClick={() => handleCategoryClick(category)}
              style={{ cursor: "pointer", width: "120px" }}
            >
              <div className="category-icon">
                <img src={category.icon} alt={category.name} />
              </div>
              <div className="category-name caption-regular text-content-secondary">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City image */}
      <div className="city-image-container">
        <img
          src={cityImages[activeCity] || "/images/london-tower-bridge.jpg"}
          alt={`${activeCity} landmark`}
          className="w-100 h-100 object-fit-cover"
          style={{ objectPosition: "center" }}
        />
      </div>

      {/* Stories modal */}
      {showStories && activeCategory && activeCategory.stories && (
        <div className="stories-overlay">
          <div className="stories-card">
            <button className="stories-close-btn" onClick={handleStoriesEnd}>
              <FaTimes size={24} />
            </button>
            <Stories
              stories={activeCategory.stories}
              defaultInterval={4000}
              width={window.innerWidth < 768 ? "90vw" : "35vw"}
              height="90vh"
              storyStyles={{
                width: window.innerWidth < 768 ? "90vw" : "35vw",
                height: "90vh",
                borderRadius: "16px",
                objectFit: "cover",
              }}
              onAllStoriesEnd={handleStoriesEnd}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LifeKeyDestination;
