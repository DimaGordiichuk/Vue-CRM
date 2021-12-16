<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CategoryResource::collection(Category::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CategoryRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->validated());

        return response()
            ->json([
                'message' => 'Category save',
                'data' => CategoryResource::make($category)
            ], Response::HTTP_CREATED);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  CategoryRequest $request
     * @param  Category $category
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        return response()
            ->json([
                'message' => 'Category update',
                'data' => CategoryResource::make($category)
            ], Response::HTTP_ACCEPTED);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Category $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()
            ->json(['message' => 'Category destroy'], Response::HTTP_ACCEPTED);
    }
}
