<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductCart;
use App\Models\ProductList;
use App\Models\CartOrder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Carbon\Carbon;


class ProductCartController extends Controller
{

   
    public function addToCart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'ISBN' => 'required|string',
            'startDate' => 'required|date',
            'endDate' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], Response::HTTP_BAD_REQUEST);
        }

        $email = $request->input('email');
        $ISBN = $request->input('ISBN');
        $product_start_date = $request->input('startDate');
        $product_end_date = $request->input('endDate');

        $cartDetails = ProductList::where('ISBN', $ISBN)->get();

        if (count($cartDetails) > 0) {
            $result = ProductCart::insert([
                'email' => $email,
                'image' => $cartDetails[0]['image'],
                'product_name' => $cartDetails[0]['title'],
                'ISBN' => $cartDetails[0]['ISBN'],
                'product_price' => $cartDetails[0]['price'],
                'product_period' => $cartDetails[0]['period'],
                'product_start_date' => $product_start_date,
                'product_end_date' => $product_end_date,
            ]);

            return $result;
        } else {
            return response()->json(['error' => 'Product not found.'], Response::HTTP_NOT_FOUND);
        }
    }
   
  // End Method

  public function isProductInCart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'ISBN' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], Response::HTTP_BAD_REQUEST);
        }

        $email = $request->input('email');
        $ISBN = $request->input('ISBN');

        $cartItem = ProductCart::where('email', $email)->where('ISBN', $ISBN)->first();

        if ($cartItem) {
            // Product is already in the cart
            return response()->json(1);
        } else {
            // Product is not in the cart
            return response()->json(0);
        }
    }

  public function CartCount($email)
  {
      if ($email) {
          $userCartCount = ProductCart::where('email', $email)->count();
          return response()->json($userCartCount);
      } else {
          // Handle the case when the email is not provided or invalid
          return response()->json(0);
      }
  } 

    public function CartList(Request $request){

        $email = $request->email;
        $result = ProductCart::where('email',$email)->get();
        return $result;

    } // End Method 

    public function RemoveCartList(Request $request){

        $id = $request->id;
        $result = ProductCart::where('id',$id)->delete();
        return $result;

    }// End Method 

    public function CartOrder(Request $request){

        $city = $request->input('city');
        $paymentMethod = $request->input('payment_method');
        $yourName = $request->input('name');
        $email = $request->input('email');
       
        $DeliveryAddress = $request->input('delivery_address');
        $invoice_no = $request->input('invoice_no');
        $DeliveryCharge = $request->input('delivery_charge');

        date_default_timezone_set("Europe/London");
        $request_time = date("h:i:sa");
        $request_date = date("d-m-Y");

        $CartList = ProductCart::where('email',$email)->get();
        
        foreach($CartList as $CartListItem){
            $cartInsertDeleteResult = ""; 

            $resultInsert = CartOrder::insert([
                'invoice_no' => "RBM".$invoice_no,
                'product_name' => $CartListItem['product_name'],
                'ISBN' => $CartListItem['ISBN'],
                'rental_start_date' => $CartListItem['product_start_date'],
                'rental_end_date' => $CartListItem['product_end_date'],
                'rental_period' => $CartListItem['product_period'],
                'price' => $CartListItem['product_price'],
                'email' => $email,
                'name' => $yourName,
                'payment_method' => $paymentMethod,
                'delivery_address' => $DeliveryAddress,
                'city' => $city,
                'delivery_charge' => $DeliveryCharge,
                'order_date' => $request_date,
                'order_time' => $request_time,
                'order_status' => "Pending",
            ]);

            if ($resultInsert==1) {
               $resultDelete = ProductCart::where('id',$CartListItem['id'])->delete();
               if ($resultDelete==1) {
                   $cartInsertDeleteResult=1;
               }else{
                   $cartInsertDeleteResult=0;
               }
            }

        }
            return $cartInsertDeleteResult;

    }// End Method 

    public function OrderListByUser(Request $request){
        $email = $request->email;
        $result = CartOrder::where('email',$email)->orderBy('id','DESC')->get();
        return $result;

    }// End Method 

    public function calculateFine($rental_end_date, $extend_end_date, $price)
    {
        $today = Carbon::today();

        // Check if the product is extended or not
        if ($extend_end_date) {
            // Calculate fine based on extended_end_date
            $extendedEnd = Carbon::parse($extend_end_date);
            $daysLate = $today->diffInDays($extendedEnd, false);

            if ($daysLate > 0) {
                // Calculate fine as days * (price * 25%)
                $fine = $daysLate * ($price * 0.25);
                return $fine;
            }
        } else {
            // Calculate fine based on rental_end_date
            $rentalEnd = Carbon::parse($rental_end_date);
            $daysLate = $today->diffInDays($rentalEnd, false);

            if ($daysLate > 0) {
                // Calculate fine as days * (price * 25%)
                $fine = $daysLate * ($price * 0.25);
                return $fine;
            }
        }

        // If daysLate is less than or equal to 0, no fine
        return 0;
    }


    
    public function PendingOrder(){

        $orders = CartOrder::where('order_status','Pending')->orderBy('id','DESC')->get();
        return view('backend.orders.pending_orders',compact('orders'));

    } // End Method 
    public function ProcessingOrder(){

        $orders = CartOrder::where('order_status','Processing')->orderBy('id','DESC')->get();
        return view('backend.orders.processing_orders',compact('orders'));

    } // End Method 


        public function CompleteOrder(){

        $orders = CartOrder::where('order_status','Delivered')->orderBy('id','DESC')->get();
        return view('backend.orders.complete_orders',compact('orders'));

    } // End Method 
    public function OrderDetails($id){

        $order = CartOrder::findOrFail($id);
        return view('backend.orders.order_details',compact('order'));


    } // End Method

    public function PendingToProcessing($id){

        CartOrder::findOrFail($id)->update(['order_status' => 'Processing']);
    
         $notification = array(
                'message' => 'Order Processing Successfully',
                'alert-type' => 'success'
            );
    
            return redirect()->route('pending.order')->with($notification);
    
        } // End Method 
        public function ProcessingToComplete($id){

            CartOrder::findOrFail($id)->update(['order_status' => 'Delivered']);
        
             $notification = array(
                    'message' => 'Order Complete Successfully',
                    'alert-type' => 'success'
                );
        
                return redirect()->route('processing.order')->with($notification);
        
            } // End Method 
    
        public function getTotalOrders()
        {
            $totalOrders = CartOrder::count();
            return $totalOrders;
        }
    
        public function showAdminDashboard()
        {
            $totalOrders = $this->getTotalOrders();
            return view('admin.index', compact('totalOrders'));
        }
        

}






