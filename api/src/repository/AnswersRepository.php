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
            SELECT aa.answer FROM available_answers aa 
            WHERE aa.id_question = :id
            ORDER BY aa.answer;
        ');

        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $answers = [];

        if($array != false) {
            foreach ($array as $availableAnswer) {
                $answers[] = $availableAnswer['answer'];
            }
        }

        $stmt = $this->database->connect()->prepare('
            SELECT ga.given_answer, count(ga.id_given_answers) amount FROM given_answers ga
            WHERE ga.id_question = :id AND ga.given_answer IN 
                (SELECT aa.answer FROM available_answers aa WHERE aa.id_question = :id)
            GROUP BY ga.given_answer
            ORDER BY ga.given_answer;
        ');

        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $givenAnswers = [];

        if($array != false) {
            foreach ($answers as $availableAnswer) {
                $flag = true;

                foreach ($array as $givenAnswer) {
                    $tmp = [];

                    if($availableAnswer == $givenAnswer['given_answer']) {
                        $flag = false;
                        $tmp[] = $availableAnswer;
                        $tmp[] = $givenAnswer['amount'];

                        $givenAnswers[] = $tmp;
                        $array = array_diff($array, $givenAnswer);
                        break;
                    }
                }

                if($flag) {
                    $tmp[] = $availableAnswer;
                    $tmp[] = 0;

                    $givenAnswers[] = $tmp;
                }
            }
        }

        return $givenAnswers;
    }

    public function getTextAnswers($id): array {

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