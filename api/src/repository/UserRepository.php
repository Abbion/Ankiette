<?php

require_once 'Repository.php';
require_once __DIR__.'/../models/User.php';

class UserRepository extends Repository {

    public function getUser(string $username) {

        $stmt = $this->database->connect()->prepare('
            SELECT * FROM users u, credentials c
            WHERE u.id_credentials = c.id AND u.username = :username
        ');

        $stmt->bindParam(':username', $username);
        $stmt->execute();

        $userArray = $stmt->fetch(PDO::FETCH_ASSOC);

        if($userArray == false) {
            return null;
        }

        return new User($userArray["email"], $userArray["username"], $userArray["hash"]);
    }
}