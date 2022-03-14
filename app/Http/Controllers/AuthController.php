<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends BaseController
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ]);

        if($validator->fails()){
            return $this->handleErrorResponse(400, $validator->errors()->all());
        }

        $user = User::create([
           'name' => $request->name,
           'email' => $request->email,
           'password' => bcrypt($request->password)
        ]);

        $token = $user->createToken('main')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return $this->handleSuccessResponse(201, $response);

    }
}
