<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyResource;
use App\Http\Resources\SurveyResourceDashboard;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        //Total number of surveys
        $total_survey = Survey::query()->where('user_id', $user->id)->count();
        //Latest Survey
        $latest_survey = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();
        //Total number of answer
        $total_answer = SurveyAnswer::query()
                        ->join('surveys', 'surveys.id','survey_answers.survey_id')
                        ->where('surveys.user_id', $user->id)
                        ->count();
        //Latest 5 answer
        $latest_five_answer = SurveyAnswer::query()
                            ->join('surveys', 'surveys.id','survey_answers.survey_id')
                            ->where('surveys.user_id', $user->id)
                            ->latest('end_date')
                            ->limit(5)
                            ->getModels('survey_answers.*');
        return [
          'total_survey' => $total_survey,
          'latest_survey' => $latest_survey ? new SurveyResourceDashboard($latest_survey) : null,
          'total_answer' => $total_answer,
          'latest_five_answer' => SurveyAnswerResource::collection($latest_five_answer)
        ];
    }
}
