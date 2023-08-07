import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Login from '../../assets/images/img15.jpg';
import AppURL from '../../api/AppURL';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      message: '', // For displaying error messages
      loggedIn: false,
    };
  }

  // Login Form Submit Method 
  formSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    axios.post(AppURL.UserLogin, data)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        this.setState({ loggedIn: true });
        this.props.setUser(response.data.user);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorMessage = error.response.data.message || 'Something went wrong!';
          this.setState({ message: errorMessage });
        } else if (error.request) {
          // The request was made but no response was received
          this.setState({ message: 'No response received from the server.' });
        } else {
          // Something happened in setting up the request that triggered an Error
          this.setState({ message: 'Error occurred while sending the request.' });
        }
      });
  };

  render() {
    // After Login Redirect to Profile Page
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
                    <h2 className="section-title-login text-center onboardFormText"> Sign In </h2>
                    <h6 className="section-sub-title onboardFormText">Email</h6>
                    <input className="form-control m-2" type="email" placeholder="Enter Your Email" onChange={(e) => { this.setState({ email: e.target.value }) }} required />
                    <h6 className="section-sub-title onboardFormText">Password</h6>
                    <input className="form-control m-2" type="password" placeholder="Enter Your Password" onChange={(e) => { this.setState({ password: e.target.value }) }} required />
                    <Button type="submit" className="btn btn-block m-2 site-btn-login">Login</Button>
                    {/* <Button className="btn btn-block m-2 site-btn-login"> Sign In </Button> */}
                    <br />
                    <hr />
                    <p className='text-center'>
                      <b>Forget My Password?</b>
                      <Link to="/forget">
                        <b> Forget Password </b>
                      </Link>
                    </p>
                    {this.state.message && (
                      <div className="text-center text-danger">
                        {this.state.message}
                      </div>
                    )}
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

export default UserLogin;
