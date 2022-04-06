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
}