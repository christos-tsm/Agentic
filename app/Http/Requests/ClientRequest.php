<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClientRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    protected function prepareForValidation() {
        $this->merge([
            'email' => strtolower($this->email),
            // Καθαρισμός τηλεφώνου και ΑΦΜ από κενά/χαρακτήρες
            'phone' => str_replace([' ', '-', '(', ')'], '', $this->phone),
            'is_company' => filter_var($this->is_company, FILTER_VALIDATE_BOOLEAN),
            'vat_number' => str_replace([' ', 'EL', 'el'], '', $this->vat_number),
        ]);

        if (!$this->is_company) {
            $this->merge([
                'company_name' => null,
                'company_email' => null,
                'profession' => null,
                'vat_number' => null,
                'doy' => null,
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array {
        return [
            'is_company' => ['required', 'boolean'], // Διαχωρισμός Ιδιώτη/Επιχείρησης

            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                Rule::unique('clients', 'email')->ignore($this->client)
            ],

            // Αν is_company == true, τότε αυτά τα πεδία είναι REQUIRED
            'company_name' => ['required_if:is_company,true', 'nullable', 'string', 'max:255'],
            'company_email' => ['required_if:is_company,true', 'nullable', 'email', 'max:255'],
            'profession'   => ['required_if:is_company,true', 'nullable', 'string', 'max:255'],
            'vat_number'   => [
                'required_if:is_company,true',
                'nullable',
                'digits:9',
                Rule::unique('clients', 'vat_number')->ignore($this->client)
            ],
            'doy'          => ['required_if:is_company,true', 'nullable', 'string', 'max:100'],

            // Διεύθυνση (συνήθως απαραίτητη και για τους δύο για το myDATA)
            'address'      => ['required', 'string', 'max:255'],
            'city'         => ['required', 'string', 'max:100'],
            'zip_code'     => ['required', 'string', 'max:10'],

            'phone'        => ['nullable', 'string', 'max:20'],
            'status'       => ['required', Rule::in(['active', 'inactive'])],
        ];
    }

    /**
     * Προαιρετικά: Custom μηνύματα για τα ελληνικά πεδία
     */
    public function messages(): array {
        return [
            'vat_number.digits' => 'Το ΑΦΜ πρέπει να είναι ακριβώς 9 ψηφία.',
            'vat_number.unique' => 'Αυτό το ΑΦΜ υπάρχει ήδη καταχωρημένο.',
            'company_name.required' => 'Η επωνυμία είναι απαραίτητη για την έκδοση τιμολογίου.',
        ];
    }
}
