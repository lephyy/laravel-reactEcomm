<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    public function index()
    {
        $sizes = Size::orderBy('name', 'asc')->get();
        return response()->json([
            'status' => 200,
            'data' => $sizes,
        ],200);
    }

    public function create()
    {
        // Code to show form for creating a new size
    }

    public function store(Request $request)
    {
        // Code to store a new size
    }

    public function show($id)
    {
        // Code to show a specific size
    }

    public function edit($id)
    {
        // Code to show form for editing a specific size
    }

    public function update(Request $request, $id)
    {
        // Code to update a specific size
    }

    public function destroy($id)
    {
        // Code to delete a specific size
    }
}
