import React, { Component } from 'react';
import { Fragment } from 'react';
import AppURL from '../../api/AppURL';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

export class ReturnOrder extends Component {
  constructor() {
    super();
    this.state = {
      ProductData: [],
      show: false,
      
    };
  }

  componentDidMount() {
    this.fetchReturnOrderHistory();
  }



  fetchReturnOrderHistory = () => {
    const { invoice_no } = this.props;
    axios
      .get(AppURL.getReturnOrder(invoice_no))
      .then(response => {
        this.setState({ ProductData: response.data });
      })
      .catch(error => {
        // Handle error if needed
      });
      
  };


  render() {
    const MyList = this.state.ProductData;
    const MyView = MyList.map((ReturnOrders, i) => {
  
      return (
        <div key={i}>
          <Col md={6} lg={6} sm={6} xs={6}>
            <h6> Invoice No: {ReturnOrders.invoice_no} </h6>
            <h6> Reference Number: {ReturnOrders.reference_number} </h6>
            <h6> Return Date : {ReturnOrders.return_date} </h6>
            <h6> Return Time : {ReturnOrders.return_time} </h6>
            <h6> Return Status : {ReturnOrders.return_status} </h6>
          
          </Col>
          <hr />
        </div>
      );
    });

    return (
      <Fragment>
        <Container>
          <div className="section-title text-center mb-55">
            <h2>Return Order History</h2>
          </div>

          <Card>
            <Card.Body>
              <Row>{MyView}</Row>
            </Card.Body>
          </Card>
        </Container>
      </Fragment>
    );
  }
}

export default ReturnOrder;
