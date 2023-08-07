class AppURL {
     
     static BaseURL = "http://127.0.0.1:8000/api"
     static VisitorDetails = this.BaseURL+"/getvisitor"
     static PostContact = this.BaseURL+"/postcontact"
     static AllSiteInfo = this.BaseURL+"/allsiteinfo"
     static AllCategoryDetails = this.BaseURL+"/allcategory"
     static AllAuthorsDetails = this.BaseURL+"/allauthors"

     static ProductListByRemark(Remark){
          return this.BaseURL+"/productlistbyremark/"+Remark;
     }

     static ProductListByCategory(category){
          return this.BaseURL+"/productlistbycategory/"+category;
     }

     static ProductListBySubCategory(category,subcategory){
          return this.BaseURL+"/productlistbysubcategory/"+category+"/"+subcategory;
     }
     static ProductListByAuthor(author){
          return this.BaseURL+"/productlistbyauthor/"+author;
     }
     static AllSlider = this.BaseURL+"/allslider"


     static ProductDetails(code){
          return this.BaseURL+"/productdetails/"+code;
     }

     static NotificationDetails = this.BaseURL+"/notification"

     static ProductBySearch(searchkey){
          return this.BaseURL+"/search/"+searchkey;
     }
     static UserLogin = this.BaseURL+"/login"

     static UserData = this.BaseURL+"/user"
     static UserProfileStore = this.BaseURL+"/profilepic"

     static UserRegister = this.BaseURL+"/register"
    

     static UserForgetPassword = this.BaseURL+"/forgetpassword"

     static UserResetPassword = this.BaseURL+"/resetpassword"


     static SimilarProduct(code){
          return this.BaseURL+"/similar/"+code;
     }
     

     static addToCart = this.BaseURL+"/addtocart"
     static isProductInCart = this.BaseURL+"/isProductInCart"

     static CartCount(ISBN){
          return this.BaseURL+"/cartcount/"+ISBN;
     }
     static CartList(email){
          return this.BaseURL+"/cartlist/"+email;
     }
     static RemoveCartList(id){
          return this.BaseURL+"/removecartlist/"+id;
     }
     static CartOrder = this.BaseURL+"/cartorder"
     static ExtendOrder = this.BaseURL+"/extendorder"
     static ReturnOrder = this.BaseURL+"/returnorder"

     static handleCheckoutSuccess = this.BaseURL + "/checkout/success";
     static handleCheckoutCancel = this.BaseURL + "/checkout/cancel";


     static OrderListByUser(email){
          return this.BaseURL+"/orderlistbyuser/"+email;
     }
     static ExtendOrderHistory(email){
          return this.BaseURL+"/extendorderlist/"+email;
     }
     static getOrderHistory(invoice_no){
          return this.BaseURL+"/orderlistbyinvoice/"+invoice_no;
     }
     static getReturnHistory(email){
          return this.BaseURL+"/returnorderlist/"+email;
     }
     static getReturnOrder(invoice_no){
          return this.BaseURL+"/returnlistbyinvoice/"+invoice_no;
     }
     static getExtendOrder(extend_invoice_no){
          return this.BaseURL+"/extendorderinvoice/"+extend_invoice_no;
     }
     static PostReview = this.BaseURL+"/postreview"

     static ReviewList(code){
          return this.BaseURL+"/reviewlist/"+code;
     }
     static AddFavourite(ISBN,email){
          return this.BaseURL+"/favourite/"+ISBN+"/"+email;
     }
     static FavouriteList(email){
          return this.BaseURL+"/favouritelist/"+email;
     }
     static FavouriteRemove(ISBN,email){
          return this.BaseURL+"/favouriteremove/"+ISBN+"/"+email;
     }


}

export default AppURL