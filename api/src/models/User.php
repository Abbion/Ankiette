<?php

class User {
    private $email;
    private $username;
    private $password;

    public function __construct(string $email, string $username, string $password) {
        $this->email = $email;
        $this->username = $username;
        $this->password = $password;
    }

    public function toJson(): array {
        $json["email"] = $this->email;
        $json["username"] = $this->username;

        return $json;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email)
    {
        $this->email = $email;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(string $username)
    {
        $this->username = $username;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password)
    {
        $this->password = $password;
    }


}