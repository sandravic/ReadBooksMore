<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;

class UserController extends Controller
{
     public function User(){

        return Auth::user();
    } // End Mehtod

    public function UserProfile(){

        $profileData = User::find(1);
        return $profileData;
    } // end mehtod 


    public function UserProfileStore(Request $request){
        // get the authenticated user
        $data = auth()->user();
    
       
        $data->email = $request->email;
    
        if ($request->file('profile_photo_path')) {
            $file = $request->file('profile_photo_path');
            @unlink(public_path('upload/profile/'.$data->profile_photo_path));
            $filename = date('YmdHi').$file->getClientOriginalName();
            $file->move(public_path('upload/profile'),$filename);
            $data['profile_photo_path'] = $filename;
        }
        $data->save();
    
        // Return response with the profile picture URL
        return response()->json([
            'message' => 'Profile updated successfully',
            'profile_photo_path' => $data['profile_photo_path']
        ], 200);
    } // end method
    
    
    
}