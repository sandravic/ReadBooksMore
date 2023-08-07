import React, { Component, Fragment } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHeartCircleCheck,
  faTruck,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Redirect } from "react-router-dom";
import SuggestedProduct from "./SuggestedProduct";
import ReviewList from "./ReviewList";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AppURL from "../../api/AppURL";
import axios from "axios";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addToFav: "Favourite",
      startDate: new Date().toISOString().split('T')[0], 
      
      productISBN: null,
      addToCart: "Add To Cart",
      cartAdded: false,
      PageRefreshStatus: false,
     
    };

  }
  addToFav = () => {
    this.setState({ addToFav: "Adding..." });
    let productISBN = this.state.productISBN;
    let email = this.props.user.email;

    if (!localStorage.getItem("token")) {
      toast.warn("Please You have to Login First", { position: "top-right" });
    } else {
      axios
        .get(AppURL.AddFavourite(productISBN, email))
        .then((response) => {
          if (response.data === 1) {
            toast.success("Product Is Added in  Favourite", { position: "top-right" });
            this.setState({ addToFav: "Favourite" });
          } else {
            toast.danger("Your Request is not done ! Try Aagain", {
              position: "top-right",
            });
            this.setState({ addToFav: "Favourite" });
          }
        })
        .catch((error) => {
          toast.danger("Your Request is not done ! Try Aagain", {
            position: "top-right",
          });
          this.setState({ addToFav: "Favourite" });
        });
    }
  }; // end ADD TO FAV

  addToCart = () => {
    let productISBN = this.state.productISBN;
    let email = this.props.user.email;

    if (!localStorage.getItem("token")) {
      toast.warn("Please You have to Login First", { position: "top-right" });
    } else {
      this.setState({ addToCart: "Adding..." });

      let formData = new FormData();
      formData.append("ISBN", productISBN);
      formData.append("email", email);
      formData.append("startDate", this.state.startDate);
      formData.append("endDate", this.state.endDate);


      axios
        .post(AppURL.addToCart, formData)
        .then((response) => {
          if (response.data === 1) {
            toast.success("Product Added Successfully", {
              position: "top-right",
            });
            this.setState({ addToCart: "Added To Cart" });
            this.setState({ PageRefreshStatus: true });
          } else {
            toast.danger("Your Request is not done! Try Again", {
              position: "top-right",
            });
            this.setState({ addToCart: "Added To Cart" });
          }
        })
        .catch((error) => {
          toast.error("Your Request is not done! Try Again", {
            position: "top-right",
          });
          this.setState({ addToCart: "Add To Cart" });
        });
    }
  };
  PageRefresh = () => {
    if (this.state.PageRefreshStatus === true) {
      let URL = window.location;
      return <Redirect to={URL} />;
    }
  };
  
  handleStartDateChange = (event) => {
    const startDate = event.target.value;
    this.setState({ startDate }, () => {
      this.handleEndDateCalculation();
    });
  };

  handleEndDateCalculation = () => {
    const { startDate } = this.state;
    const period = this.props.data["productList"][0]["period"];
  
    if (startDate && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(startDate) && !isNaN(period)) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(startDateObj.getTime() + period * 24 * 60 * 60 * 1000);
  
      const endDate = endDateObj.toISOString().split('T')[0];
      this.setState({ endDate });
    } else {
      // Handle the case when startDate is not set or invalid.
      this.setState({ endDate: null });
    }
  };
  

  render() {
  

    const { startDate, endDate } = this.state;

    let ProductAllData = this.props.data;
    let id = ProductAllData["productList"][0]["id"];
    let title = ProductAllData["productList"][0]["title"];
    let author = ProductAllData["productList"][0]["author"];
    let category = ProductAllData["productList"][0]["category"];
    let subcategory = ProductAllData["productList"][0]["subcategory"];
    let image = ProductAllData["productList"][0]["image"];

    let price = ProductAllData["productList"][0]["price"];
    let ISBN = ProductAllData["productList"][0]["ISBN"];
    let period = ProductAllData['productList'][0]['period'];
    
    
    let quantity = ProductAllData["productList"][0]["quantity"];
    let book_status = ProductAllData["productList"][0]["book_status"];
    let shipping_details = ProductAllData["productList"][0]["shipping_details"];

    let product_id = ProductAllData["productDetails"][0]["product_id"];
    let description = ProductAllData["productDetails"][0]["description"];

    if (this.state.productISBN === null) {
      this.setState({ productISBN: ISBN });
    }

    return (
      <Fragment>
        <Container fluid={true} className="BetweenTwoSection">
          <div className="breadbody">
            <Breadcrumb>
              <Breadcrumb.Item>
                {" "}
                <Link style={{ color: "white" }} to="/">
                  {" "}
                  Home{" "}
                </Link>{" "}
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                {" "}
                <Link
                  style={{ color: "white" }}
                  to={"/productcategory/" + category}
                >
                  {" "}
                  {category}{" "}
                </Link>{" "}
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                {" "}
                <Link
                  style={{ color: "white" }}
                  to={"/productsubcategory/" + category + "/" + subcategory}
                >
                  {" "}
                  {subcategory}{" "}
                </Link>{" "}
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                {" "}
                <Link
                  style={{ color: "white" }}
                  to={"/productdetails/" + product_id}
                >
                  {" "}
                  {title}{" "}
                </Link>{" "}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Row className="p-2">
            <Col
              className="shadow-sm bg-white pb-3 mt-4"
              md={12}
              lg={12}
              sm={12}
              xs={12}
            >
              <Row>
                <Col
                  className="p-3 d-flex justify-content-center"
                  md={6}
                  lg={6}
                  sm={12}
                  xs={12}
                >
                  <img className ="product-image product-details" src={image} alt="Product" />
                </Col>

                <Col className="p-3 " md={6} lg={6} sm={12} xs={12}>
                  <h2 className="Product-Name">{title}</h2>
                  <h5 className="mt-2">{author}</h5>
                  <h5 className="mt-2">
                    Genre :{category}/{subcategory}
                  </h5>
                  <h5 className="mt-2">ISBN: {ISBN}</h5>
                  <h5 className="mt-2">
                    {book_status} : {quantity}
                  </h5>
                  <div className="input-group">
                    <p className="product-price-on-card-detail">£ {price}</p>
                  </div>
                  <h5 className="mt-2">Rental Days : {period}</h5>
                  <h5 className="mt-2">Select Start Date</h5>
                  <div className="input-group">
                    <div className="form-date mx-1">
                      <input
                        className="form-date-input"
                        type="date"
                        name="startDate"
                        id="startDate"
                        value={startDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={this.handleStartDateChange}
                      required />
                    </div>
                    </div>
                   <br/>
                    <h5 className="mt-2">End Date will be</h5>
                    <div className="input-group">
                    <div className="form-date mx-1">
                      <input
                        className="form-date-input"
                        type="text"
                        name="endDate"
                        id="endDate"
                        value={endDate}
                        min={startDate}
                        readOnly
                      />
                    </div>
                  </div>
                  <br />
                  <FontAwesomeIcon icon={faTruck} />
                  <h5 className="mt-2">{shipping_details}</h5>
                  <div className="input-group mt-3">
                    <button
                      onClick={this.addToCart}
                      className="btn site-btn m-1 "
                    >
                      {" "}
                      <FontAwesomeIcon icon={faCartPlus} />{" "}
                      {this.state.addToCart}{" "}
                    </button>

                    <button
                      onClick={this.addToFav}
                      className="btn site-btn m-1"
                    >
                      <FontAwesomeIcon icon={faHeartCircleCheck} />{" "}
                      {this.state.addToFav}
                    </button>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col className="" md={6} lg={6} sm={12} xs={12}>
                  <h6 className="mt-2">DETAILS</h6>
                  <p>{description}</p>
                </Col>

                <Col className="" md={6} lg={6} sm={12} xs={12}>
                  <ReviewList code={ISBN} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <SuggestedProduct subcategory={subcategory} currentId={id} />
        {this.PageRefresh()}
      </Fragment>
    );
  }
}

export default ProductDetails;
