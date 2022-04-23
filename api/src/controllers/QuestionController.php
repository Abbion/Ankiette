<?php

require_once 'AppController.php';
require_once __DIR__.'/../models/Question.php';
require_once __DIR__.'/../repository/QuestionRepository.php';
require_once __DIR__.'/../repository/FormRepository.php';

class QuestionController extends AppController {
    private $questionRepository;
    private $formRepository;

    public function __construct() {
        parent::__construct();
        $this->questionRepository = new QuestionRepository();
        $this->formRepository = new FormRepository();
    }

    public function addQuestions() {
        $request = $this->getRequest('POST');

        $formCode = trim($request->formCode);

        if(empty($formCode)) {
            http_response_code(400);
            echo json_encode("Empty form code");
            die();
        }

        if($this->formRepository->codeUnique($formCode)) {
            http_response_code(404);
            echo json_encode("Form of such code does not exist");
            die();
        }

        foreach ($request->questions as $question) {

            if(empty($question)) {
                http_response_code(400);
                echo json_encode("Question not sent");
                die();
            }

            $type = $question->type;
            $body = $question->body;

            if(empty($type) || empty($body)) {
                http_response_code(400);
                echo json_encode("Question type or body not sent");
                die();
            }

            $content = $body->content;
            $required = $body->required;

            if(empty($content) || is_null($required)) {
                http_response_code(400);
                echo json_encode("Question content or required checkbox not sent");
                die();
            }

            switch($type) {
                case 1:
                case 2:
                    $answers = $body->answers;

                    if(empty($answers)) {
                        http_response_code(400);
                        echo json_encode("Answers to question not sent");
                        die();
                    }

                    $question = new Question($type, $content, $required, $answers);
                    break;
                case 3:
                case 4:
                    $question = new Question($type, $content, $required);
                    break;
                default:
                    http_response_code(400);
                    echo json_encode("Wrong question type");
                    die();
            }

            $this->questionRepository->addQuestion($formCode, $question);
        }

        http_response_code(200);
        echo json_encode("Questions added");
    }
}