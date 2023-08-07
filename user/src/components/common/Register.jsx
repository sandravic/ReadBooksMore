import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

import Login from '../../assets/images/img17.jpeg';
import AppURL from '../../api/AppURL';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      message: '',
      loggedIn: false,
    };
  }

  // Register Form Submit Method
  formSubmit = (e) => {
    e.preventDefault();

    // Check password criteria here
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(this.state.password)) {
      this.setState({
        message:
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.',
      });
      return;
    }

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };

    axios
      .post(AppURL.UserRegister, data)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        this.setState({ loggedIn: true });
        this.props.setUser(response.data.user);
      })
      .catch((error) => {
        this.setState({ message: error.response.data.message || 'Registration failed!' });
      });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/profile" />;
    }

    if (localStorage.getItem('token')) {
      return <Redirect to="/profile" />;
    }

    return (
      <Fragment>
        <Container>
          <Row className="p-2">
            <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
              <Row>
                <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                  <Form className="onboardForm" onSubmit={this.formSubmit}>
                    <h4 className="section-title-login text-center onboardFormText">Sign Up</h4>

                    {this.state.message && (
                      <div className="alert alert-danger">{this.state.message}</div>
                    )}

                    <h6 className="section-sub-title onboardFormText">Email</h6>
                    <input
                      className="form-control m-2"
                      type="email"
                      placeholder="Enter Your Email"
                      onChange={(e) => {
                        this.setState({ email: e.target.value });
                      }}
                      required
                    />

                    <h6 className="section-sub-title onboardFormText">Name</h6>
                    <input
                      className="form-control m-2"
                      type="text"
                      placeholder="Enter Your Name"
                      onChange={(e) => {
                        this.setState({ name: e.target.value });
                      }}
                      required
                    />

                    <h6 className="section-sub-title onboardFormText">Password</h6>
                    <input
                      className="form-control m-2"
                      type="password"
                      placeholder="Enter Your Password"
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                      required
                    />

                    <h6 className="section-sub-title onboardFormText">Confirm Password</h6>
                    <input
                      className="form-control m-2"
                      type="password"
                      placeholder="Confirm Your Password"
                      onChange={(e) => {
                        this.setState({ password_confirmation: e.target.value });
                      }}
                      required
                    />

                    <Button type="submit" className="btn btn-block m-2 site-btn-login">
                      Sign In
                    </Button>
                    <br />
                    <br />
                    <hr />
                    <p className="text-center">
                      <b>Forget My Password?</b>
                      <Link to="/forget">
                        <b> Forget Password </b>
                      </Link>
                    </p>
                    <p className="text-center">
                      <b> Already Have An Account ? </b>
                      <Link to="/login">
                        <b> Login </b>
                      </Link>
                    </p>
                  </Form>
                </Col>
                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                  <img className="onboardBanner" src={Login} alt="Login Banner" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Register;
