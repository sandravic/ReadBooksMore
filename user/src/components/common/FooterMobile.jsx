import React, { useState } from 'react';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faCog, faBookOpen } from '@fortawesome/free-solid-svg-icons';

const FooterMobile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track whether the sidebar is open

  const iconStyle = { color: 'white' };
  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    right: isSidebarOpen ? '0' : '-100%', // Use state to show/hide the sidebar
    width: '250px',
    height: '100vh',
    background: '#f0f0f0',
    transition: 'right 0.3s ease-in-out',
  };
  const contentStyle = {
    paddingTop: '70px',
  };

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="footerback m-0 mt-5 pt-3 shadow-sm">
        <Container className="text-center">
          <Navbar fixed="bottom">
            <Nav className="navbar fixed-bottom navbar-light d-block  bottom-tab-nav" role="navigation">
              <Row>
                <Col xs={3} className="d-flex flex-column align-items-center">
                  <Nav.Link as={Link} to="/" className="nav-link">
                    <div>
                      <FontAwesomeIcon icon={faHome} style={iconStyle} />
                    </div>
                    <div style={{ color: 'white' }}>Home</div>
                  </Nav.Link>
                </Col>
                <Col xs={3} className="d-flex flex-column align-items-center">
                  <Nav.Link as={Link} to="/books" className="nav-link">
                    <div>
                      <FontAwesomeIcon icon={faBookOpen} style={iconStyle} />
                    </div>
                    <div style={{ color: 'white' }}>Books</div>
                  </Nav.Link>
                </Col>
                <Col xs={3} className="d-flex flex-column align-items-center">
                  <Nav.Link as={Link} to="/cart" className="nav-link">
                    <div>
                      <FontAwesomeIcon icon={faShoppingCart} style={iconStyle} />
                    </div>
                    <div style={{ color: 'white' }}>Cart</div>
                  </Nav.Link>
                </Col>
                <Col xs={3} className="d-flex flex-column align-items-center">
                    <div>
                      <FontAwesomeIcon icon={faCog} style={iconStyle} onClick={toggleSidebar} />
                    </div>
                    <div style={{ color: 'white' }}>Settings</div>
                </Col>
              </Row>
            </Nav>
          </Navbar>
          <div className="sidebar" style={sidebarStyle}>
            <div style={contentStyle}>
              <h5 style={{ color: '#1090c3', fontWeight: 900 }}>Settings</h5>
              <Link to="/profile">
                <button className="accordionMobileSide">Profile</button>
              </Link>
              <br />

              <Link to="/about">
                <button className="accordionMobileSide">About Us</button>
              </Link>
              <br />

              <Link to="/contact">
                <button className="accordionMobileSide">Contact Us</button>
              </Link>
              <br />

              <Link to="/purchase">
                <button className="accordionMobileSide">How To Purchase</button>
              </Link>
              <br />

              <Link to="/privacy">
                <button className="accordionMobileSide">Privacy Policy</button>
              </Link>
              <br />

              <Link to="/refund">
                <button className="accordionMobileSide">Refund Policy</button>
              </Link>
              <br />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default FooterMobile;
