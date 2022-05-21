<?php

require_once 'AppController.php';
require_once __DIR__.'/../models/Form.php';
require_once __DIR__.'/../models/Question.php';
require_once __DIR__.'/../repository/FormRepository.php';
require_once __DIR__.'/../repository/UserRepository.php';
require_once __DIR__.'/../repository/QuestionRepository.php';

class FormController extends AppController {
    private $formRepository;
    private $userRepository;
    private $questionRepository;

    public function __construct() {
        parent::__construct();
        $this->formRepository = new FormRepository();
        $this->userRepository = new UserRepository();
        $this->questionRepository = new QuestionRepository();
    }

    public function addForm() {
        $request = $this->getRequest('POST');

        $email = trim($request->email);
        $title = trim($request->title);
        $startDate = $request->startDate;
        $endDate = $request->endDate;

        if(empty($email) || empty($title) || empty($startDate) || empty($endDate)) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        $startDate = date("Y-m-d H:i:s", strtotime($startDate));
        $endDate = date("Y-m-d H:i:s", strtotime($endDate));

        $user = $this->userRepository->getUser($email);

        if(!$user) {
            http_response_code(404);
            echo json_encode("User does not exist");
            die();
        }

        date_default_timezone_set("Europe/Warsaw");
        $now = date("Y-m-d H:i:s");

        if($startDate <= $now || $endDate <= $startDate) {
            http_response_code(400);
            echo json_encode("Wrong start or end time");
            die();
        }

        $code = $this->generateCode();
        $form = new Form($title, $startDate, $endDate, $code);

        $this->formRepository->addForm($user, $form);
        http_response_code(200);
        $response['code'] = $code;
        echo json_encode($response);
    }

    public function getForm() {
        $request = $this->getRequest('POST');

        $code = trim($request->code);

        if(empty($code)) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        $questions = $this->questionRepository->getQuestions($code);
        $json = [];

        foreach ($questions as $question) {
            $json[] = $question->toJSON();
        }

        if(empty($json)) {
            http_response_code(404);
            echo json_encode("Form does not exist");
            die();
        }

        http_response_code(200);
        echo json_encode($json);
    }

    private function generateCode(): string {
        $code = '';

        do {
            $string = str_shuffle("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");

            for($i = 0; $i < 8; $i++) {
                $code .= $string[mt_rand(0, strlen($string) - 1)];
            }
        } while (!$this->formRepository->codeUnique($code));

        return $code;
    }
}