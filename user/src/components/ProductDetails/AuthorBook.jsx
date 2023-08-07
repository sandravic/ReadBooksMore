import React, { Component } from 'react';
import { Fragment } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AppURL from '../../api/AppURL';
import axios from 'axios';

class AuthorBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorName: this.props.match.params.authorName,
      booksData: [],
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
    axios
      .get(AppURL.ProductListByAuthor(this.state.authorName))
      .then((response) => {
        this.setState({ booksData: response.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    const { authorName, booksData } = this.state;

    const booksList = booksData.map((book, i) => (
      <Col key={i.toString()} className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
        <Card className="image-box card w-100">
          <img className="center w-75" src={book.image} alt={book.title} />
          <Card.Body>
            <p className="product-name-on-card">{book.title}</p>
            <p className="product-price-on-card">Price : {book.price}</p>
          </Card.Body>
        </Card>
      </Col>
    ));

    return (
      <Fragment>
        <Container className="text-center" fluid={true}>
          <div className="featured-book">
            <h2 style={{ fontWeight: 900 }}>Books by {authorName}</h2>
          </div>
          <Row>{booksList}</Row>
        </Container>
      </Fragment>
    );
  }
}

export default AuthorBook;
