import React, { useState, useEffect } from 'react';
import HomeSlider from './HomeSlider';
import { Container, Row, Col } from 'react-bootstrap';
import AppURL from '../../api/AppURL';
import axios from 'axios';

const HomeTopMobile = () => {
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios
      .get(AppURL.AllSlider)
      .then((response) => {
        if (isMounted) {
          setSliderData(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      // Clean up any ongoing asynchronous tasks and subscriptions here
      isMounted = false;
    };
  }, []);

  return (
    <Container className="p-0 m-0 overflow-hidden" fluid>
      <Row className="p-0 m-0 overflow-hidden">
        <Col lg={12} md={12} sm={12}>
          <HomeSlider data={sliderData} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeTopMobile;
