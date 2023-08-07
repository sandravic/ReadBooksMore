import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import AppURL from '../../api/AppURL';
import axios from 'axios';


class Cart extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      ProductData: [],
      isLoading: "",
      mainDiv: "d-none",
      PageRefreshStatus: false,
      PageRedirectStatus: false,

      stripeButtonName :"Pay with Stripe",
      cashOnDeliveryButtonName : "Pay on Delivery",
      city: "",
      payment: "",
      name: "",
      address: ""
    };
  }

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(AppURL.CartList(this.props.user.email))
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            ProductData: response.data,
            isLoading: "d-none",
            mainDiv: " "
          });
        }
      })
      .catch((error) => {
        // Handle the error if needed
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  removeItem = (id) => {
    axios
      .get(AppURL.RemoveCartList(id))
      .then((response) => {
        if (response.data === 1) {
          toast.success("Cart Item Removed", { position: 'top-right' });
          this.setState({ PageRefreshStatus: true });
        } else {
          toast.error("Your Request is not done! Try Again", { position: 'top-right' });
        }
      })
      .catch((error) => {
        toast.error("Your Request is not done! Try Again", { position: 'top-right' });
      });
  };

  cityOnChange = (event) => {
    let city = event.target.value;
    this.setState({ city: city });
  };

  paymentMethodOnChange = (event) => {
    let payment = event.target.value;
    this.setState({ payment: payment });
  };

  nameOnChange = (event) => {
    let name = event.target.value;
    this.setState({ name: name });
  };

  addressOnChange = (event) => {
    let address = event.target.value;
    this.setState({ address: address });
  };

  confirmOnClick = (token) => {
  

    let city = this.state.city;
    let payment = this.state.payment;
    let name = this.state.name;
    let address = this.state.address;
    let email = this.props.user.email;

    if (city.length === 0 || payment.length === 0 || name.length === 0 || address.length === 0) {
      toast.error("Please fill all the required fields", { position: 'top-right' });
    } else {
      let invoice = new Date().getTime();
      let MyFromData = new FormData();
      MyFromData.append('city', city);
      MyFromData.append('payment_method', payment);
      MyFromData.append('name', name);
      MyFromData.append('delivery_address', address);
      MyFromData.append('email', email);
      MyFromData.append('invoice_no', invoice);
      MyFromData.append('delivery_charge', "00");

      axios.post(AppURL.CartOrder, MyFromData).then((response) => {
        if (response.data === 1) {
          toast.success("Order Request Received", { position: 'top-right' });
          this.setState({ PageRedirectStatus: true });
        } else {
          toast.error("Your Request is not done! Try Again", { position: 'top-right' });
        }
      }).catch((error) => {
        toast.error("Your Request is not done! Try Again", { position: 'top-right' });
      });
    }
  };

  render() {
    const MyList = this.state.ProductData;
    let totalPriceSum = 0;
    const MyView = MyList.map((ProductList) => {
      totalPriceSum += parseInt(ProductList.product_price, 10);
      return (
        <Col className="p-1" lg={12} md={12} sm={12} xs={12} key={ProductList.id}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={3} sm={6} xs={6}>
                  <img className="cart-product-img" src={ProductList.image} alt={ProductList.product_name} />
                </Col>
                <Col md={6} sm={6} xs={6}>
                  <h5 className="product-name">
                    {ProductList.product_name}
                  </h5>
                  <h6>Rental Period: {ProductList.product_period} Days</h6>
                  <h6>Rental  Dates: {ProductList.product_start_date} to {ProductList.product_end_date}</h6>
                  <h6>Price : {ProductList.product_price}</h6>
                </Col>
                <Col md={3} sm={12} xs={12}>
                  <Button onClick={() => this.removeItem(ProductList.id)} className="btn btn-block mt-3 site-btn">
                    <i className="fa fa-trash-alt"></i>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      );
    });

    if (this.state.PageRefreshStatus) {
      return <Redirect to={window.location} />;
    }

    if (this.state.PageRedirectStatus) {
      return <Redirect to="/profile" />;
    }
    
    let paymentButton;
    if (this.state.payment === "Stripe") {
      paymentButton = (
        <StripeCheckout
          stripeKey="pk_test_51NVuKfHnVSiG8gwl0HcIwKoQ4FK7VlPwCy0ixiE99G5EAXqy8F66CGHUppdz3P6RDStjUecH2sLRm3UDVVh0mYRU00d9ymx70h"
          token={this.confirmOnClick} 
          amount={totalPriceSum * 100} // Amount in cents
          currency="GBP"
          name="Readbooksmore.com"
          description="Rental Books"
        >
          <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
            <button className="btn site-btn"> {this.state.stripeButtonName} </button>
          </div>
        </StripeCheckout>
      );
    } else if (this.state.payment === "Cash On Delivery") {
      paymentButton = (
        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
          <button className="btn site-btn" onClick={this.confirmOnClick}> {this.state.cashOnDeliveryButtonName} </button>
        </div>
      );
    }

    return (
      <Fragment>
        <Container>
        <ToastContainer />
          <div className="featured-book"><h2 style={{ fontWeight: 900 }}>RENTAL CART &nbsp;</h2>
          </div>
          <Row>
            <Col className="p-1" lg={7} md={7} sm={12} xs={12} >
              {MyView}
            </Col>

            <Col className="p-1" lg={5} md={5} sm={12} xs={12} >
              <div className="card p-2">
                <div className="card-body">
                  <div className="container-fluid ">
                    <div className="row">
                      <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                        <h5 className="Product-Name text-danger">Total Due: {totalPriceSum}</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                        <label className="form-label">Choose City</label>
                        <select onChange={this.cityOnChange} className="form-control">
                          <option value="">Choose</option>
                          <option value="Coventry">Coventry</option>
                          <option value="Leeds">Leeds</option>
                          <option value="Sheffield">Sheffield</option>
                          <option value="Western super Mare<">Western super Mare</option>
                          <option value="Scotland">Scotland</option>
                          <option value="London">London</option>
                        </select>
                      </div>
                      <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                        <label className="form-label">Choose Payment Method</label>
                        <select onChange={this.paymentMethodOnChange} className="form-control">
                          <option value="">Choose</option>
                          <option value="Cash On Delivery">Cash On Delivery</option>
                          <option value="Stripe">Stripe</option>
                        </select>
                      </div>
                      <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                        <label className="form-label">Your Name</label>
                        <input onChange={this.nameOnChange} className="form-control" type="text" placeholder="" />
                      </div>

                      <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                        <label className="form-label">Delivery Address</label>
                        <textarea onChange={this.addressOnChange} rows={2} className="form-control" type="text" placeholder="" />
                      </div>
                     
                      {paymentButton}
                    
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Cart;
