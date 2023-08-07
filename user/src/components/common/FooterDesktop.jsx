import React, { Component, Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTruckFast, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import AppURL from '../../api/AppURL';
import axios from 'axios';
import ReactHtmlParser from 'html-react-parser';

export class FooterDesktop extends Component {
  constructor() {
    super();
    this.state = {
      address: '',
      process_steps: '',
      facbook_link: '',
      twitter_link: '',
      instagram_link: '',
      copyright_text: '',
      loaderDiv: '',
      mainDiv: 'd-none',
    };
  }

  componentDidMount() {
    axios.get(AppURL.AllSiteInfo).then((response) => {
      let StatusCode = response.status;
      if (StatusCode === 200) {
        let JsonData = response.data[0];
        this.setState({
          address: JsonData['address'],
          process_steps: JsonData['process_steps'],
          facbook_link: JsonData['facbook_link'],
          twitter_link: JsonData['twitter_link'],
          instagram_link: JsonData['instagram_link'],
          copyright_text: JsonData['copyright_text'],
          loaderDiv: 'd-none',
          mainDiv: '',
        });
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <Fragment>
        <div className="footerback m-0 mt-5 pt-3 shadow-sm">
          <Container>
            <Row className="px-0 my-5">
              <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                <div className={this.state.loaderDiv}>
                  {/* Your loading content */}
                </div>

                <div className={this.state.mainDiv}>
                  <h5 style={{ color: '#1090c3' }} className="footer-menu-title">OFFICE ADDRESS</h5>
                  <div style={{ color: '#1090c3' }}>{ReactHtmlParser(this.state.address)}</div>
                </div>

                <h5 style={{ color: '#1090c3' }} className="footer-menu-title">SOCIAL LINK</h5>
                <div>
                  <a href={this.state.facbook_link} target="_blank"><i className="fab m-1 h4 fa-facebook"></i></a>
                  <a href={this.state.instagram_link} target="_blank"><i className="fab m-1 h4 fa-instagram"></i></a>
                  <a href={this.state.twitter_link} target="_blank"><i className="fab m-1 h4 fa-twitter"></i></a>
                </div>
              </Col>

              <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                <h5 style={{ color: '#1090c3' }} className="footer-menu-title">THE COMPANY</h5>
                <div className="footer-link-wrapper">
                  <Link style={{ color: '#1090c3' }} to="/about" className="footer-link">About Us</Link><br />
                  <Link style={{ color: '#1090c3' }} to="/" className="footer-link">Company Profile</Link><br />
                  <Link style={{ color: '#1090c3' }} to="/contact" className="footer-link">Contact Us</Link><br />
                </div>
              </Col>

              <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                <h5 style={{ color: '#1090c3' }} className="footer-menu-title">MORE INFO</h5>
                <div className="footer-link-wrapper">
                  <Link style={{ color: '#1090c3' }} to="/purchase" className="footer-link">How To Purchase</Link><br />
                  <Link style={{ color: '#1090c3' }} to="/privacy" className="footer-link">Privacy Policy</Link><br />
                  <Link style={{ color: '#1090c3' }} to="/refund" className="footer-link">Refund Policy</Link><br />
                </div>
              </Col>

              <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                <h5 style={{ color: '#1090c3' }} className="footer-menu-title">HOW TO RENT A BOOK</h5>
                <div style={{ color: '#1090c3' }}>{ReactHtmlParser(this.state.process_steps)}</div>
              </Col>
            </Row>
          </Container>

          <Container fluid={true} style={{ background: '#1090c3' }} className="text-center m-0 pt-3 pb-1">
            <Container>
              <Row>
                <h6 className="text-white">{ReactHtmlParser(this.state.copyright_text)}</h6>
              </Row>
            </Container>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default FooterDesktop;
