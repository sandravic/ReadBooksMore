import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import AppURL from '../../api/AppURL';
import axios from 'axios';

class Notification extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      NotificationData: [],
      isLoading: "",
      mainDiv: "d-none",
      Notificationmsg: "",
      Notificationtitle: "",
      Notificationdate: "",
    };
  }

  componentDidMount() {
    axios
      .get(AppURL.NotificationDetails)
      .then((response) => {
        const dataWithStatus = response.data.map((notification) => ({
          ...notification,
          status: localStorage.getItem(notification.id) || "unread", // Use localStorage to get the status or set to "unread" if not found
        }));
        this.setState({
          NotificationData: dataWithStatus,
          isLoading: "d-none",
          mainDiv: " ",
        });
      })
      .catch((error) => {
        // Handle error
      });
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = (event) => {
    this.setState({ show: true });
    let Nmsg = event.target.getAttribute("data-message");
    let Ntitle = event.target.getAttribute("data-title");
    let Ndate = event.target.getAttribute("data-date");
    this.setState({
      Notificationmsg: Nmsg,
      Notificationtitle: Ntitle,
      Notificationdate: Ndate,
    });

    // Find the index of the clicked notification in the array
    const index = parseInt(event.target.getAttribute("data-index"));

    // Create a copy of the NotificationData array to modify it
    const updatedNotificationData = [...this.state.NotificationData];

    // Check if the status is "unread" and update it to "read"
    if (updatedNotificationData[index].status === "unread") {
      updatedNotificationData[index].status = "read";

      // Save the updated status in localStorage
      localStorage.setItem(updatedNotificationData[index].id, "read");
    }

    // Update the state with the modified array
    this.setState({ NotificationData: updatedNotificationData });
  };

  render() {
    const NotificationList = this.state.NotificationData;
    const MyView = NotificationList.map((notification, i) => {
      return (
        <Col className="p-1" md={6} lg={6} sm={12} xs={12}>
          <Card onClick={this.handleShow} className="notification-card">
            <Card.Body>
              <h6>{notification.title}</h6>
              <p className="py-1 px-0 text-primary m-0">
                <i className="fa fa-bell"></i> Date: {notification.date} | Status: {notification.status}
              </p>
              <Button
                data-title={notification.title}
                data-date={notification.date}
                data-message={notification.message}
                data-index={i} // Pass the index as a data attribute to identify the clicked notification
                className="btn btn-danger"
              >
                Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });

    return (
      <Fragment>
        <Container className="TopSection">
        <div className="featured-book text-center">
              <h2 style={{ fontWeight: 900 }}>Notification</h2>
     </div>
          <Row>{MyView}</Row>
         
        </Container>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <h6>
              <i className="fa fa-bell"></i> Date: {this.state.Notificationdate}
            </h6>
          </Modal.Header>
          <Modal.Body>
            <h6> {this.state.Notificationtitle}</h6>
            <p>{this.state.Notificationmsg}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}

export default Notification;
