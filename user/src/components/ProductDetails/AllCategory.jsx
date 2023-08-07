import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AppURL from '../../api/AppURL';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Breadcrumb from 'react-bootstrap/Breadcrumb'



export class AllCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MenuData: [],
      currentPage: 0,
      itemsPerPage: this.getItemsPerPage(), // Initial value based on screen size
    };
  }

  componentDidMount() {
    axios
      .get(AppURL.AllCategoryDetails)
      .then((response) => {
        this.setState({ MenuData: response.data });
      })
      .catch((error) => {});
  }

  handlePageClick = (data) => {
    const { selected } = data;
    this.setState({ currentPage: selected });
  };

  getItemsPerPage() {
    return window.innerWidth < 768 ? 6 : 18; // Change breakpoint and value as needed
  }

  updateItemsPerPage = () => {
    this.setState({ itemsPerPage: this.getItemsPerPage() });
  };

  renderBackButton() {
    return (
      <div className="back-button">
        <Link className = "Link-book" to="/">Back to Home</Link>
      </div>
    );
  }

  render() {
    const { MenuData, currentPage, itemsPerPage } = this.state;

    // Pagination calculations
    const offset = currentPage * itemsPerPage;
    const pageCount = Math.ceil(MenuData.length / itemsPerPage);
    const currentData = MenuData.slice(offset, offset + itemsPerPage);

    const MyView = currentData.map((CatList, i) => {
      return (
        <Col key={i.toString()} className="p-0" xl={2} lg={2} md={2} sm={6} xs={6}>
          <Link className = "Link-book" to={'/productcategory/' + CatList.category_name}>
            <Card className="h-100 w-100 text-center">
              <Card.Body>
                <img className="center" src={CatList.category_image} alt={CatList.category_name} />
                <p className="product-name-on-card">{CatList.category_name}</p>
              </Card.Body>
            </Card>
          </Link>
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
                              </Breadcrumb>
                         </div>
          <div className="featured-book">
            <h2 style={{ fontWeight: 900 }}>Select Genres &nbsp;</h2>
            <p style={{ color: '#1090c3' }}>Explore books with your favorite </p>
          </div>
          {window.innerWidth < 850 && this.renderBackButton()}
          <Row>{MyView}</Row>
          <br />

          {/* Pagination */}
          <ReactPaginate
            previousLabel={'←'}
            nextLabel={'→'}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination justify-content-center'}
            activeClassName={'active'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
          />
        </Container>
      </Fragment>
    );
  }
}

export default AllCategory;
