import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppURL from '../../api/AppURL';
import axios from 'axios'
import { Link } from 'react-router-dom'

class Authors extends Component {
     constructor(props) {
          super(props);
          this.state = {
               MenuData: []
          }
          this.next = this.next.bind(this);
          this.previous = this.previous.bind(this)
     }
     next() {
          this.slider.slickNext();
     }
     previous() {
          this.slider.slickPrev();
     }
     componentDidMount() {
          axios.get(AppURL.AllAuthorsDetails).then(response => {
               this.setState({ MenuData: response.data });

          }).catch(error => {

          });
     }

     render() {

          const AuthorsList = this.state.MenuData;
          const MyAuthors = AuthorsList.map((author, i) => {
            return (
              <Col key={i.toString()} className="p-0" xl={2} lg={2} md={2} sm={6} xs={6}>
                {/* Pass the author's name as a URL parameter */}
                <Link className="Link-book" to={`/productauthor/${author.authors_name}`}>
                  <Card className="image-box">
                    <img className="center" src={author.authors_img} alt={author.authors_name} />
                    <Card.Body>
                      <p className="product-name-on-card">{author.authors_name}</p>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          });



          var settings = {
               dots: false,
               infinite: true,

               autoplay: false,
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
                    <Container className="text-center" fluid={true}>
                         <div className="featured-book"><h2 style={{ fontWeight: 900 }}>Authors &nbsp;

                              <a className="btn btn-sm ml-2 site-btn" onClick={this.previous} ><i className="fa fa-angle-left"></i></a>
                             
                              &nbsp;
                              <Link  style={{ color: '#1090c3' }} className= "Link-book" to="/allauthors">View All</Link>
                              &nbsp;
                              <a className="btn btn-sm ml-2 site-btn" onClick={this.next} ><i className="fa fa-angle-right"></i></a>

                         </h2>
                              <p style={{ color: '#1090c3' }}>Explore books with your favourite Authors</p>
                         </div>
                         <Row>

                              <Slider ref={c => (this.slider = c)} {...settings}>
                              
                              {MyAuthors}

                              </Slider>
                         </Row>


                    </Container>
               </Fragment>
          )
     }
}

export default Authors