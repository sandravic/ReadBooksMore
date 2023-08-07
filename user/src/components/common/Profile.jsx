import React, { Component, Fragment } from 'react';
import { Navbar, Container, Row, Col, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import profile from '../../assets/images/profile.jpg';
import axios from 'axios';
import AppURL from '../../api/AppURL';

class Profile extends Component {
  state = {
    ProductData: [],
    activeSection: 'orders',
    selectedImage: null,
  };

  handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    this.setState({ selectedImage });
  };

  updateProfileImage = () => {
    const formData = new FormData();
    formData.append('profile_photo_path', this.state.selectedImage);
  
    formData.append('email', this.props.user.email); // add email
  
    axios
      .post(AppURL.UserProfileStore, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log('Profile picture updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile picture', error);
      });
  };
  

  componentDidMount() {
    let email = this.props.user.email;

    axios
      .get(AppURL.OrderListByUser(email))
      .then((response) => {
        this.setState({ ProductData: response.data });
      })
      .catch((error) => {});

    axios
      .get(AppURL.ExtendOrderHistory(email))
      .then((response) => {
        this.setState({ extendOrderHistory: response.data });
      })
      .catch((error) => {});

    axios
      .get(AppURL.getReturnHistory(email))
      .then((response) => {
        this.setState({ returnOrderHistory: response.data });
      })
      .catch((error) => {});
  }

  handleOrderClick = (invoiceNo, orderDate) => {
    axios
      .get(AppURL.getOrderHistory(invoiceNo, orderDate))
      .then((response) => {
        this.setState({ selectedOrderHistory: response.data });
      })
      .catch((error) => {});
  };

  handleSectionChange = (section) => {
    this.setState({ activeSection: section });
  };

  render() {
    let name;
    let email;
    if (this.props.user) {
      name = this.props.user.name;
      email = this.props.user.email;
    }

    if (!localStorage.getItem('token')) {
      return <Redirect to="/login" />;
    }

    const { activeSection } = this.state;
    let MyList = [];

    if (activeSection === 'orders') {
      MyList = this.state.ProductData;
    } else if (activeSection === 'returns') {
      MyList = this.state.returnOrderHistory;
    } else if (activeSection === 'extend') {
      MyList = this.state.extendOrderHistory;
    }

    const MyView = MyList.map((CartOrder, i) => (
      <ListGroupItem key={i}>
        {activeSection === 'orders' && (
          <Link
            className="text-link"
            to={'/orderlistbyinvoice/' + CartOrder.invoice_no}
            onClick={() => this.handleOrderClick(CartOrder.invoice_no, CartOrder.order_date)}
          >
            <p className="product-name-on-card">
              {CartOrder.invoice_no} : {CartOrder.order_date}:{CartOrder.order_time}
            </p>
          </Link>
        )}
      </ListGroupItem>
    ));

    const MyViewReturn = MyList.map((ReturnOrders, i) => (
      <ListGroupItem key={i}>
        {activeSection === 'returns' && (
          <Link
            className="text-link"
            to={'/returnlistbyinvoice/' + ReturnOrders.invoice_no}
            onClick={() => this.handleOrderClick(ReturnOrders.invoice_no, ReturnOrders.return_date)}
          >
            <p className="product-name-on-card">
              {ReturnOrders.invoice_no} : {ReturnOrders.return_date} : {ReturnOrders.return_time}
            </p>
          </Link>
        )}
      </ListGroupItem>
    ));

    const MyViewExtend = MyList.map((ExtendOrders, i) => (
      <ListGroupItem key={i}>
        {activeSection === 'extend' && (
          <Link
            className="text-link"
            to={'/extendorderinvoice/' + ExtendOrders.extend_invoice_no}
            onClick={() => this.handleOrderClick(ExtendOrders.extend_invoice_no, ExtendOrders.order_date)}
          >
            <p className="product-name-on-card">
              {ExtendOrders.extend_invoice_no} : {ExtendOrders.order_date} : {ExtendOrders.order_time}
            </p>
          </Link>
        )}
      </ListGroupItem>
    ));

    return (
      <Fragment>
        <br />
        <div className="featured-book text-center">
          <h2 style={{ fontWeight: 900 }}>User Profile Page</h2>
        </div>

        <Container>
          <Row>
            <Col lg={4} md={4} sm={12}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={profile} className="userprofile" />
                <input type="file" onChange={this.handleImageChange} accept=".jpg, .jpeg, .png" />
                <Button onClick={this.updateProfileImage}>Update Profile Picture</Button>
                <ul className="list-group">
                  <li className="list-group-item">Name: {name} </li>
                  <li className="list-group-item">Email: {email} </li>
                </ul>
              </Card>
            </Col>

            <Col lg={8} md={8} sm={12}>
              <div className="row" data-aos="fade-up">
                <div className="col-lg-12 d-flex justify-content-center">
                  <div className="btn-group">
                    <Button
                      variant={activeSection === 'orders' ? 'primary' : 'outline-primary'}
                      className="custom-button"
                      onClick={() => this.handleSectionChange('orders')}
                    >
                      Orders
                    </Button>
                    <Button
                      variant={activeSection === 'returns' ? 'primary' : 'outline-primary'}
                      className="custom-button"
                      onClick={() => this.handleSectionChange('returns')}
                    >
                      Returns
                    </Button>
                    <Button
                      variant={activeSection === 'extend' ? 'primary' : 'outline-primary'}
                      className="custom-button"
                      onClick={() => this.handleSectionChange('extend')}
                    >
                      Extend Orders
                    </Button>
                  </div>
                </div>
              </div>
              <ListGroup className="list-group-flush">
                {activeSection === 'orders' && MyView}
                {activeSection === 'returns' && MyViewReturn}
                {activeSection === 'extend' && MyViewExtend}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Profile;
