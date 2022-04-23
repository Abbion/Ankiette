<?php

require_once 'Repository.php';
require_once __DIR__ . '/../models/Question.php';

class QuestionRepository extends Repository {

    public function addQuestion($formCode, $question) {

        $connection = $this->database->connect();

        $stmt = $connection->prepare('
           INSERT INTO questions(id_forms, question_content, id_type, required)
           VALUES ((SELECT id_forms FROM forms WHERE code = ?), ?, ?, ?)
        ');

        $stmt->execute([
            $formCode,
            $question->getContent(),
            $question->getType(),
            $question->getRequired() == false ? 0 : 1
        ]);

        $questionID = $connection->lastInsertId();

        if(!is_null($question->getAnswers())) {

            foreach($question->getAnswers() as $answer) {

                $stmt = $this->database->connect()->prepare('
                   INSERT INTO available_answers(id_question, answer) 
                   VALUES (?, ?)
                ');

                $stmt->execute([
                    $questionID,
                    $answer
                ]);
            }
        }
    }
}