<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AccountController extends Controller
{
    public function register(Request $request)
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password', // Changed from confirm_password
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->messages()
            ], 422);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = 'customer';
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'You have registered successfully'
        ], 200);
    }

    public function authenticate(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Attempt authentication
        $credentials = $request->only('email', 'password');
        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 401);
        }

        // Get authenticated user
        $user = Auth::user();

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'Bearer',
            ]
        ], 200);
    }

    public function getOrderDetail($id,Request $request)
    {
        $order = Order::where([
            'user_id'=>$request->user()->id,
            'id'=>$id
        ])
        ->with('items')
        ->first();
        if($order == null){
            return response()->json([
                'status' => 404,
                'message' => 'Order not found',
                'data' => []
            ], 404);
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'Order found',
                'data' => $order
            ], 200);
        }
    }
}
