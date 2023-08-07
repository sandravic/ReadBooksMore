<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SiteInfo;

class SiteInfoController extends Controller
{
   public function AllSiteInfo(){
    $result = SiteInfo::get();
    return $result;

   }
   public function GetSiteInfo(){

      $siteinfo = SiteInfo::find(1);
      return view('backend.siteinfo.siteinfo_update',compact('siteinfo'));

  } // End Method
  public function UpdateSiteInfo(Request $request){

   $siteinfo_id = $request->id;

   SiteInfo::findOrFail($siteinfo_id)->update([
       'about' => $request->about,
       'refund' => $request->refund,
       'purchase_guide' => $request->purchase_guide,
       'privacy' => $request->privacy,
       'address' => $request->address,
       'process_steps' => $request->process_steps,
       'facebook_link' => $request->facebook_link,
       'twitter_link' => $request->twitter_link,
       'instagrm_link' => $request->instagrm_link,
       'copyright_text' => $request->copyright_text, 

   ]);


   $notification = array(
       'message' => 'SiteInfo Updated Successfully',
       'alert-type' => 'success'
   );

   return redirect()->back()->with($notification);

} // End Method
}
