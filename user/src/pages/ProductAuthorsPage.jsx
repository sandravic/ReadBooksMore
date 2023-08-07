import React, { Component } from 'react'
import { Fragment } from 'react'
import AppURL from '../api/AppURL'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import Author from '../components/ProductDetails/Author'
import axios from 'axios'

 class ProductAuthorsPage extends Component {

     constructor({match}){
          super();
          this.state={
               Author:match.params.author,
               ProductData:[] 
               
          }
     }

     componentDidMount(){
          window.scroll(0,0)
          
          axios.get(AppURL.ProductListByAuthor(this.state.Author)).then(response =>{
               
               this.setState({ProductData:response.data});         

          }).catch(error=>{

          });

     } 

     render() {
          return (
              <Fragment> 
               <div className="Desktop">
                <NavMenuDesktop /> 
               </div>

               <div className="Mobile">
               <NavMenuMobile />  
               </div>                       

               <Author Author={this.state.Author} ProductData={this.state.ProductData} /> 
               
               <div className="Desktop">
               <FooterDesktop/>
               </div>

               <div className="Mobile">
               <FooterMobile/>
               </div>
               
          </Fragment>
          )
     }
}

export default ProductAuthorsPage