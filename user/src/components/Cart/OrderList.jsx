import React, { Component } from 'react';
import { Fragment } from 'react';
import AppURL from '../../api/AppURL';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

export class OrderList extends Component {
  constructor() {
    super();
    this.state = {
      ProductData: [],
      show: false,
      name: "",
      rating: "",
      comment: "",
      product_name: "",
      ISBN: "",
      ReviewModal: false,
      extendStartDate: "",
      extendEndDate: "",
    };
  }

  calculateFine = (CartOrder) => {
     const currentDate = new Date();
     const priceBook = CartOrder.price;
     const rentalEndDate = new Date(CartOrder.rental_end_date);
     const isOverdue = currentDate > rentalEndDate;
   
     if (isOverdue) {
       const timeDiff = Math.abs(currentDate - rentalEndDate);
       const daysOverdue = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
       const fineRatePerDay = priceBook * 0.75; // Assuming the fine rate is £1.50 per day
       const fine = (daysOverdue -1) * fineRatePerDay;
       return fine.toFixed(2); // Return the fine amount as a string with two decimal places
     }
   
     return "N/A"; // Return N/A if not overdue
   };
   
 

  componentDidMount() {
    this.fetchOrderHistory();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.invoice_no !== this.props.invoice_no) {
      this.fetchOrderHistory();
    }
  }

  fetchOrderHistory = () => {
    const { invoice_no } = this.props;
    axios.get(AppURL.getOrderHistory(invoice_no))
      .then(response => {
        this.setState({ ProductData: response.data });
      })
      .catch(error => {
        // Handle error if needed
      });
  };

  ReviewModalOpen = (ISBN, product_name) => {
    this.setState({ ReviewModal: true, ISBN: ISBN, product_name: product_name })
  };

  ReviewModalClose = () => {
    this.setState({ ReviewModal: false })
  };

  nameOnChange = (event) => {
    let name = event.target.value;
    this.setState({ name: name })
  }

  RatingOnChange = (event) => {
    let rating = event.target.value;
    this.setState({ rating: rating })
  }

  CommentOnChanage = (event) => {
    let comment = event.target.value;
    this.setState({ comment: comment })
  }

  PostReview = () => {
    let ISBN = this.state.ISBN;
    let product_name = this.state.product_name;
    let rating = this.state.rating;
    let comment = this.state.comment;
    let name = this.state.name;
    if (name.length === 0) {
      toast.warning("Name Is Required", { position: 'top-right' });
    } else if (comment.length === 0) {
      toast.warning("Comment Is Required", { position: 'top-right' });
    } else if (rating.length === 0) {
      toast.warning("Rating Is Required", { position: 'top-right' });
    } else if (comment.length > 50) {
      toast.warning("Comments can't more than 150 characters", { position: 'top-right' });
    } else {
      let MyFromData = new FormData();
      MyFromData.append('ISBN', ISBN)
      MyFromData.append('product_name', product_name)
      MyFromData.append('reviewer_name', name)
      MyFromData.append('reviewer_photo', "")
      MyFromData.append('reviewer_rating', rating)
      MyFromData.append('reviewer_comments', comment)

      axios.post(AppURL.PostReview, MyFromData).then(response => {
        if (response.data === 1) {
          toast.success("Review Submitted", { position: 'top-right' });
          this.ReviewModalClose();
        } else {
          toast.danger("Your Request is not done! Try Again", { position: 'top-right' });
        }
      }).catch(error => {
        toast.danger("Your Request is not done! Try Again", { position: 'top-right' });
      });
    }
  }

  ExtendOrder = (ISBN, email, invoice_no, product_name, rental_end_date, price) => {
    const extendStartDate = new Date(rental_end_date);
    extendStartDate.setDate(extendStartDate.getDate() + 1);
    const extendEndDate = new Date(extendStartDate);
    extendEndDate.setDate(extendEndDate.getDate() + 10);

    // Parse the price to a float number
    const parsedPrice = parseFloat(price);

    if (isNaN(parsedPrice)) {
      toast.error('Invalid price value', { position: 'top-right' });
      return; // Don't proceed if the price is not a valid number
    }

    // Calculate extended price
    const extendedPrice = parsedPrice * 0.5;

    // Format the dates to match the database schema
    const formattedStartDate = extendStartDate.toISOString().split('T')[0];
    const formattedEndDate = extendEndDate.toISOString().split('T')[0];

    // Open modal to confirm extend order
    this.setState({
      ExtendModal: true,
      ISBN: ISBN,
      email: email,
      invoice_no: invoice_no,
      product_name: product_name,
      extendStartDate: formattedStartDate,
      extendEndDate: formattedEndDate,
      extendedPrice: extendedPrice.toFixed(2), // Convert to fixed decimal string
      extend_price: extendedPrice.toFixed(2), // Set the extend_price in the state
    });
  };

  ExtendModalClose = () => {
    this.setState({
      ExtendModal: false,
      extendStartDate: "",
      extendEndDate: "",
    });
  };

  ConfirmExtendOrder = () => {
    const { ISBN, email, invoice_no, product_name, extendStartDate, extendEndDate, extend_price } = this.state;

    // Perform API call to submit the extended order
    axios
      .post(AppURL.ExtendOrder, {
        ISBN,
        email,
        invoice_no,
        product_name,
        extend_start_date: extendStartDate,
        extend_end_date: extendEndDate,
        extend_price: extend_price,
      })
      .then(response => {
        if (response.data === 1) {
          toast.success('Order Extended Successfully', { position: 'top-right' });

          // Set the is_extended property to true for the corresponding order

          this.ExtendModalClose();
          window.location.reload();
        } else {
          toast.error('Failed to Extend Order', { position: 'top-right' });
        }
      })
      .catch(error => {
        toast.error('Failed to Extend Order', { position: 'top-right' });
      });
      
  };

  fromAddressOnChange = (event) => {
     let from_address = event.target.value;
     this.setState({ from_address: from_address })
   }
   returnAddressOnChange = (event) => {
     let return_address = event.target.value;
     this.setState({ return_address: return_address })
   }
 
   ReferenceOnChange = (event) => {
     let reference_number = event.target.value;
     this.setState({ reference_number: reference_number })
   }
 
   ContactOnChanage = (event) => {
     let contact_number = event.target.value;
     this.setState({ contact_number: contact_number })
   }


   ReturnOrder = (ISBN, email, invoice_no, product_name) => {
     // Open modal to confirm return order
     this.setState({
       ReturnModal: true,
       ISBN: ISBN,
       email: email,
       invoice_no: invoice_no,
       product_name: product_name,
     });
   };
   
 
   ReturnModalClose = () => {
     this.setState({
       ReturnModal: false,
       fromAddress: "",
        returnAddress: "",
        contactNumber: "",
        referenceNumber: "",
     });
   };
 
   SaveReturnOrder = () => {
     const {
       ISBN,
       email,
       invoice_no,
       product_name,
       from_address,
       return_address,
       contact_number,
       reference_number,
     } = this.state;
   
     // Perform API call to submit the return order
     axios
       .post(AppURL.ReturnOrder, {
         ISBN,
         email,
         invoice_no,
         product_name,
         from_address: from_address,
         return_address: return_address,
         contact_number: contact_number,
         reference_number: reference_number,
       })
       .then(response => {
         if (response.data === 1) {
           toast.success('Order Returned Successfully', { position: 'top-right' });
   
           this.ReturnModalClose();
           window.location.reload();
         } else {
           toast.error('Failed to Return Order', { position: 'top-right' });
         }
       })
       .catch(error => {
         toast.error('Failed to Return Order', { position: 'top-right' });
       });
   };
   
   
  render() {
    const MyList = this.state.ProductData;
    const MyView = MyList.map((CartOrder, i) => {
     const isOrderDelivered = CartOrder.order_status === "Delivered";
      const isOrderReturned = CartOrder.other_status === "returned";
      const isOrderExtended = CartOrder.other_status === "extend";
      const showReturnButton = isOrderDelivered && !isOrderReturned && !isOrderExtended;
    
      const showExtendButton = isOrderDelivered && !isOrderReturned && !isOrderExtended;
     
      const fine = this.calculateFine(CartOrder);
      // Calculate fine based on product status
     
      return (
        <div>
          <Col md={6} lg={6} sm={6} xs={6}>
            <h5 className="product-name">{CartOrder.product_name}</h5>
            <h6> Invoice No: {CartOrder.invoice_no} </h6>
            <h6> ISBN: {CartOrder.ISBN} </h6>
            <h6> Rental Days: {CartOrder.rental_period} </h6>
            <h6> Rental Period: {CartOrder.rental_start_date} | {CartOrder.rental_end_date} </h6>
            <h6>Price: £ {CartOrder.price}</h6>
            <h6> Payment Method: {CartOrder.payment_method} </h6>
            <h6> Order Date: {CartOrder.order_date} </h6>
            <h6> Order Time: {CartOrder.order_time} </h6>
            <h6> Status: {CartOrder.order_status} </h6>
            <h6> Rental Book {CartOrder.other_status} </h6>
            <h2 className="product-price-on-card"> Fine: £{fine}</h2>

           
            
          </Col>
          {isOrderDelivered && (
          <>
            <Button
              onClick={this.ReviewModalOpen.bind(this, CartOrder.ISBN, CartOrder.product_name)}
              className="btn btn-danger"
            >
              Post Review
            </Button>{" "}
          </>
        )}
        {showReturnButton && (
          <>
            <Button onClick={() => this.ReturnOrder(CartOrder.ISBN, CartOrder.email, CartOrder.invoice_no, CartOrder.product_name)} className="btn btn-primary">
              Return
            </Button>{" "}
          </>
        )}
        {showExtendButton && (
          <>
            <Button
              onClick={() =>
                this.ExtendOrder(
                  CartOrder.ISBN,
                  CartOrder.email,
                  CartOrder.invoice_no,
                  CartOrder.product_name,
                  CartOrder.rental_end_date,
                  CartOrder.price
                )
              }
              className="btn btn-success"
            >
              Extend Rental
            </Button>{" "}
          </>
        )}
        <hr></hr>
      </div>
    );
  });


    return (
      <Fragment>
        <Container>
          <div className="featured-book text-center">
            <h2>Order History </h2>
          </div>
          <Card>
            <Card.Body>
              <Row>
                {MyView}
              </Row>
            </Card.Body>
          </Card>
        </Container>

        <Modal show={this.state.ReviewModal} onHide={this.ReviewModalClose}>
          <Modal.Header closeButton>
            <h6><i className="fa fa-bell"></i> Post Your Review</h6>
          </Modal.Header>
          <Modal.Body>
            <h6>Review</h6>
            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Your Name</label>
              <input onChange={this.nameOnChange} className="form-control" type="text" placeholder="" />
            </div>
            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Select Product Rating</label>
              <select onChange={this.RatingOnChange} className="form-control">
                <option value="">Choose</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Your Comment</label>
              <textarea onChange={this.CommentOnChanage} rows={2} className="form-control" type="text" placeholder="Your Comment" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.PostReview}>
              Post
            </Button>
            <Button variant="secondary" onClick={this.ReviewModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Extend Order Modal */}
        <Modal show={this.state.ExtendModal} onHide={this.ExtendModalClose}>
          <Modal.Header closeButton>
            <h6>
              <i className="fa fa-bell"></i> Extend Order
            </h6>
          </Modal.Header>
          <Modal.Body>
            <h6>Extend Order Details</h6>
            <p>Product Name: {this.state.product_name}</p>
            <p>Extend Start Date: {this.state.extendStartDate}</p>
            <p>Extend End Date: {this.state.extendEndDate}</p>
            <p>Extended Price: £{this.state.extendedPrice}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.ExtendModalClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.ConfirmExtendOrder}>
              Confirm Extend
            </Button>
          </Modal.Footer>
        </Modal>



        <Modal show={this.state.ReturnModal} onHide={this.ReturnModalClose}>
  <Modal.Header closeButton>
    <h6>
      <i className="fa fa-bell"></i> Return Order
    </h6>
  </Modal.Header>
  <Modal.Body>
    <h6>Return Order Details</h6>
    <p>Invoice No: {this.state.invoice_no}</p>
    <p>Product Name: {this.state.product_name}</p>
   
    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Return Address</label>
              <textarea onChange={this.returnAddressOnChange} className="form-control" type="text" value ="100c LongStreet, Atherstone, CV9 1AP" readOnly />
      </div>
    
      <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Your Address</label>
              <textarea onChange={this.fromAddressOnChange} className="form-control" type="text" placeholder="From Address" />
      </div>
    <br />
    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Contact Number</label>
              <input  onChange={this.ContactOnChanage} className="form-control" type="text" placeholder="Mobile Number" />
            </div>
      <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Reference Number</label>
              <input onChange={this.ReferenceOnChange} className="form-control" type="text" placeholder="Postal Reference Number" />
            </div>

  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={this.ReturnModalClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={this.SaveReturnOrder}>
      Save Return
    </Button>
  </Modal.Footer>
        </Modal>






              


      </Fragment>
    );
  }
}

export default OrderList;
