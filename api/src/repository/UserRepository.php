<?php

require_once 'Repository.php';
require_once __DIR__.'/../models/User.php';

class UserRepository extends Repository {

    public function getUser(string $email) {

        $stmt = $this->database->connect()->prepare('
            SELECT * FROM users u, users_details ud
            WHERE u.id_users_details = ud.id AND u.email = :email
        ');

        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $userArray = $stmt->fetch(PDO::FETCH_ASSOC);
        if($userArray == false) {
            return null;
        }

        return new User(
            $userArray["email"],
            $userArray["hash"],
            $userArray["name"],
            $userArray["surname"],
            $userArray["picture"]
        );
    }

    public function updatePassword(string $email, string $newPassword) {
        $stmt = $this->database->connect()->prepare('
            UPDATE users set hash=? WHERE email=?
        ');

        $stmt->execute([$newPassword, $email]);
    }

    public function updateUserData(string $email, string $name, string $surname) {
        $stmt = $this->database->connect()->prepare('
            UPDATE users_details set name=?, surname=?
            FROM users u 
            WHERE u.id_users_details=users_details.id 
                AND u.email=?
        ');

        $stmt->execute([$name, $surname, $email]);
    }

    public function updateUserPicture(string $email, string $pictureName) {
        $stmt = $this->database->connect()->prepare('
            UPDATE users_details set picture=?
            FROM users u 
            WHERE u.id_users_details=users_details.id 
                AND u.email=?
        ');
        $stmt->execute([$pictureName, $email]);
    }
}