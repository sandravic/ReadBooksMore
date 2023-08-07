<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ExtendOrders;
use App\Models\CartOrder;

class ExtendOrderController extends Controller
{
    public function ExtendOrder(Request $request)
    {
        $email = $request->input('email');
        $ISBN = $request->input('ISBN');
        $invoice_no = $request->input('invoice_no');
        $product_name = $request->input('product_name');
       
        $extend_start_date = date('Y-m-d', strtotime($request->input('extend_start_date')));
        $extend_end_date = date('Y-m-d', strtotime($request->input('extend_end_date')));
    
        $extend_price = $request->input('extend_price');
        $extend_invoice_no = "ERBM" . $request->input('invoice_no'); // Make sure to set the correct invoice_no format

        // Insert extended order into the database
        $resultInsert = ExtendOrders::insert([
            'email' => $email,
            'ISBN' => $ISBN,
            'product_name' => $product_name,
            'cart_order_id' => $invoice_no,
            'extend_invoice_no' => $extend_invoice_no,
            'extend_start_date' => $extend_start_date,
            'extend_end_date' => $extend_end_date,
            'extend_price' => $extend_price, // Use the correct key here
            'order_date' => date('d-m-Y'),
            'order_time' => date('h:i:sa'),
            'order_status' => "pending",
             // Make sure to use the correct column name
        ]);

        
        if ($resultInsert) {
            // Update other_status to 'extend' in CartOrder table based on invoice_no and ISBN
            CartOrder::where('invoice_no', $invoice_no)
    ->where('ISBN', $ISBN)
    ->update(['other_status' => 'extend', 'extend_end_date' => $extend_end_date]);

            return 1;
        } else {
            return 0;
        }
    }

    public function ExtendOrderHistory(Request $request)
    {
        $email = $request->email;
        $result = ExtendOrders::where('email', $email)->orderBy('id', 'DESC')->get();
        return $result;
    }

    public function getExtendOrder(Request $request)
    {
        $extend_invoice_no = $request->extend_invoice_no;
        $extendOrder = ExtendOrders::where('extend_invoice_no', $extend_invoice_no)->get();
        return response()->json($extendOrder);
    }

    public function ExtendPendingOrder()
    {
        $extend = ExtendOrders::where('order_status', 'Pending')->orderBy('id', 'DESC')->get();
        return view('backend.extend.pending_extend_orders', compact('extend'));
    }

    public function ExtendProcessingOrder()
    {
        $extend = ExtendOrders::where('order_status', 'Processing')->orderBy('id', 'DESC')->get();
        return view('backend.extend.processing_extend_orders', compact('extend'));
    }

    public function ExtendCompleteOrder()
    {
        $extend = ExtendOrders::where('order_status', 'Complete')->orderBy('id', 'DESC')->get();
        return view('backend.extend.complete_extend_orders', compact('extend'));
    }

    public function ExtendOrderDetails($id)
    {
        $extend = ExtendOrders::findOrFail($id);
        return view('backend.extend.extend_order_details', compact('extend'));
    }

    public function ExtendPendingToProcessing($id)
    {
        ExtendOrders::findOrFail($id)->update(['order_status' => 'Processing']);

        $notification = array(
            'message' => 'Extend Order Processing Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('extend_pending.extend')->with($notification);
    }

    public function ExtendProcessingToComplete($id)
    {
        ExtendOrders::findOrFail($id)->update(['order_status' => 'Complete']);

        $notification = array(
            'message' => 'Order Complete Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('extend_processing.extend')->with($notification);
    }
}
