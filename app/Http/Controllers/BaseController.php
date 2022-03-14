<?php

namespace App\Http\Controllers;

class BaseController extends Controller
{
    public function handleSuccessResponse($code, $data): object
    {
        return response()->json([
            'status' => 'success',
            'response' => $data
        ], $code);
    }

    public function handleErrorResponse($code, $data): object
    {
        return response()->json([
            'status' => 'failed',
            'error' => $data
        ], $code);
    }
}
