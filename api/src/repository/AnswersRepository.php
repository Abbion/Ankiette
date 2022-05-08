<?php

class AnswersRepository extends Repository {

    public function addAnswer($id, $answer) {

        $stmt = $this->database->connect()->prepare('
            INSERT INTO given_answers(id_question, given_answer) VALUES (?, ?)
        ');

        $stmt->execute([
            $id,
            $answer
        ]);
    }

    public function getCountableAnswers($id): array {

        $stmt = $this->database->connect()->prepare('
            SELECT aa.answer, count(ga.id_given_answers) amount FROM available_answers aa
            LEFT JOIN given_answers ga on ga.given_answer = aa.answer
            WHERE aa.id_question = :id
            GROUP BY aa.answer
            ORDER BY count(ga.id_given_answers) DESC;
        ');

        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $givenAnswers = [];

        if($array != false) {
            foreach ($array as $element) {
                $countedAnswer = [];

                if($element['answer'] !== null) {

                    $countedAnswer[] = $element['answer'];
                    $countedAnswer[] = $element['amount'];

                    $givenAnswers[] = $countedAnswer;
                }
            }
        }

        return $givenAnswers;
    }

    public function getTextAnswers($id) {

        $stmt = $this->database->connect()->prepare('
            SELECT ga.given_answer
            FROM given_answers ga
            WHERE ga.id_question = :id
        ');

        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $givenAnswers = [];

        if($array != false) {
            foreach ($array as $element) {
                if($element['given_answer'] !== null) {
                    $givenAnswers[] = $element['given_answer'];
                }
            }
        }

        return $givenAnswers;
    }


}