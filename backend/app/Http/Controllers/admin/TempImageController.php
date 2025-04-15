<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
class TempImageController extends Controller
{
    //This method will store the temporary image
    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(),[
            'image' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ],400);
        }

        // Store the image
        $tempImage = new TempImage();
        $tempImage->name = 'product';
        $tempImage->save();

        $image = $request->file('image');
        $imageName = time().'.'.$image->extension(); //364246324.img
        $image->move(public_path('uploads/temp/product'),$imageName);

        $tempImage->name = $imageName;
        $tempImage->save();

        //Save Image Thumbnail
        $manager = new ImageManager(Driver::class);
        $img = $manager->read(public_path('uploads/temp/product/'.$imageName)); // 800 x 600
        $img->coverDown(400, 450);
        $img->save(public_path('uploads/temp/thumbnail/'.$imageName));

        return response()->json([
            'status' => 200,
            'message' => 'Image Uploaded Successfully',
            'path' => $tempImage,
        ],200);
    }
}
