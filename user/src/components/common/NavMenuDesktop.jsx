import React, { useState, useEffect } from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import Logo from '../../assets/images/logodesktop.jpg';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import AppURL from '../../api/AppURL';

const NavMenuDesktop = (props) => {
 
  const [Searchkey, setSearchkey] = useState('');
  const [SearchRedirectStauts, setSearchRedirectStatus] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    let ISBN = props.ISBN;
    axios.get(AppURL.CartCount(ISBN)).then((response) => {
      if (isMounted) {
        setCartCount(response.data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [props.ISBN]);

  const logout = () => {
    localStorage.clear();
  };

  const SearchOnChange = (event) => {
    let Searchkey = event.target.value;
    setSearchkey(Searchkey);
  };

  const SeachOnClick = () => {
    if (Searchkey.length >= 2) {
      setSearchRedirectStatus(true);
    }
  };

  const searchRedirect = () => {
    if (SearchRedirectStauts === true) {
      return <Redirect to={`/productbysearch/${Searchkey}`} />;
    }
  };

  let buttons;
  if (localStorage.getItem('token')) {
    buttons = (
      <div>
        <Link to="/favourite" className="btn">
          <i className="fa h4 fa-heart"></i>
          <sup>
            <span className="badge text-white bg-danger"></span>
          </sup>
        </Link>

        <Link to="/notification" className="btn">
          <i className="fa h4 fa-bell"></i>
          <sup>
            <span className="badge text-white bg-danger"></span>
          </sup>
        </Link>
        <Link to="/cart" className="btn">
          <i className="fa h4 fa-shopping-cart"></i>
          <sup>
            <span className="badge text-white bg-danger"></span>
          </sup>
        </Link>

        <i className="fa h4 fa-user"></i>

        <Link to="/profile" className="h4 btn">
          PROFILE
        </Link>
        <Link to="/allcategory" className="h4 btn">
        BOOKS
        </Link>

        <Link to="/" onClick={logout} className="h4 btn">
          LOGOUT
        </Link>
      </div>
    );
  } else {
    buttons = (
      <div>
        <Link to="/favourite" className="btn">
          <i className="fa h4 fa-heart"></i>
          <sup>
            <span className="badge text-white bg-danger"></span>
          </sup>
        </Link>

        <Link to="/notification" className="btn">
          <i className="fa h4 fa-bell"></i>
          <sup>
            <span className="badge text-white bg-danger"></span>
          </sup>
        </Link>
        {/* Replace the <a> element with a <span> */}
        <span className="btn">
          <i className="fa h4 fa-mobile-alt"></i>
        </span>
        <Link to="/allcategory" className="h4 btn">
          BOOKS
        </Link>

        <Link to="/login" className="h4 btn">
          LOGIN
        </Link>

        <i className="fa h4 fa-user"></i>

        <Link to="/register" className="h4 btn">
          REGISTER
        </Link>

        <Link to="/cart" className="btn">
          <i className="fa h4 fa-shopping-cart"></i>
          <sup>
            <span className="badge text-white bg-danger"></span>
          </sup>
        </Link>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="TopSectionDown">
      <Navbar fixed="top" className="navbar" bg="light">

          <Container fluid={'true'} className="fixed-top shadow-sm p-2 mb-0 bg-white">
            <Row>
              <Col lg={4} md={4} sm={12} xs={12}>
                <Link to="/">
                  <img className="nav-logo" src={Logo} alt="Logo" />
                </Link>
              </Col>

              <Col className="p-1 mt-1" lg={3} md={4} sm={12} xs={12}>
                <div className="input-group w-100">
                  <input onChange={SearchOnChange} type="text" className="form-control" />

                  <Button onClick={SeachOnClick} type="button" className="btn site-btn">
                    <i className="fa fa-search"> </i>
                  </Button>
                </div>
              </Col>

              <Col className="p-1 mt-1" lg={5} md={4} sm={12} xs={12}>
                {buttons}
              </Col>
            </Row>
            {searchRedirect()}
          </Container>
        </Navbar>
      </div>
    </React.Fragment>
  );
};

export default NavMenuDesktop;
