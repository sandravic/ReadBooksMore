import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

class Author extends Component {
  render() {
    const MyList = this.props.ProductData;
    const Author = this.props.Author;

    const MyView = MyList.map((ProductList, i) => (
      <Col key={i} className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
         <Link to={"/productdetails/"+ProductList.id} >
        <Card className="image-box card w-100">
          <img className="center w-75" src={ProductList.image} alt={ProductList.title} />
          <Card.Body>
            <p className="product-name-on-card">{ProductList.title}</p>
            <p className="product-price-on-card">Price: {ProductList.price}</p>
          </Card.Body>
        </Card>
        </Link>
      </Col>
    ));

    // Display a message if there are no products for the author
    const NoProductsMessage = (
      <div className="text-center">
        <p>No products available for {Author}.</p>
      </div>
    );

    return (
      <Fragment>
         <div className="breadbody">
                              <Breadcrumb>
                                   <Breadcrumb.Item> <Link style={{ color: 'white' }} to="/"> Home </Link> </Breadcrumb.Item>
                                   <Breadcrumb.Item> <Link style={{ color: 'white' }} to={"/productauthor/" + Author}> {Author} </Link> </Breadcrumb.Item>
                              </Breadcrumb>
                         </div>
        <Container className="text-center" fluid={true}>
          <div className="featured-book">
            <h2 style={{ fontWeight: 900 }}>{Author}</h2>
          </div>

          {MyList.length > 0 ? (
            <Row>
              {MyView}
            </Row>
          ) : (
            NoProductsMessage
          )}
        </Container>
      </Fragment>
    );
  }
}

export default Author;
