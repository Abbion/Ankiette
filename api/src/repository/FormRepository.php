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

    public function addAttendance(string $code, User $user) {

        $stmt = $this->database->connect()->prepare('
            INSERT INTO users_forms(id_forms, id_users, added_at) 
            VALUES ((SELECT id_forms FROM forms WHERE code = ?),
                    (SELECT id FROM users WHERE email = ?), now());
        ');

        $stmt->execute([
            $code,
            $user->getEmail()
        ]);
    }

    public function existsAndOwner(string $email, string $code) {
        $stmt = $this->database->connect()->prepare('
            SELECT * FROM forms f 
            JOIN users u ON u.id = f.id_user 
            WHERE u.email = :email AND f.code = :code
        ');

        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':code', $code);
        $stmt->execute();

        $form = $stmt->fetch(PDO::FETCH_ASSOC);

        if($form == false) {
            return false;
        } else return true;
    }
    
    public function getAll(string $email)
    {
        $stmt = $this->database->connect()->prepare('
                    SELECT DISTINCT id_forms,title,start_date,end_date,code from (
            (SELECT forms.*,email
                FROM forms
                JOIN users u on u.id = forms.id_user)
            UNION
            (SELECT f.*,u2.email
                FROM users_forms
                JOIN forms f on f.id_forms = users_forms.id_forms
                JOIN users u2 on u2.id = users_forms.id_users)
        ) as wszystkie
        WHERE email LIKE :input
                ');

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

}