<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function PostContactDetails(Request $request){
        $name = $request ->input('name');
        $email = $request ->input('email');
        $mobile_number = $request ->input('mobile_number');
        $message = $request ->input('message');
        date_default_timezone_set('Europe/London');
        $contact_time = date("h:i:sa");
        $contact_date = date("d-m-y");

        $result = Contact::insert([
            'name' => $name,
            'email' => $email,
            'mobile_number' => $mobile_number,
            'message' => $message,
            'contact_time' => $contact_time,
            'contact_date' => $contact_date
        ]);
        return $result;



    }//End Method

    public function GetAllMessage(){

        $message = Contact::latest()->get();
        return view('backend.contact.contact_all', compact('message'));

    } // End Method

    public function DeleteMessage($id){

        Contact::findOrFail($id)->delete();

         $notification = array(
            'message' => 'Message Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);


    }// End Method
}
