<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;use App\Models\ProductList;
use App\Models\Favourites;



class FavouriteController extends Controller
{
    public function AddFavourite(Request $request){

        $ISBN = $request->ISBN;
        $email = $request->email;
        $productDetails = ProductList::where('ISBN',$ISBN)->get();

        $result = Favourites::insert([

            'product_name' => $productDetails[0]['title'],
            'image' => $productDetails[0]['image'],
            'ISBN' => $ISBN,
            'email' => $email,           

        ]);
        return $result;

    } // End Mehtod 
    public function FavouriteList(Request $request){

        $email = $request->email;
        $result = Favourites::where('email',$email)->get();
        return $result;

    }// End Mehtod 

    public function FavouriteRemove(Request $request){
        
        $ISBN = $request->ISBN;
        $email = $request->email;

        $result = Favourites::where('ISBN',$ISBN)->where('email',$email )->delete();
        return $result;

    }// End Mehtod 

   

}
