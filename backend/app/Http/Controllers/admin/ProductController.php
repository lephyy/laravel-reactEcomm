<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProductController extends Controller
{

    public function index(){
        $products = Product::orderBy('created_at','DESC')
                    ->with('product_images')
                    ->get();
        return response()->json([
            'status' => 200,
            'data' => $products
        ],200);
    }


    public function store(Request $request){
        //Validate the request
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'price' => 'required|numeric',
            'category' => 'required|integer',
            'sku' => 'required|unique:products,sku',
            'is_featured' => 'required',
            'status' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ],400);
        }

        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->barcode = $request->barcode;
        $product->save();


        if(!empty($request->gallery)){
            foreach($request->gallery as $key => $tempImageId){
                $tempImage = TempImage::find($tempImageId);


                $extArray = explode('.',$tempImage->name);
                $ext = end($extArray);
                $rand = rand(1000,10000);

                $imageName = $product->id.'-'.$rand.time().'.'.$ext; //2-1231312.jpg
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/product/'.$tempImage->name)); // 800 x 600
                $img->scaleDown(1200);
                $img->save(public_path('uploads/temp/product/large/'.$imageName));


                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/product/'.$tempImage->name)); // 800 x 600
                $img->coverDown(400,460);
                $img->save(public_path('uploads/temp/product/small/'.$imageName));

                $productImage = new ProductImage();
                $productImage->image = $imageName;
                $productImage->product_id = $product->id;
                $productImage->save();

                if($key == 0){
                    $product->image = $imageName;
                    $product->save();
                }
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product Created Successfully',
        ], 200);

    }


    public function show($id){
        $product = Product::with('product_images')
                    ->find($id);

        if($product == null){
            return response()->json([
                'status' => 404,
                'message' => 'Product Not Found',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $product
        ],200);
    }


    public function update($id, Request $request){

        $product = Product::find($id);

        if($product == null){
            return response()->json([
                'status' => 404,
                'message' => 'Product Not Found',
            ], 404);
        }

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'price' => 'required|numeric',
            'category' => 'required|integer',
            'sku' => 'required|unique:products,sku,'.$id.',id',
            'is_featured' => 'required',
            'status' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ],400);
        }


        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->barcode = $request->barcode;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product Updated Successfully',
        ], 200);
    }


    public function destroy($id){
        $product = Product::with('product_images')->find($id);

        if($product == null){
            return response()->json([
                'status' => 404,
                'message' => 'Product Not Found',
            ], 404);
        }

        $product->delete();

        if ($product->product_images) {
            foreach($product->product_images as $productImage){
                File::delete(public_path('uploads/temp/product/large/'.$productImage->image));
                File::delete(public_path('uploads/temp/product/small/'.$productImage->image));
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product Deleted Successfully',
        ], 200);
    }

    public function saveProductImage(Request $request) {



        $validator = Validator::make($request->all(),[
            'image' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ],400);
        }




        $image = $request->file('image');
        $imageName = $request->product_id.'-'.time().'.'.$image->extension(); //364246324.img


        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathname()); // 800 x 600
        $img->scaleDown(1200);
        $img->save(public_path('uploads/temp/product/large/'.$imageName));


        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathname()); // 800 x 600
        $img->coverDown(400,460);
        $img->save(public_path('uploads/temp/product/small/'.$imageName));

       
        $productImage = new ProductImage();
        $productImage->image = $imageName;
        $productImage->product_id = $request->product_id;
        $productImage->save();


        return response()->json([
            'status' => 200,
            'message' => 'Image Uploaded Successfully',
            'path' => $productImage,
        ],200);


    }

    public function updateDefaultImage(Request $request) {

        $product = Product::find($request->product_id);
        $product->image = $request->image;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'product default Image Uploaded Successfully',

        ],200);
    }

    public function deleteProductImage($id) {
        $productImage = ProductImage::find($id);

        if ($productImage == null){
            return response()->json([
                'status' => 404,
                'message' => 'Image not found',
            ],404);
        }

        File::delete(public_path('uploads/temp/product/large/'.$productImage->image));
        File::delete(public_path('uploads/temp/product/small/'.$productImage->image));

        $productImage->delete();

        return response()->json([
            'status' => 200,
            'message' => 'product Image deleted Successfully',

        ],200);
    }

}
