<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController; 
use App\Http\Controllers\Admin\CategoryController; 
use App\Http\Controllers\Admin\AuthorsController; 
use App\Http\Controllers\Admin\SliderController; 
use App\Http\Controllers\Admin\ProductListController; 
use App\Http\Controllers\Admin\ContactController; 
use App\Http\Controllers\Admin\ReviewController; 
use App\Http\Controllers\Admin\SiteInfoController; 
use App\Http\Controllers\Admin\ProductCartController; 
use App\Http\Controllers\Admin\ExtendOrderController; 
use App\Http\Controllers\Admin\ReturnOrderController; 
use App\Http\Controllers\Admin\NotificationController; 
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
//     return view('admin.index');
// })->name('dashboard');


Route::middleware(['auth:sanctum', 'verified'])
    ->get('/dashboard', [AdminController::class, 'showAdminDashboard'])
    ->name('admin.dashboard');

 
  // Admin Logout Routes 
Route::get('/logout',[AdminController::class, 'AdminLogout'])->name('admin.logout');

Route::prefix('admin')->group(function(){

Route::get('/user/profile',[AdminController::class, 'UserProfile'])->name('user.profile');

Route::post('/user/profile/store',[AdminController::class, 'UserProfileStore'])->name('user.profile.store');

Route::get('/change/password',[AdminController::class, 'ChangePassword'])->name('change.password');

Route::post('/change/password/update',[AdminController::class, 'ChangePasswordUpdate'])->name('change.password.update');

});


Route::prefix('category')->group(function(){

    Route::get('/all',[CategoryController::class, 'GetAllCategory'])->name('all.category');


    Route::get('/add',[CategoryController::class, 'AddCategory'])->name('add.category');


    Route::post('/store',[CategoryController::class, 'StoreCategory'])->name('category.store');


    Route::get('/edit/{id}',[CategoryController::class, 'EditCategory'])->name('category.edit');


    Route::post('/update',[CategoryController::class, 'UpdateCategory'])->name('category.update');
 

    Route::get('/delete/{id}',[CategoryController::class, 'DeleteCategory'])->name('category.delete');
});

Route::prefix('author')->group(function(){

    Route::get('/all',[AuthorsController::class, 'GetAllAuthor'])->name('all.author');
    
    Route::get('/add',[AuthorsController::class, 'AddAuthor'])->name('add.author');
    
    Route::post('/store',[AuthorsController::class, 'StoreAuthor'])->name('author.store');
    
    Route::get('/edit/{id}',[AuthorsController::class, 'EditAuthor'])->name('author.edit');
    
    Route::post('/update',[AuthorsController::class, 'UpdateAuthor'])->name('author.update');
     
    Route::get('/delete/{id}',[AuthorsController::class, 'DeleteAuthor'])->name('author.delete');
});

Route::prefix('subcategory')->group(function(){

    Route::get('/all',[CategoryController::class, 'GetAllSubCategory'])->name('all.subcategory');
        
    Route::get('/add',[CategoryController::class, 'AddSubCategory'])->name('add.subcategory');
        
    Route::post('/store',[CategoryController::class, 'StoreSubCategory'])->name('subcategory.store');
        
    Route::get('/edit/{id}',[CategoryController::class, 'EditSubCategory'])->name('subcategory.edit');
        
    Route::post('/update',[CategoryController::class, 'UpdateSubCategory'])->name('subcategory.update');
         
    Route::get('/delete/{id}',[CategoryController::class, 'DeleteSubCategory'])->name('subcategory.delete');
});

Route::prefix('slider')->group(function(){

    Route::get('/all',[SliderController::class, 'GetAllSlider'])->name('all.slider');
    
    Route::get('/add',[SliderController::class, 'AddSlider'])->name('add.slider');
    
    Route::post('/store',[SliderController::class, 'StoreSlider'])->name('slider.store');
    
    Route::get('/edit/{id}',[SliderController::class, 'EditSlider'])->name('slider.edit');
    
    Route::post('/update',[SliderController::class, 'UpdateSlider'])->name('slider.update');
     
    Route::get('/delete/{id}',[SliderController::class, 'DeleteSlider'])->name('slider.delete');
 });

 Route::prefix('product')->group(function(){

    Route::get('/all',[ProductListController::class, 'GetAllProduct'])->name('all.product');
    
    Route::get('/add',[ProductListController::class, 'AddProduct'])->name('add.product');
    
    Route::post('/store',[ProductListController::class, 'StoreProduct'])->name('product.store');
    
    Route::get('/edit/{id}',[ProductListController::class, 'EditProduct'])->name('product.edit');
    
    Route::post('/update',[ProductListController::class, 'UpdateProduct'])->name('product.update');
     
    Route::get('/delete/{id}',[ProductListController::class, 'DeleteProduct'])->name('product.delete');
  

    Route::get('get/subcategory/{category_name}',[ProductListController::class, 'GetSubcate']);


 });

 Route::get('/all/message',[ContactController::class, 'GetAllMessage'])->name('contact.message');
 Route::get('/message/delete/{id}',[ContactController::class, 'DeleteMessage'])->name('message.delete');
 Route::get('/all/review',[ReviewController::class, 'GetAllReview'])->name('all.review');
 
 Route::get('/getsite/info',[SiteInfoController::class, 'GetSiteInfo'])->name('getsite.info');
 Route::post('/update/siteinfo',[SiteInfoController::class, 'UpdateSiteInfo'])->name('update.siteinfo');

 Route::prefix('order')->group(function(){

Route::get('/pending',[ProductCartController::class, 'PendingOrder'])->name('pending.order');
Route::get('/processing',[ProductCartController::class, 'ProcessingOrder'])->name('processing.order');

Route::get('/complete',[ProductCartController::class, 'CompleteOrder'])->name('complete.order');
Route::get('/details/{id}',[ProductCartController::class, 'OrderDetails'])->name('order.details');
Route::get('/status/processing/{id}',[ProductCartController::class, 'PendingToProcessing'])->name('pending.processing');

Route::get('/status/complete/{id}',[ProductCartController::class, 'ProcessingToComplete'])->name('processing.complete');
 // Add a new route for handling Stripe payment success


    });
    Route::prefix('extend')->group(function(){

    Route::get('/extend_pending',[ExtendOrderController::class, 'ExtendPendingOrder'])->name('extend_pending.extend');
    Route::get('/extend_processing',[ExtendOrderController::class, 'ExtendProcessingOrder'])->name('extend_processing.extend');
    
    Route::get('/extend_complete',[ExtendOrderController::class, 'ExtendCompleteOrder'])->name('extend_complete.extend');
    Route::get('/extend_details/{id}',[ExtendOrderController::class, 'ExtendOrderDetails'])->name('extend.extend_details');
    Route::get('/extend_status/extend_processing/{id}',[ExtendOrderController::class, 'ExtendPendingToProcessing'])->name('extend_pending.extend_processing');
    
    Route::get('/extend_status/extend_complete/{id}',[ExtendOrderController::class, 'ExtendProcessingToComplete'])->name('extend_processing.extend_complete');
     // Add a new route for handling Stripe payment success
    
        });
    Route::get('/index', [ProductCartController::class, 'showAdminDashboard'])->name('admin.index');

    Route::prefix('returns')->group(function(){

    Route::get('/return_pending',[ReturnOrderController::class, 'PendingReturnOrder'])->name('return_pending.returns');
    Route::get('/return_processing',[ReturnOrderController::class, 'ProcessingReturnOrder'])->name('return_processing.returns');
    
    Route::get('/return_complete',[ReturnOrderController::class, 'CompleteReturnOrder'])->name('return_complete.returns');
    Route::get('/return_details/{id}',[ReturnOrderController::class, 'ReturnOrderDetails'])->name('returns.return_details');
    Route::get('/return_status/return_processing/{id}',[ReturnOrderController::class, 'PendingToProcessingReturn'])->name('return_pending.return_processing');
    
    Route::get('/return_status/return_complete/{id}',[ReturnOrderController::class, 'ProcessingToCompleteReturn'])->name('return_processing.return_complete');
     // Add a new route for handling Stripe payment success
    
        });

Route::prefix('notifications')->group(function(){

    Route::get('/all',[NotificationController::class, 'GetAllNotification'])->name('all.notifications');
        
    Route::get('/add',[NotificationController::class, 'AddNotification'])->name('add.notifications');
        
    Route::post('/store',[NotificationController::class, 'StoreNotification'])->name('notifications.store');
        
    Route::get('/edit/{id}',[NotificationController::class, 'EditNotification'])->name('notifications.edit');
        
    Route::post('/update',[NotificationController::class, 'UpdateNotification'])->name('notifications.update');
         
    Route::get('/delete/{id}',[NotificationController::class, 'DeleteNotification'])->name('notifications.delete');
});