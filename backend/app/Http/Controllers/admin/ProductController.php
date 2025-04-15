<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProductController extends Controller
{
    //This Method will return all the products
    public function index(){
        $products = Product::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $products
        ],200);
    }

    //This Method will store a new product
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

        //Create a new product
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

        //Save the product images
        if(!empty($request->gallery)){
            foreach($request->gallery as $key => $tempImageId){
                $tempImage = TempImage::find($tempImageId);

                //Large image
                $extArray = explode('.',$tempImage->name);
                $ext = end($extArray);

                $imageName = $product->id.'-'.time().'.'.$ext; //2-1231312.jpg
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/product/'.$tempImage->name)); // 800 x 600
                $img->scaleDown(1200);
                $img->save(public_path('uploads/temp/product/large/'.$imageName));

                //Small image
                $imageName = $product->id.'-'.time().'.'.$ext; //2-1231312.jpg
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/product/'.$tempImage->name)); // 800 x 600
                $img->coverDown(400,460);
                $img->save(public_path('uploads/temp/product/small/'.$imageName));

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

    //This Method will return all a single product
    public function show($id){
        $product = Product::find($id);

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

    //This Method will update a product
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

        //Update a new product
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

    //This Method will delete a product
    public function destroy($id){
        $product = Product::find($id);

        if($product == null){
            return response()->json([
                'status' => 404,
                'message' => 'Product Not Found',
            ], 404);
        }

        $product->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product Deleted Successfully',
        ], 200);
    }

}
