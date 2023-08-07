<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function NotificationDetails(){
        $result = Notification::get();
        return $result;
    }
    public function GetAllNotification(){
        $notifications = Notification::latest()->get();
             return view('backend.notifications.notifications_view',compact('notifications'));
     
         } //End Method 
     
     
         public function AddNotification(){
     
             $notifications = Notification::latest()->get();
              return view('backend.notifications.notifications_add',compact('notifications'));
         } //End Method 

    public function StoreNotification(Request $request){


        $request->validate([
            'title' => 'required',
        ],[
            'message.required' => 'Input Message'

        ],[
            'date' => 'required',
        ] );
   



        Notification::insert([
            'title' => $request->title,
            'message' => $request->message,
            'date' => $request->date,
        ]);

        $notification = array(
            'message' => 'Message Inserted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.notifications')->with($notification);

    } //End Method 

    public function EditNotification($id){

      
        $notifications = Notification::findOrFail($id);
        return view('backend.notifications.notifications_edit',compact('notifications'));

    } //End Method 

    public function UpdateNotification(Request $request){

        $notifications_id = $request->id;

        Notification::findOrFail($notifications_id)->update([
           
            'title' => $request->title,
            'message' => $request->message,
            'date' => $request->date,
        ]);

        $notification = array(
            'message' => 'Notification Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.notifications')->with($notification);

    } //End Method 

    public function DeleteNotification($id){

        Notification::findOrFail($id)->delete();
         $notification = array(
            'message' => 'Notification Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);

    } //End Method 
}

