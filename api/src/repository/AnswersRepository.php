<?php

class AnswersRepository extends Repository {

    public function addAnswer($id, $answer) {
        $connection = $this->database->connect();

        $stmt = $this->database->connect()->prepare('
            INSERT INTO given_answers(id_question, given_answer) VALUES (?, ?)
        ');

        $stmt->execute([
            $id,
            $answer
        ]);
    }
}