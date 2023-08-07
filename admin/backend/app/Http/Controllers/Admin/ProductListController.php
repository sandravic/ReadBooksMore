<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductList;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Authors;
use App\Models\ProductDetails;
use Image;

class ProductListController extends Controller
{
    public function ProductListByRemark(Request $request){
        $remark = $request->remark;
        $productlist = ProductList::where('remark',$remark)->get();
        return $productlist;

    }
    public function ProductListByCategory(Request $request){
        $category = $request->category;
        $productlist = ProductList::where('category',$category)->get();
        return $productlist;

    }
    public function ProductListBySubcategory(Request $request){
        $category = $request->category;
        $subcategory = $request->subcategory;
        $productlist = ProductList::where('category',$category)->where('subcategory',$subcategory)->get();
        return $productlist;

    }
    public function ProductListByAuthor(Request $request){
        $author = $request->author;
        $productlist = ProductList::where('author',$author)->get();
        return $productlist;

    }
    
    public function ProductBySearch(Request $request){

        $key = trim($request->key); 
        $productlist = ProductList::where('title','LIKE',"%{$key}%")->orWhere('category','LIKE',"%{$key}%")->orWhere('subcategory','LIKE',"%{$key}%")->orWhere('ISBN','LIKE',"%{$key}%")->get();
        return $productlist;

    }// End Method 

    
    public function SimilarProduct(Request $request){
        $subcategory = $request->subcategory;
        $productlist = ProductList::where('subcategory',$subcategory)->orderBy('id','desc')->limit(6)->get();
        return $productlist;

    }// End Method 

   public function GetAllProduct(){

        $products = ProductList::latest()->paginate(10);
        return view('backend.product.product_all',compact('products'));

    } // End Method 

    public function AddProduct(){

        $category = Category::orderBy('category_name','ASC')->get();
        $subcategory = Subcategory::orderBy('subcategory_name','ASC')->get();
        $author = Authors::orderBy('authors_name','ASC')->get();
        return view('backend.product.product_add',compact('category','subcategory','author'));

    } // End Method 

    public function StoreProduct(Request $request){

        $request->validate([
           'ISBN' => 'required',
       ],[
           'ISBN.required' => 'Input ISBN '

       ]);

       $image = $request->file('image');
       $name_gen = hexdec(uniqid()).'.'.$image->getClientOriginalExtension();
       Image::make($image)->resize(711,960)->save('upload/product/'.$name_gen);
       $save_url = 'http://127.0.0.1:8000/upload/product/'.$name_gen;

       $product_id = ProductList::insertGetId([
           'title' => $request->title,
           'price' => $request->price,
           'image' => $save_url, 
           'category' => $request->category,
           'subcategory' => $request->subcategory_name,
           'remark' => $request->remark,
           'author' => $request->author,
           'period' => $request->period,
           'ISBN' => $request->ISBN,
           'quantity' => $request->quantity,
           'book_status' => $request->book_status,
           'shipping_details' => $request->shipping_details,
          

       ]);

       /////// Insert Into Product Details Table ////// 

        ProductDetails::insert([
            'product_id' => $product_id,
            // 'size' =>  $request->size,
            'description' => $request->description,

        ]);


        $notification = array(
            'message' => 'Product Inserted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.product')->with($notification);


    } // End Method 

    public function GetSubcate($category_name) {
        $cat = SubCategory::where('category_name', $category_name)->get();
        return json_encode($cat);
        // using route model binding
    }

    public function EditProduct($id){

        $category = Category::orderBy('category_name','ASC')->get();
        $subcategory = Subcategory::orderBy('subcategory_name','ASC')->get();
        $author = Authors::orderBy('authors_name','ASC')->get();
        $product = ProductList::findOrFail($id);
        $details = ProductDetails::where('product_id',$id)->get();
        return view('backend.product.product_edit',compact('category','subcategory','author','product','details'));

    } // End Method 

  

        public function UpdateProduct(Request $request)
        {
            $product_id = $request->id;
            if ($request->file('image')) {
                $image = $request->file('image');
                $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
                Image::make($image)->resize(711,960)->save('upload/product/'.$name_gen);
                $save_url = 'http://127.0.0.1:8000/upload/product/' . $name_gen;
        
            // Update ProductList
            $productList = ProductList::findOrFail($product_id);
            $productList->update([
                'title' => $request->title,
                'price' => $request->price,
                'category' => $request->category,
                'subcategory' => $request->subcategory_name,
                'remark' => $request->remark,
                'author' => $request->author,
                'period' => $request->period,
                'ISBN' => $request->ISBN,
                'quantity' => $request->quantity,
                'book_status' => $request->book_status,
                'shipping_details' => $request->shipping_details,
                'image' => $save_url,
            ]);
        
            // Update ProductDetails
            $productDetails = ProductDetails::where('product_id', $product_id)->first();
            $productDetails->update([
                'description' => $request->description,
            ]);
        
            $notification = array(
                'message' => 'Product Updated Successfully' . ($request->file('image') ? '' : ' without image'),
                'alert-type' => 'success'
            );
        } else {
             // Update ProductList
             $productList = ProductList::findOrFail($product_id);
             $productList->update([
                 'title' => $request->title,
                 'price' => $request->price,
                 'category' => $request->category,
                 'subcategory' => $request->subcategory_name,
                 'remark' => $request->remark,
                 'author' => $request->author,
                 'period' => $request->period,
                 'ISBN' => $request->ISBN,
                 'quantity' => $request->quantity,
                 'book_status' => $request->book_status,
                 'shipping_details' => $request->shipping_details,
                
             ]);
         
             // Update ProductDetails
             $productDetails = ProductDetails::where('product_id', $product_id)->first();
             $productDetails->update([
                 'description' => $request->description,
             ]);
         
             $notification = array(
                 'message' => 'Product Updated without Image Successfully',
                 'alert-type' => 'success'
             );
        }
            return redirect()->route('all.product')->with($notification);
        }

     
    } 


