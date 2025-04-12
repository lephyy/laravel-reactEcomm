<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'confirm_password' => 'required|same:password',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        // $user = new User();
        // $user->name = $request->name;
        // $user->email = $request->email;
        // $user->password = Hash::make($request->password);
        $token = Auth::fromUser($user);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' =>[
                'token' => $token,
                'type' => 'Bearer',
            ]
            ], 201);
        // return response()->json(['message' => 'Register']);
    }

    // Login User
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'message' => 'Login successfully',
            'user' => $user,
            'authorization' =>[
                'token' => $token,
                'type' => 'Bearer',
            ]
            ], 201);
    }

    // Get Authenticated User
    public function me(Request $request)
    {
        $token = $request->bearerToken();

    if (!$token) {
        return response()->json(['error' => 'Token not found'], 400);
    }

    try {
        $user = JWTAuth::parseToken()->authenticate();
        return response()->json(['user' => $user]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Invalid token: ' . $e->getMessage()], 401);
    }
    }

    // Logout User
    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    // Refresh Token
    public function refresh()
    {
        return response()->json([
            'token' => Auth::refresh(),
        ]);
    }
}
