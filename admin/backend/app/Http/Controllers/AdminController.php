<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\User;
use App\Models\CartOrder;
use App\Models\ReturnOrders;
use App\Models\Visitor;
use App\Models\Contact;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function AdminLogout(){

        Auth::logout();
        return Redirect()->route('login');

    } // end mehtod 


    public function UserProfile(){

        $adminData = User::find(1);
        return view('backend.admin.admin_profile',compact('adminData'));

    } // end mehtod 


    public function UserProfileStore(Request $request){

        $data = User::find(1);
        $data->name = $request->name;
        $data->email = $request->email;

        if ($request->file('profile_photo_path')) {
            $file = $request->file('profile_photo_path');
            @unlink(public_path('upload/admin_images/'.$data->profile_photo_path));
            $filename = date('YmdHi').$file->getClientOriginalName();
            $file->move(public_path('upload/admin_images'),$filename);
            $data['profile_photo_path'] = $filename;
        }
        $data->save();

        $notification = array(
            'message' => 'User Profile Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('user.profile')->with($notification);

    } // end mehtod 



    public function ChangePassword(){
        return view('backend.admin.change_password');
    } // end mehtod 


    public function ChangePasswordUpdate(Request $request){

        $validateData = $request->validate([
            'oldpassword' => 'required',
            'password' => 'required|confirmed'
        ]);

        $hashedPassword = User::find(1)->password;
        if (Hash::check($request->oldpassword,$hashedPassword)) {
            $user = User::find(1);
            $user->password = Hash::make($request->password);
            $user->save();
            Auth::logout();

            return redirect()->route('admin.logout');
        }
        else{
            return redirect()->back();
        }

    } // end mehtod 

    public function showAdminDashboard()
    {
        // Fetch the necessary data from the database or any other source
        $totalOrders = CartOrder::select('id')->get();
        $torder =count($totalOrders);
        $totalReturn = ReturnOrders::select('id')->get();
        $treturn =count($totalReturn);
        $totalVisitor = Visitor::select('id')->get();
        $tvisitor =count($totalVisitor);
        $totalmessage = Contact::select('id')->get();
        $tmessage =count($totalmessage);

        $orderDetails = CartOrder::select('id',  'product_name', 'ISBN', 'price', 'email', 'name', 'order_date',
         'order_time','order_status')
           ->get();
        
        // Pass the data to the Blade template
        return view('admin.index', compact('torder','treturn','tvisitor','tmessage','orderDetails'));
        
    }





}
 