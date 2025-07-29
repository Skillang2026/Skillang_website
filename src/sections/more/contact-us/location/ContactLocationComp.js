import React from "react";
import "./ContactLocationComp.css";
import { Container, Row, Col } from "react-bootstrap";
import { HiLocationMarker } from "react-icons/hi";

const ContactLocationComp = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col lg={5} xs={12} sm={12} className="mb-4 mb-md-0 ">
            <div className="map-container ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3367.6758753788063!2d80.2595214254195!3d13.06155349061786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266166d42b5a7%3A0xd997f32439e5bb34!2sThe%20Executive%20Zone%20%7C%20Coworking%20Space%20%7C%20Anna%20Salai!5e0!3m2!1sen!2sin!4v1747586132581!5m2!1sen!2sin"
                // width="600"
                // height="450"
                // style="border:0;"
                allowFullScreen=""
                loading="lazy"
                title="location-map"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-iframe w-100 h-100"
              ></iframe>
            </div>
          </Col>
          <Col lg={7} xs={12} sm={12}>
            <div className="mb-4">
              <div className="caption-bold location-badge">
                <HiLocationMarker size={16} /> Our Location
              </div>
              <div>
                <div className="heading-big-medium mb-3">
                  Connecting Near & Far
                </div>
                <div className="paragraph-big-medium mb-2">Headquarters</div>
                <div className="paragraph-small-medium text-content-secondary location-address-wrap">
                  Executive Zone, Shakti Tower 1, 766, Anna Salai, Thousand
                  Lights, Chennai, Tamil Nadu 600002
                </div>
              </div>
            </div>
            <div>
              <Row>
                <div className="subheading-small-medium mb-2">
                  Other Locations
                </div>
                <Col sm={12} xs={12} md={4}>
                  <div className="contact-sub-office-card">
                    <h4 className="paragraph-big-medium">Nagercoil Office</h4>
                    <div className="paragraph-small-medium text-content-secondary">
                      No. 1, Jehovah Shalom, Dennis Street, Nagercoil, Tamil
                      Nadu 629001
                    </div>
                    {/* <button className="btn-secondary-outline mt-2">
                    See on map
                  </button> */}
                  </div>
                </Col>
                <Col sm={12} xs={12} md={4} className="my-4 my-md-0">
                  <div className="contact-sub-office-card">
                    <h4 className="paragraph-big-medium">Salem Office</h4>
                    <div className="paragraph-small-medium text-content-secondary">
                      B-26, Rajaji St, Swarnapuri, Salem, Tamil Nadu 636004
                    </div>
                    {/* <button className="btn-secondary-outline mt-2">
                    See on map
                  </button> */}
                  </div>
                </Col>
                <Col sm={12} xs={12} md={4}>
                  <div className="contact-sub-office-card">
                    <h4 className="paragraph-big-medium">Coimbatore Office </h4>
                    <div className="paragraph-small-medium text-content-secondary">
                      Coming soon
                    </div>
                    {/* <button className="btn-secondary-outline mt-2">
                    Comming soon
                  </button> */}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactLocationComp;
