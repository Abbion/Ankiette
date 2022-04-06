<?php

require_once 'Repository.php';
require_once __DIR__ . '/../models/User.php';

class RecoveryRepository extends Repository {

    public function getUserByCode(string $code) {

        $stmt = $this->database->connect()->prepare('
            SELECT * FROM users u, users_details ud, recoveries r
            WHERE u.id_users_details = ud.id 
              AND r.id_users = u.id
              AND r.recovery_code = :code
              AND r.used = false
        ');

        $stmt->bindParam(':code', $code);
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

    public function setTmpPassword($email, $tmpPassword) {
        $stmt = $this->database->connect()->prepare('
            UPDATE users
            SET hash = ?
            WHERE email = ?
        ');

        $stmt->execute([
            $tmpPassword,
            $email
        ]);
    }

    public function setUsedRecovery($email, $code) {
        $stmt = $this->database->connect()->prepare('
            UPDATE recoveries
            SET used = true
            FROM recoveries r
            INNER JOIN users u ON u.id = r.id_users
            WHERE u.email = ? AND r.recovery_code = ?
        ');

        $stmt->execute([
            $email,
            $code
        ]);
    }

    public function codeUnique(string $code): bool {

        $stmt = $this->database->connect()->prepare('
            SELECT * FROM recoveries WHERE recovery_code = :code
        ');

        $stmt->bindParam(':code', $code);
        $stmt->execute();

        $recovery = $stmt->fetch(PDO::FETCH_ASSOC);

        if($recovery == false) {
            return true;
        } else return false;
    }

    public function setCode(User $user, string $code) {

        $stmt = $this->database->connect()->prepare('
            UPDATE recoveries
            SET used = true
            FROM recoveries r
            INNER JOIN users u ON u.id = r.id_users
            WHERE u.email = ? AND r.used = false
        ');

        $stmt->execute([
            $user->getEmail()
        ]);

        $stmt = $this->database->connect()->prepare('
            INSERT INTO recoveries(id_users, recovery_code, date)
            VALUES ((SELECT id from users u WHERE email = ?), ?, now())
        ');

        $stmt->execute([
            $user->getEmail(),
            $code
        ]);
    }
}