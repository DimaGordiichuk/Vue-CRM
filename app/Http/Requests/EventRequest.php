<?php

namespace App\Http\Requests;

use App\Models\Event;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'photo' => ['required'],
            'title' => ['required', 'string'],
            'address' => ['required', 'string'],
            'coauthor' => ['nullable'],
            'coauthor.id' => ['nullable','exists:users,id'],
            'description' => ['required'],
            'category' => ['required', 'exists:categories,id'],
            'count_seats' => ['nullable'],
            'sex' => ['required',  Rule::in(array_column(Event::genderList(),'key'))],
            'date' => ['required'],
        ];
    }
}
