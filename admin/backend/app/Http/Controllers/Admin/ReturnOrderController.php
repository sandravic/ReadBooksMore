<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ReturnOrders;
use App\Models\CartOrder;
use App\Models\ExtendOrders;

class ReturnOrderController extends Controller
{
    public function ReturnOrder(Request $request)
    {
        $request->validate([
            'ISBN' => 'required',
            'email' => 'required|email',
            'invoice_no' => 'required',
            'product_name' => 'required',
            'from_address' => 'required',
            
            'contact_number' => 'required',
            'reference_number' => 'required',
        ]);
        $from_address = $request->input('from_address');
        $return_address = $request->input('return_address');
        $contact_number = $request->input('contact_number');
        $reference_number = $request->input('reference_number');

        date_default_timezone_set("Europe/London");
        $request_time = date("h:i:sa");
        $request_date = date("d-m-Y");
     
        $resultInsert = ReturnOrders::insert([
            'ISBN' => $request->ISBN,
            
            'email' => $request->email,
            'invoice_no' => $request->invoice_no,
            'extend_invoice_no' => $request->extend_invoice_no,
            'product_name' => $request->product_name,
            'from_address' => $from_address,
            'return_address' => $return_address,
            'contact_number' => $contact_number,
            'reference_number' => $reference_number,
            'return_date' => $request_date,
            'return_time' => $request_time,
            'return_status' => "Return Initiated",
           
        ]);

        if ($resultInsert) {
            // Update other_status to 'returned' in CartOrder table based on invoice_no and ISBN
            CartOrder::where('invoice_no', $request->invoice_no)
                     ->where('ISBN', $request->ISBN)
                     ->update(['other_status' => 'returned']);
            ExtendOrders::where('extend_invoice_no', $request->extend_invoice_no)
                     ->where('ISBN', $request->ISBN)
                     ->update(['other_status' => 'returned']);
            return 1;
        } else {
            return 0;
        }
    }

    public function getReturnHistory(Request $request)
    {
        $email = $request->email;
        $result = ReturnOrders::where('email', $email)->orderBy('id', 'DESC')->get();
        return $result;
    }
    public function getReturnOrder(Request $request)
    {
        $invoice_no = $request->invoice_no;
        $returnOrder = ReturnOrders::where('invoice_no', $invoice_no)->get();
        return response()->json($returnOrder);
    }

    public function PendingReturnOrder(){

        $returns = ReturnOrders::where('return_status','Return Initiated')->orderBy('id','DESC')->get();
        return view('backend.return.pending_returnorders',compact('returns'));

    } // End Method 
    public function ProcessingReturnOrder(){

        $returns = ReturnOrders::where('return_status','Checking')->orderBy('id','DESC')->get();
        return view('backend.return.processing_returnorders',compact('returns'));

    } // End Method 


        public function CompleteReturnOrder(){

        $returns = ReturnOrders::where('return_status','Book Received')->orderBy('id','DESC')->get();
        return view('backend.return.complete_returnorders',compact('returns'));

    } // End Method 
    public function ReturnOrderDetails($id){

        $returns = ReturnOrders::findOrFail($id);
        return view('backend.return.returnorder_details',compact('returns'));


    } // End Method

    public function PendingToProcessingReturn($id){

        ReturnOrders::findOrFail($id)->update(['return_status' => 'Checking']);
    
         $notification = array(
                'message' => 'Checked Return Order Successfully',
                'alert-type' => 'success'
            );
    
            return redirect()->route('return_pending.returns')->with($notification);
    
        } // End Method 
    
        public function ProcessingToCompleteReturn($id){

            ReturnOrders::findOrFail($id)->update(['return_status' => 'Book Received']);
        
             $notification = array(
                    'message' => ' Book Received Successfully',
                    'alert-type' => 'success'
                );
        
                return redirect()->route('return_processing.returns')->with($notification);
        
            } // End Method 





 }


