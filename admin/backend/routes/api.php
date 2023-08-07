<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\VisitorController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\SiteInfoController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\AuthorsController;
use App\Http\Controllers\Admin\PeriodController;
use App\Http\Controllers\Admin\ProductListController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\ProductDetailsController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ForgetController;
use App\Http\Controllers\User\ResetController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\ProductCartController;
use App\Http\Controllers\Admin\FavouriteController;
use App\Http\Controllers\Admin\OrderListByInvoiceController;
use App\Http\Controllers\Admin\ExtendOrderController;
use App\Http\Controllers\Admin\ReturnOrderController;
use App\Http\Controllers\StripePaymentController;



// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Login Routes 
Route::post('/login',[AuthController::class, 'Login']);

// Register Routes 
Route::post('/register',[AuthController::class, 'Register']);

// Profile Routes 
Route::post('/profilepic',[UserController::class, 'UserProfileStore']);


 // Forget Password Routes 
Route::post('/forgetpassword',[ForgetController::class, 'ForgetPassword']);

 // Reset Password Routes 
Route::post('/resetpassword',[ResetController::class, 'ResetPassword']);

 // Current User Route 
Route::get('/user',[UserController::class, 'User'])->middleware('auth:api');

//Get Visitor
Route::get('/getvisitor',[VisitorController::class,'GetVisitorDetails']);
//Contact Page 
Route::post('/postcontact',[ContactController::class,'PostContactDetails']);
//All site info Page 
Route::get('/allsiteinfo',[SiteInfoController::class,'AllSiteInfo']);

Route::get('/allcategory',[CategoryController::class,'AllCategory']);

Route::get('/allauthors',[AuthorsController::class,'AllAuthors']);


Route::get('/allperiod',[PeriodController::class,'AllPeriod']);

Route::get('/productlistbyremark/{remark}',[ProductListController::class,'ProductListByRemark']);

Route::get('/productlistbycategory/{category}',[ProductListController::class,'ProductListByCategory']);

Route::get('/productlistbycategory/{category}',[ProductListController::class,'ProductListByCategory']);

Route::get('/productlistbysubcategory/{category}/{subcategory}',[ProductListController::class,'ProductListBySubcategory']);

Route::get('/productlistbyauthor/{author}',[ProductListController::class,'ProductListByAuthor']);

Route::get('/allslider',[SliderController::class,'AllSlider']);

Route::get('/productdetails/{id}',[ProductDetailsController::class,'ProductDetails']);

Route::get('/notification',[NotificationController::class,'NotificationDetails']);

Route::get('/search/{key}',[ProductListController::class,'ProductBySearch']);

// Similar Product Route
Route::get('/similar/{subcategory}',[ProductListController::class, 'SimilarProduct']);



// Product Cart Route
Route::post('/addtocart',[ProductCartController::class, 'addToCart']);

// Cart Count Route
Route::get('/cartcount/{email}',[ProductCartController::class, 'CartCount']);

// Cart List Route 
Route::get('/cartlist/{email}',[ProductCartController::class, 'CartList']);
Route::get('/isProductInCart', [ProductCartController::class, 'isProductInCart']);
Route::get('/removecartlist/{id}',[ProductCartController::class, 'RemoveCartList']);

Route::post('/cartorder',[ProductCartController::class, 'CartOrder']);


Route::get('/orderlistbyuser/{email}',[ProductCartController::class, 'OrderListByUser']);
Route::get('/orderlistbyinvoice/{invoice_no}',[OrderListByInvoiceController::class, 'getOrderHistory']);



Route::post('/postreview',[ReviewController::class, 'PostReview']);

// Review Product Route
Route::get('/reviewlist/{ISBN}',[ReviewController::class, 'ReviewList']);

Route::get('/favourite/{ISBN}/{email}',[FavouriteController::class, 'AddFavourite']);

Route::get('/favouritelist/{email}',[FavouriteController::class, 'FavouriteList']);

Route::get('/favouriteremove/{ISBN}/{email}',[FavouriteController::class, 'FavouriteRemove']);

Route::post('/extendorder',[ExtendOrderController::class, 'ExtendOrder']);

Route::get('/extendorderlist/{email}',[ExtendOrderController::class, 'ExtendOrderHistory']);
Route::get('/extendorderinvoice/{extend_invoice_no}',[ExtendOrderController::class, 'getExtendOrder']);

Route::post('/returnorder',[ReturnOrderController::class, 'ReturnOrder']);

Route::get('/returnorderlist/{email}',[ReturnOrderController::class, 'getReturnHistory']);

Route::get('/returnlistbyinvoice/{invoice_no}',[ReturnOrderController::class, 'getReturnOrder']);

Route::get('/calculate_fine', [ProductCartController::class, 'calculateFine']);

