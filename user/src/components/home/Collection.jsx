import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

class Collection extends Component {
     render() {
          return (
               <Fragment>
                    <Container className="text-center " fluid={true}>
                         <div className="featured-book"><h2 style={{ fontWeight: 900 }}> HOW TO RENT BOOKS </h2>
                              <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                   labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                   laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                   voluptate velit esse cillum dolore eu fugiat nulla pariatur."</p>
                                   </div>
                              <Row >

                                   <Col className="p-3" xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <div className="mx-auto text-white">
                                             <span className="fa-stack fa-2x">
                                                  <i className="fa fa-circle fa-stack-2x text-warning"></i>
                                                  <i className="fa fa-search fa-stack-1x text-white"></i>
                                             </span>
                                        </div>
                                        <p className="font-weight-600 my-1">Find your book</p>
                                        <p className="text-black-600 mb-0">To rent a book, enter its ISBN or title in the search field.
                                             Choose a suitable rental period: 35, 60, 90 days, or longer.</p>

                                   </Col>
                                   <Col className="p-3" xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <div className="mx-auto text-white">
                                             <span className="fa-stack fa-2x">
                                                  <i className="fa fa-circle fa-stack-2x text-danger"></i>
                                                  <i className="fa fa-truck fa-stack-1x text-white"></i>
                                             </span>
                                        </div>
                                        <p className="font-weight-600 my-1">Choose your shipping</p>
                                        <p className="text-black-600 mb-0">To rent a book, enter its ISBN or title in the search field.
                                             Choose a suitable rental period: 35, 60, 90 days, or longer.</p>

                                   </Col>
                                   <Col className="p-3" xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <div className="mx-auto text-white">
                                             <span className="fa-stack fa-2x">
                                                  <i className="fa fa-circle fa-stack-2x text-success"></i>
                                                  <i className="fa fa-clock fa-stack-1x text-white"></i>
                                             </span>
                                        </div>
                                        <p className="font-weight-600 my-1">Extend or Return your book rental</p>
                                        <p className="text-black-600 mb-0">To rent a book, enter its ISBN or title in the search field.
                                             Choose a suitable rental period: 35, 60, 90 days, or longer.</p>

                                   </Col>
                              </Row>




                        


                    </Container>
               </Fragment>
          )
     }
}

export default Collection
