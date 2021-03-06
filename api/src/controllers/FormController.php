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

        $title = $this->formRepository->getFormName($code);

        if(empty($title)) {
            http_response_code(404);
            echo json_encode("Form does not exist");
            die();
        }

        $questions = $this->questionRepository->getQuestions($code);
        $questionsJson = [];

        foreach ($questions as $question) {
            $questionsJson[] = $question->toJSON();
        }

        $json = ["title" => $title, "questions" => $questionsJson];
        http_response_code(200);
        echo json_encode($json);
    }

    public function getFormDetails() {
        $request = $this->getRequest('POST');

        $code = trim($request->code);

        if(empty($code)) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        $title = $this->formRepository->getFormName($code);

        if(empty($title)) {
            http_response_code(404);
            echo json_encode("Form does not exist");
            die();
        }

        $participants = $this->formRepository->getAttendedPeopleCount($code);
        $dates = $this->formRepository->getFormDates($code);

        $json = ["title" => $title, "participants" => $participants, "startDate" => $dates["start_date"], "endDate" => $dates["end_date"]];
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

    public function getAllForms(){
        $request = $this->getRequest('POST');
        $email = trim($request->email);

        if(empty($email)) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        if(empty($this->userRepository->getUser($email))) {
            http_response_code(404);
            echo json_encode("No user of such email");
            die();
        }

        $allCreatedForms = $this->formRepository->getAllCreated($email);
        $allAttendedForms = $this->formRepository->getAllAttended($email);

        $allEncodedCreatedForms = [];
        $allEncodedAttendedForms = [];

        if(!empty($allCreatedForms)) {
            foreach ($allCreatedForms as $form) {
                $json = $form->toJson();
                $json["attended"] = $this->formRepository->getAttendedPeopleCount($form->getCode());

                $allEncodedCreatedForms[] = $json;
            }
        }

        if(!empty($allAttendedForms)) {
            foreach ($allAttendedForms as $form) {
                $allEncodedAttendedForms[] = $form->toJson();
            }
        }

        $allEncodedForms = ["created" => $allEncodedCreatedForms,
            "attended" => $allEncodedAttendedForms];

        http_response_code(200);
        echo json_encode($allEncodedForms);
    }


    public function removeForm(){
        $request = $this->getRequest('POST');

        $code = trim($request->formCode);
        $email = trim($request->email);


        if(empty($code) || empty($email)) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        if(!$this->formRepository->existsAndOwner($email, $code)){
            http_response_code(401);
            echo json_encode("Unauthorized!");
            die();
        }

        $code = $this->formRepository->removeForm($code);
        http_response_code(200);
        echo json_encode($code);
    }
}