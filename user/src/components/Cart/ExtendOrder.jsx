import React, { Component } from 'react';
import { Fragment } from 'react';
import AppURL from '../../api/AppURL';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

export class ExtendOrder extends Component {
  constructor() {
    super();
    this.state = {
      ProductData: [],
      show: false,
      ReturnModal: false,
      returnAddress: '',
      referenceNumber: '',
    };
  }

  componentDidMount() {
    this.fetchExtendOrderHistory();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.extend_invoice_no !== this.props.extend_invoice_no) {
      this.fetchExtendOrderHistory();
    }
  }

  fetchExtendOrderHistory = () => {
    const { extend_invoice_no } = this.props;
    axios
      .get(AppURL.getExtendOrder(extend_invoice_no))
      .then(response => {
        this.setState({ ProductData: response.data });
      })
      .catch(error => {
        // Handle error if needed
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


   ReturnOrder = (ISBN, email, invoice_no,extend_invoice_no, product_name) => {
     // Open modal to confirm return order
     this.setState({
       ReturnModal: true,
       ISBN: ISBN,
       email: email,
       invoice_no: invoice_no,
       extend_invoice_no:extend_invoice_no,
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
       extend_invoice_no,
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
       extend_invoice_no,

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
    const MyView = MyList.map((ExtendOrders, i) => {
     const isOrderComplete = ExtendOrders.order_status === "Complete";
      const isOrderReturned = ExtendOrders.other_status === "returned";
      return (
        <div key={i}>
          <Col md={6} lg={6} sm={6} xs={6}>
            <h6> Extend Invoice No: {ExtendOrders.extend_invoice_no} </h6>
            <h6> Old Invoice No: {ExtendOrders.cart_order_id} </h6>
            <h6> Extend Price : {ExtendOrders.extend_price} </h6>
            <h6>
              {' '}
              Extend Rental Period : {ExtendOrders.extend_start_date} | {ExtendOrders.extend_end_date}{' '}
            </h6>
            <h6> Extend Order Date : {ExtendOrders.order_date} </h6>
            <h6> Extend Order Time : {ExtendOrders.order_time} </h6>
            <h6>Stauts : {ExtendOrders.order_status} </h6>
            <h6>Book {ExtendOrders.other_status}</h6>
          </Col>
          {isOrderComplete && !isOrderReturned && (
           <Button onClick={() =>
               this.ReturnOrder(
                 ExtendOrders.ISBN,
                 ExtendOrders.email,
                 ExtendOrders.cart_order_id,
                 ExtendOrders.extend_invoice_no,
                 ExtendOrders.product_name
               )} className="btn btn-primary">
           Return
         </Button>
  )}
          <hr />
        </div>
      );
    });

    return (
      <Fragment>
        <Container>
          <div className="section-title text-center mb-55">
            <h2>Extend Order History</h2>
          </div>

          <Card>
            <Card.Body>
              <Row>{MyView}</Row>
            </Card.Body>
          </Card>

          {/* Return Order Modal */}
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
              <textarea onChange={this.returnAddressOnChange} className="form-control" type="text" placeholder="" />
      </div>
    
      <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Your Address</label>
              <textarea onChange={this.fromAddressOnChange} className="form-control" type="text" placeholder="" />
      </div>
    <br />
    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Contact Number</label>
              <input  onChange={this.ContactOnChanage} className="form-control" type="text" placeholder="" />
            </div>
      <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Reference Number</label>
              <input onChange={this.ReferenceOnChange} className="form-control" type="text" placeholder="" />
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
        </Container>
      </Fragment>
    );
  }
}

export default ExtendOrder;
