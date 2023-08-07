<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CartOrder;

class OrderListByInvoiceController extends Controller
{
    public function getOrderHistory(Request $request)
    {
        $invoice_no = $request->invoice_no;
       
        $orderHistory = CartOrder::where('invoice_no',$invoice_no)->get();

      
          
        return response()->json($orderHistory);
    }
}
