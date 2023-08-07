import React, { Component } from 'react';
import { Fragment } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class Category extends Component {
  render() {
    const MyList = this.props.ProductData;
    const Category = this.props.Category;

    const MyView = MyList.map((ProductList, i) => {
      return (
        <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6} key={i}>
          <div>
            <Link to={"/productdetails/" + ProductList.id}>
              <Card className="image-box card w-100">
                <img className="center w-75" src={ProductList.image} alt={ProductList.title} />
                <Card.Body>
                  <p className="product-name-on-card">{ProductList.title}</p>
                  <p className="product-price-on-card">Price : {ProductList.price}</p>
                </Card.Body>
              </Card>
            </Link>
          </div>
        </Col>
      );
    });

    return (
      <Fragment>
        <Container className="text-center" fluid={true}>
          <div className="breadbody">
            <Breadcrumb>
              <Breadcrumb.Item> <Link style={{ color: 'white' }} to="/"> Home </Link> </Breadcrumb.Item>
              <Breadcrumb.Item> <Link style={{ color: 'white' }} to="/allcategory"> All Genres</Link> </Breadcrumb.Item>
              <Breadcrumb.Item> <Link style={{ color: 'white' }} to={"/productcategory/" + Category}> {Category} </Link> </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="featured-book">
            <h2 style={{ fontWeight: 900 }}> {Category}  </h2>
          </div>

          <Row>
            {MyView}
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Category;
