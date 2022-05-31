<?php

require_once 'Repository.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../models/Form.php';

class FormRepository extends Repository
{

    public function addForm(User $user, Form $form)
    {

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

    public function codeUnique(string $code): bool
    {

        $stmt = $this->database->connect()->prepare('
            SELECT * FROM forms WHERE code = :code
        ');

        $stmt->bindParam(':code', $code);
        $stmt->execute();

        $form = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($form == false) {
            return true;
        } else return false;
    }

    public function addAttendance(string $code, User $user)
    {

        $stmt = $this->database->connect()->prepare('
            INSERT INTO users_forms(id_forms, id_users, attended_at) 
            VALUES ((SELECT id_forms FROM forms WHERE code = ?),
                    (SELECT id FROM users WHERE email = ?), now());
        ');

        $stmt->execute([
            $code,
            $user->getEmail()
        ]);
    }

    public function existsAndOwner(string $email, string $code): bool
    {
        $stmt = $this->database->connect()->prepare('
            SELECT * FROM forms f 
            JOIN users u ON u.id = f.id_user 
            WHERE u.email = :email AND f.code = :code
        ');

        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':code', $code);
        $stmt->execute();

        $form = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($form == false) {
            return false;
        } else return true;
    }

    public function getAllCreated(string $email) {
        $stmt = $this->database->connect()->prepare('
            SELECT f.*
            FROM forms f
            JOIN users u on u.id = f.id_user
            WHERE u.email LIKE :input
        ');

        return $this->getFormsByEmail($email, $stmt);
    }

    public function getAllAttended(string $email) {
        $stmt = $this->database->connect()->prepare('
            SELECT f.*
            FROM users_forms
            JOIN forms f on f.id_forms = users_forms.id_forms
            JOIN users u on u.id = users_forms.id_users
            WHERE u.email LIKE :input
            AND f.code NOT IN (SELECT fo.code FROM forms fo JOIN users us ON fo.id_user = us.id WHERE us.email LIKE :input)
        ');

        return $this->getFormsByEmail($email, $stmt);
    }

    private function getFormsByEmail(string $email, $stmt) {
        $stmt->bindParam(':input', $email);
        $stmt->execute();

        $formsArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $forms = [];

        foreach ($formsArray as $value) {
            $forms[] = new Form(
                $value['title'],
                $value['start_date'],
                $value['end_date'],
                $value['code']);
        }

        if (!$formsArray) {
            return null;
        }

        return $forms;
    }

    public function getAttendedPeopleCount(string $code) {
        $stmt = $this->database->connect()->prepare('
            SELECT count(uf.id_users) counted
            FROM users_forms uf 
            JOIN forms f on uf.id_forms = f.id_forms
            WHERE f.code = :code
            GROUP BY uf.id_forms
        ');

        $stmt->bindParam(':code', $code);
        $stmt->execute();

        $array = $stmt->fetch(PDO::FETCH_ASSOC);

        return empty($array["counted"]) ? 0 : $array["counted"];
    }

    public function getCreatedCount(string $email)
    {

        $stmt = $this->database->connect()->prepare('
            SELECT count(f.code) count FROM forms f 
            JOIN users u ON u.id = f.id_user 
            WHERE u.email = :email
            GROUP BY u.email;
        ');

        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $form = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($form == false) {
            return 0;
        } else return $form["count"];
    }

    public function getAttendedCount(string $email)
    {
        $stmt = $this->database->connect()->prepare('
            SELECT count(attended_at) count FROM users_forms uf 
            JOIN users u ON u.id = uf.id_users
            WHERE u.email = :email
            GROUP BY u.email;
        ');

        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $form = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($form == false) {
            return 0;
        } else return $form["count"];
    }

    public function removeForm(string $code)
    {

        $stmt = $this->database->connect()->prepare('
            DELETE FROM forms
            WHERE code = :code
            RETURNING code;
        ');


        $stmt->bindParam(':code', $code);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getFormName(string $code) {
        $stmt = $this->database->connect()->prepare('
            SELECT title FROM forms
            WHERE code = :code
        ');

        $stmt->bindParam(':code', $code);
        $stmt->execute();
        $title = $stmt->fetch(PDO::FETCH_ASSOC);

        return $title["title"];
    }

    public function getFormDates(string $code) {
        $stmt = $this->database->connect()->prepare('
            SELECT start_date, end_date FROM forms
            WHERE code = :code
        ');

        $stmt->bindParam(':code', $code);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

}
