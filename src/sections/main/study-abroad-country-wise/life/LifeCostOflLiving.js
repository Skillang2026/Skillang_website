"use client";

import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, CardImg, CardBody } from "react-bootstrap";
const accoIcon = "/assets/icons/study-abroad-country-wise/acco.svg";
const foodIcon = "/assets/icons/study-abroad-country-wise/food.svg";
const TransportIcon = "/assets/icons/study-abroad-country-wise/Trans.svg";
const wifiIcon = "/assets/icons/study-abroad-country-wise/wifi.svg";
const miscIcon = "/assets/icons/study-abroad-country-wise/misc.svg";
import "./life.css";

// This would be in a separate utility file or context in a real application
const getExchangeRate = () => {
  // Check if we're on the client side
  if (typeof window === "undefined") {
    return 106.5; // Return default rate for SSR
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Check if we already have a rate for today in localStorage
  const storedData = localStorage.getItem("exchange_rate");

  if (storedData) {
    try {
      const { date, rate } = JSON.parse(storedData);

      // If the stored rate is from today, use it
      if (date === today) {
        // console.log("Using cached exchange rate from today");
        return rate;
      }
    } catch (error) {
      console.error("Error parsing stored exchange rate:", error);
    }
  }

  // If we don't have today's rate, return a default rate
  // The actual fetch would happen in a backend cron job or global context
  return 106.5; // Default/fallback rate (adjust as needed)
};

const LifeCostOfLiving = () => {
  // State to track active currency
  const [activeCurrency, setActiveCurrency] = useState("pound");
  const [conversionRate, setConversionRate] = useState(106.5); // Initialize with default

  // Set conversion rate after component mounts
  useEffect(() => {
    setConversionRate(getExchangeRate());
  }, []);

  // Cost of living data (only in pounds)
  const livingCosts = [
    {
      id: 1,
      category: "Accommodation",
      icon: accoIcon,
      minPound: 400,
      maxPound: 1000,
      period: "per month",
    },
    {
      id: 2,
      category: "Food & Groceries",
      icon: foodIcon,
      minPound: 150,
      maxPound: 250,
      period: "per month",
    },
    {
      id: 3,
      category: "Transportation",
      icon: TransportIcon,
      minPound: 50,
      maxPound: 100,
      period: "per month",
    },
    {
      id: 4,
      category: "Utilities & Internet",
      icon: wifiIcon,
      minPound: 50,
      maxPound: 100,
      period: "per month",
    },
    {
      id: 5,
      category: "Miscellaneous Expenses",
      icon: miscIcon,
      minPound: 100,
      maxPound: 150,
      period: "per month",
    },
  ];

  // Function to format currency based on active currency
  const formatCurrency = (min, max) => {
    if (activeCurrency === "pound") {
      return {
        min: `£${min}`,
        max: `£${max}`,
        text: `£${min} to £${max}`,
      };
    } else {
      // Convert pounds to rupees and round to nearest thousand
      const minRupees = Math.round((min * conversionRate) / 1000) * 1000;
      const maxRupees = Math.round((max * conversionRate) / 1000) * 1000;

      // Format with Indian number system (use commas appropriately)
      const formattedMin = minRupees.toLocaleString("en-IN");
      const formattedMax = maxRupees.toLocaleString("en-IN");

      return {
        min: `₹${formattedMin}`,
        max: `₹${formattedMax}`,
        text: `₹${formattedMin} to ₹${formattedMax}`,
      };
    }
  };

  // Calculate total monthly cost
  const calculateTotal = () => {
    // Sum up min and max values
    const totalMin = livingCosts.reduce((sum, cost) => sum + cost.minPound, 0);
    const totalMax = livingCosts.reduce((sum, cost) => sum + cost.maxPound, 0);

    return formatCurrency(totalMin, totalMax);
  };

  const totalCost = calculateTotal();

  return (
    <div className="">
      <div className="mb-4">
        <h2 className="subheading-big-medium text-content-secondary">
          Cost of Living
        </h2>
      </div>

      <div className="mb-4">
        <div className="d-inline-flex">
          <Button
            variant={activeCurrency === "pound" ? "dark" : "light"}
            className="rounded-pill me-2 px-3 py-1"
            onClick={() => setActiveCurrency("pound")}
          >
            Pound sterling (£)
          </Button>
          <Button
            variant={activeCurrency === "rupees" ? "dark" : "light"}
            className="rounded-pill px-3 py-1"
            onClick={() => setActiveCurrency("rupees")}
          >
            Rupees (₹)
          </Button>
        </div>
        {activeCurrency === "rupees" && (
          <div className="mt-2">
            <small className="text-muted">
              Exchange Rate: 1 GBP = ₹{conversionRate.toFixed(2)} INR
            </small>
          </div>
        )}
      </div>

      <Row>
        {livingCosts.map((cost) => {
          const formattedRange = formatCurrency(cost.minPound, cost.maxPound);

          return (
            <Col lg={4} md={6} className="mb-4" key={cost.id}>
              <Card className="h-100 life-cost-card">
                <CardImg
                  src={cost.icon}
                  alt={cost.category}
                  className=""
                  style={{
                    width: "48px",
                    height: "auto",
                  }}
                />
                <Card.Body className="p-0">
                  <div className="d-flex align-items-center mb-2">
                    <div className="caption-bold text-content-tertiary">
                      {cost.category}
                    </div>
                  </div>
                  <div className="d-flex align-items-end">
                    <div className="subheading-small-medium text-content-secondary">
                      {formattedRange.text}
                    </div>
                    <div className="ms-2 paragraph-small-medium">
                      {cost.period}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        <Col lg={4} md={6} className="mb-4">
          <Card className="h-100 life-cost-card" id="life-cost-level">
            <CardBody className="p-0">
              <div className="d-flex justify-content-between align-items-center">
                <div className="caption-bold text-content-secondary">
                  Total Monthly Cost of Living
                </div>
                <span className="badge bg-success caption-mediu">Low</span>
              </div>
              <div className="d-flex align-items-end">
                <div className="subheading-small-medium text-primary">
                  {totalCost.text}
                </div>
              </div>
              <div className="paragraph-small-medium">
                (depending on the city & lifestyle)
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LifeCostOfLiving;
