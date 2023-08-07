import React, { Component } from 'react'
import {Container} from 'react-bootstrap'

class FeaturedLoading extends Component {
     render() {
          let isLoading = this.props.isLoading; 

          return (
               <div className={isLoading}>

<Container className="text-center" fluid={true}>
<div className="featured-book"><h2>OUR BEST RENTAL BOOKS </h2>
          <p>Top Rental Books in Our Collection, You May Like</p>
          </div>

               <div className="row">

               <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                               <div className="ph-picture"></div>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>



                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                               <div className="ph-picture"></div>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>



                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                               <div className="ph-picture"></div>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>



                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                               <div className="ph-picture"></div>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>



                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                               <div className="ph-picture"></div>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>



                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                               <div className="ph-picture"></div>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                   

               </div>
               {/* // end row div */}
               </Container>
               </div>
          )
     }
}

export default FeaturedLoading
