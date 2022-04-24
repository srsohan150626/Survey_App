<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email|string|exists:users,email',
            'password' => [
                'required'
            ],
            'remember' => 'boolean'
        ]);

        if($validator->fails()){
            return $this->handleErrorResponse(400, $validator->errors()->all());
        }

        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        $remember = $request->remember ?? false;
        unset($request->remember);
        if(!Auth::attempt($credentials, $remember)) {
            return $this->handleErrorResponse(422, "The provided credentials is invalid!");
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return $this->handleSuccessResponse(200, $response);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return $this->handleSuccessResponse(200, "Successfully Log Out!");
    }
}
