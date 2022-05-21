<?php

require_once 'AppController.php';
require_once __DIR__.'/../models/Question.php';
require_once __DIR__.'/../repository/AnswersRepository.php';

class AnswersController extends AppController {
    private $answersRepository;
    private $formRepository;
    private $questionRepository;
    private $userRepository;

    public function __construct() {
        parent::__construct();
        $this->answersRepository = new AnswersRepository();
        $this->formRepository = new FormRepository();
        $this->questionRepository = new QuestionRepository();
        $this->userRepository = new UserRepository();
    }

    public function addAnswers() {
        $request = $this->getRequest('POST');

        $email = trim($request->email);
        $code = trim($request->formCode);
        $answers = $request->answers;

        if(empty($code) || empty($answers)) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        if($this->formRepository->codeUnique($code)) {
            http_response_code(404);
            echo json_encode("Form does not exist");
            die();
        }

        if(!empty($email)) {
            $user = $this->userRepository->getUser($email);

            if(empty($user)) {
                http_response_code(404);
                echo json_encode("User not found");
                die();
            }

            $this->formRepository->addAttendance($code, $user);
        }

        $questions = $this->questionRepository->getQuestions($code);

        for($i = 0; $i < sizeof($answers); $i++) {

            if(is_array($answers[$i])) {

                foreach ($answers[$i] as $answer) {
                    $this->answersRepository->addAnswer($questions[$i]->getId(), $answer);
                }

            } else {
                $this->answersRepository->addAnswer($questions[$i]->getId(), $answers[$i]);
            }
        }

        http_response_code(200);
        echo json_encode("Answers noted");
    }

    public function getAnswers() {
        $request = $this->getRequest('POST');

        $email = trim($request->email);
        $code = trim($request->formCode);

        if(empty($email) || empty($code)) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        if(!$this->formRepository->existsAndOwner($email, $code)) {
            http_response_code(403);
            echo json_encode("Form does not exists or user is not permitted to view results");
            die();
        }

        $questions = $this->questionRepository->getQuestions($code);
        $json = [];

        foreach ($questions as $question) {
            $questionJson = [];
            $questionJson['type'] = $question->getType();
            $questionJson['content'] = $question->getContent();

            switch($question->getType()) {
                case 1:
                case 2:
                    $questionJson['answers'] = $this->answersRepository->getCountableAnswers($question->getId());
                    break;
                case 3:
                case 4:
                    $questionJson['answers'] = $this->answersRepository->getTextAnswers($question->getId());
                    break;
            }

            $json[] = $questionJson;
        }

        http_response_code(200);
        echo json_encode($json);
    }
}