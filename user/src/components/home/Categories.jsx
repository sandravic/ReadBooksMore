import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppURL from '../../api/AppURL';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MenuData: [],
      isLoading: true, // Change the initial state to true for loading
      mainDiv: "d-none"
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.isComponentMounted = false; // Create a flag to track component mount status
  }

  componentDidMount() {
    this.isComponentMounted = true; // Component is mounted, so set the flag to true

    axios.get(AppURL.AllCategoryDetails).then(response => {
      if (this.isComponentMounted) {
        this.setState({
          MenuData: response.data,
          isLoading: false, // Set loading to false when the data is fetched
          mainDiv: "" // Make the mainDiv visible
        });
      }
    }).catch(error => {
      if (this.isComponentMounted) {
        this.setState({
          isLoading: false // Set loading to false even if an error occurs
        });
      }
    });
  }

  componentWillUnmount() {
    this.isComponentMounted = false; // Component is about to unmount, so set the flag to false
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  render() {
    const CatList = this.state.MenuData;
    const MyView = CatList.map((CatList, i) => {
      return (
        <Col key={i.toString()} className="p-0" xl={2} lg={2} md={2} sm={6} xs={6}>
          <Link className="Link-book" to={"/productcategory/" + CatList.category_name}>
            <Card className="h-100 w-100 text-center">
              <Card.Body>
                <img className="center" src={CatList.category_image} /><br />
                <p className="product-name-on-carde">{CatList.category_name}</p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      );
    });

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <Fragment>
        {/* <CategoryLoading isLoading={this.state.isLoading} /> */}

        <div className={this.state.mainDiv}>
          <Container className="text-center" fluid={true}>
            <div className="featured-book">
              <h2 style={{ fontWeight: 900 }}>
                Genres &nbsp;
                <a className="btn btn-sm ml-2 site-btn" onClick={this.previous}><i className="fa fa-angle-left"></i></a>
                &nbsp;
                <Link style={{ color: '#1090c3' }} className="Link-book" to="/allcategory">View All</Link>
                &nbsp;
                <a className="btn btn-sm ml-2 site-btn" onClick={this.next}><i className="fa fa-angle-right"></i></a>
              </h2>
              <p style={{ color: '#1090c3' }}>Explore books with your favorite Genres</p>
            </div>
            <Row>
              <Slider ref={c => (this.slider = c)} {...settings}>
                {MyView}
              </Slider>
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default Categories;
