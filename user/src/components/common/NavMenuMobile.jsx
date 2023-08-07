import React, { Component, Fragment } from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import {  Redirect } from "react-router-dom";
import MegaMenuMobile from '../home/MegaMenuMobile';


class NavMenuMobile extends Component {
  constructor() {
    super();
    this.state = {
      SideNavState: "sideNavClose",
      ContentOverState: "ContentOverlayClose",
    
    }
  
  }
  

  MenuBarClickHandler = () => {
    this.SideNavOpenClose();
  }

  ContentOverlayClickHandler = () => {
    this.SideNavOpenClose();
  }

  SideNavOpenClose = () => {
    let SideNavState = this.state.SideNavState;
    let ContentOverState = this.state.ContentOverState;
    if (SideNavState === "sideNavOpen") {
      this.setState({ SideNavState: "sideNavClose", ContentOverState: "ContentOverlayClose" });
    } else {
      this.setState({ SideNavState: "sideNavOpen", ContentOverState: "ContentOverlayOpen" });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="TopSectionDown">
          
        <Navbar  className="navbar-mob" bg="light">
          <Container fluid={true} className="fixed-top shadow-sm p-2 mb-0 bg-white">
            <Row>
              <Col xs={2} sm={2} md={2} lg={2}>
                <Button onClick={this.MenuBarClickHandler} className="btn-hamburger"><i className="fa fa-bars"></i></Button>

              </Col>
              <Col xs={4} sm={4} md={6} lg={8} className="text-center">
              <div className="input-group w-100">
                    <input onChange={this.SearchOnChange} type="text" className="form-control" />

                    <Button onClick={this.SeachOnClick} type="button" className="btn site-btn"><i className="fa fa-search"> </i>
                    </Button>
                  </div>
              </Col>
            </Row>
           
          </Container>
          </Navbar>
          <div className={this.state.SideNavState}>
            <MegaMenuMobile />
          </div>

          <div onClick={this.ContentOverlayClickHandler} className={this.state.ContentOverState}></div>
        </div>
       
      </Fragment>
    );
  }
}

export default NavMenuMobile;
