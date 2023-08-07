import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import validation from '../../validation/validation';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      mobile_number: '',
      message: '',
    };
  }

  nameOnChange = (event) => {
    let name = event.target.value;
    this.setState({ name: name });
  };

  emailOnChange = (event) => {
    let email = event.target.value;
    this.setState({ email: email });
  };

  mobileOnChange = (event) => {
    let mobile_number = event.target.value;
    this.setState({ mobile_number: mobile_number });
  };

  messageOnChange = (event) => {
    let message = event.target.value;
    this.setState({ message: message });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    const { name, email, mobile_number, message } = this.state;

    if (message.length === 0) {
      toast.error('Please write your message');
    } else if (mobile_number.length === 0) {
      toast.error('Please write your mobile number');
    } else if (name.length === 0) {
      toast.error('Please write down your name');
    } else if (email.length === 0) {
      toast.error('Please write down your email');
    } else if (!validation.NameRegx.test(name)) {
      toast.error('Invalid Name');
    } else {
      const sendBtn = document.getElementById('sendBtn');
      const contactForm = document.getElementById('contactForm');

      sendBtn.innerHTML = 'Sending...';

      const MyFormData = new FormData();
      MyFormData.append('name', name);
      MyFormData.append('email', email);
      MyFormData.append('mobile_number', mobile_number);
      MyFormData.append('message', message);

      axios
        .post(AppURL.PostContact, MyFormData)
        .then(function (response) {
          if (response.status === 200 && response.data === 1) {
            toast.success('Message Sent Successfully');
            sendBtn.innerHTML = 'Send';
            contactForm.reset();
          } else {
            toast.error('Error');
            sendBtn.innerHTML = 'Send';
          }
        })
        .catch(function (error) {
          toast.error(error);
          sendBtn.innerHTML = 'Send';
        });
    }
  };

  render() {
    return (
      <Fragment>
        <Container>
          <Row className="p-2">
            <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
              <Row>
                <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                  <Form id="contactForm" onSubmit={this.onFormSubmit} className="onboardForm">
                    <h2 className="section-title-login text-center onboardFormText">Contact Us</h2>
                    <h6 className="section-sub-title text-center">Please Contact Us</h6>
                    <h6 className="section-sub-title onboardFormText">Name</h6>
                    <input
                      onChange={this.nameOnChange}
                      className="form-control m-2"
                      type="text"
                      placeholder="Enter Your Name"
                      required
                    />
                    <h6 className="section-sub-title onboardFormText">Email</h6>
                    <input
                      onChange={this.emailOnChange}
                      className="form-control m-2"
                      type="email"
                      placeholder="Enter Your Email"
                      required
                    />
                    <h6 className="section-sub-title onboardFormText">Phone Number</h6>
                    <input
                      onChange={this.mobileOnChange}
                      className="form-control m-2"
                      type="text"
                      placeholder="Enter Your Phone Number"
                      required
                    />
                    <h6 className="section-sub-title onboardFormText">Message</h6>
                    <Form.Control
                      onChange={this.messageOnChange}
                      className="form-control m-2"
                      as="textarea"
                      rows={3}
                      placeholder="Message"
                      required
                    />
                    <Button id="sendBtn" type="submit" className="btn btn-block m-2 site-btn-login">
                      Send
                    </Button>
                  </Form>
                </Col>
                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={12} xs={12}>
                  <br />
                  <br />
                  <p className="section-title-contact">
                    16 Cornwall Road, Coventry, West Midlands, CV1 2AE <br />
                    Email: support@readbooksmore.com
                  </p>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.2548101128186!2d-1.5013222232270462!3d52.402057972030654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48774bc9ce6ce487%3A0xd755ab246d6866da!2s16%20Cornwall%20Rd%2C%20Coventry%20CV1%202AE!5e0!3m2!1sen!2suk!4v1688862994790!5m2!1sen!2suk"
                    width="500"
                    height="450"
                    style={{ border: '0' }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </Fragment>
    );
  }
}

export default Contact;
