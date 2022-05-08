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
                    trim($answer)
                ]);
            }
        }
    }

    public function getQuestions($formCode) {

        $stmt = $this->database->connect()->prepare('
            SELECT q.* FROM questions q
            JOIN forms f on q.id_forms = f.id_forms
            WHERE f.code = :code
            ORDER BY q.id_questions
        ');

        $stmt->bindParam(':code', $formCode);
        $stmt->execute();

        $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $questions = [];

        if($array != false) {
            foreach ($array as $element) {
                if($element['question_content'] !== null) {
                    $question = $this->createQuestionInstance($element);
                    $questions[] = $question;
                }
            }
        }

        return $questions;
    }

    private function createQuestionInstance($element): Question {

        $question = new Question(
            $element['id_type'],
            $element['question_content'],
            $element['required']
        );

        switch($question->getType()) {
            case 1:
            case 2:
                $question->setAnswers($this->getAvailableAnswers($element['id_questions']));
                break;
        }

        $question->setId($element['id_questions']);

        return $question;
    }

    private function getAvailableAnswers($id): array {

        $stmt = $this->database->connect()->prepare('
            SELECT * FROM available_answers
            WHERE id_question = :id
            ORDER BY id_available_answers
        ');

        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $answers = [];

        if($array != false) {
            foreach ($array as $element) {
                if($element['answer'] !== null) {
                    $answers[] = $element['answer'];
                }
            }
        }

        return $answers;
    }
}