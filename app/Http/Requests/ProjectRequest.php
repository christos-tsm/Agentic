<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            'client_id' => ['required', 'integer', 'exists:clients,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'string', 'in:backlog,in_progress,completed,on_hold'],
            'budget' => ['required', 'numeric', 'min:0', 'max:9999999999999.99'],
            'deadline_at' => ['nullable', 'date', 'after:now'],
        ];
    }

    public function messages(): array {
        return [
            'client_id.required' => 'The client field is required.',
            'client_id.exists' => 'The selected client does not exist.',
            'title.required' => 'The project title is required.',
            'title.max' => 'The project title must not exceed 255 characters.',
            'status.in' => 'The status must be one of: backlog, in progress, completed, or on hold.',
            'budget.numeric' => 'The budget must be a valid number.',
            'budget.min' => 'The budget cannot be negative.',
            'deadline_at.date' => 'The deadline must be a valid date.',
            'deadline_at.after' => 'The deadline must be a future date.',
        ];
    }

    /**
     * Get custom attribute names for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array {
        return [
            'client_id' => 'client',
            'deadline_at' => 'deadline',
        ];
    }
}
