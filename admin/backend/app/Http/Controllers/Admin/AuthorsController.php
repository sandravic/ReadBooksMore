<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Authors;
use Image;

class AuthorsController extends Controller
{
    public function AllAuthors(){
        $result = Authors::get();
        return $result;
    }

    public function GetAllAuthor(){

        $author = Authors::latest()->get();
        return view('backend.author.author_view',compact('author'));
    
    } // End Mehtod 


    public function AddAuthor(){
        return view('backend.author.author_add');
      } // End Mehtod

      public function StoreAuthor(Request $request){
        $request->validate([
            'authors_name' => 'required',
        ],[
            'authors_name.required' => 'Input author Name'
    
        ]);
    
        $image = $request->file('authors_img');
        $name_gen = hexdec(uniqid()).'.'.$image->getClientOriginalExtension();
        Image::make($image)->resize(128,128)->save('upload/author/'.$name_gen);
        $save_url = 'http://127.0.0.1:8000/upload/author/'.$name_gen;
    
        Authors::insert([
            'authors_name' => $request->authors_name,
            'authors_img' => $save_url,
        ]);
    
        $notification = array(
            'message' => 'Author Inserted Successfully',
            'alert-type' => 'success'
        );
    
        return redirect()->route('all.author')->with($notification);
    
      }// End Mehtod 

      public function EditAuthor($id){

        $author = Authors::findOrFail($id);
        return view('backend.author.author_edit',compact('author'));
    
    } //End Method 

    public function UpdateAuthor(Request $request){
        $author_id = $request->id;
        
                if ($request->file('author_image')) {
        
                $image = $request->file('author_image');
                $name_gen = hexdec(uniqid()).'.'.$image->getClientOriginalExtension();
                Image::make($image)->resize(128,128)->save('upload/author/'.$name_gen);
                $save_url = 'http://127.0.0.1:8000/upload/author/'.$name_gen;
        
                Authors::findOrFail($author_id)->update([
                    'authors_name' => $request->authors_name,
                    'authors_img' => $save_url,
                ]);
        
                $notification = array(
                    'message' => 'Author Update With Image Successfully',
                    'alert-type' => 'success'
                );
        
                return redirect()->route('all.author')->with($notification);
        
                }
                else{
        
                     Authors::findOrFail($author_id)->update([
                    'authors_name' => $request->authors_name,
        
                ]);
        
                $notification = array(
                    'message' => 'Author Updateed Without Image Successfully',
                    'alert-type' => 'success'
                );
        
                return redirect()->route('all.author')->with($notification);
        
                }
            }

            public function DeleteAuthor($id){

                Authors::findOrFail($id)->delete();
            
                $notification = array(
                        'message' => 'Author Deleted Successfully',
                        'alert-type' => 'success'
                    );
            
                    return redirect()->back()->with($notification);
            
            
            
                }//End Method 

                public function GetAllSubCategory(){
                    $subcategory = Subcategory::latest()->get();
                         return view('backend.subcategory.subcategory_view',compact('subcategory'));
                 
                     } //End Method 
                 
                 
                     public function AddSubCategory(){
                 
                         $category = Category::latest()->get();
                          return view('backend.subcategory.subcategory_add',compact('category'));
                     } //End Method 



}
