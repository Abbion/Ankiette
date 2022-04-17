<?php

require_once 'Repository.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../models/Form.php';

class FormRepository extends Repository {

    public function addForm(User $user, Form $form) {

        $stmt = $this->database->connect()->prepare('
            INSERT INTO forms(id_user, title, start_date, end_date, code)
            VALUES ((SELECT id from users u WHERE email = ?), ?, ?, ?, ?)
        ');

        $stmt->execute([
            $user->getEmail(),
            $form->getTitle(),
            $form->getStartDate(),
            $form->getEndDate(),
            $form->getCode()
        ]);
    }

    public function codeUnique(string $code): bool {

        $stmt = $this->database->connect()->prepare('
            SELECT * FROM forms WHERE code = :code
        ');

        $stmt->bindParam(':code', $code);
        $stmt->execute();

        $form = $stmt->fetch(PDO::FETCH_ASSOC);

        if($form == false) {
            return true;
        } else return false;
    }
}