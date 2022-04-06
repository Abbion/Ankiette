<?php

class User {
    private $email;
    private $password;
    private $name;
    private $surname;
    private $picture;

    const IMAGE_PATH = "public/img/profiles/";

    public function __construct(string $email, string $password, string $name, string $surname, string $picture) {

        $this->email = $email;
        $this->password = $password;    //always hashed in object
        $this->name = $name;
        $this->surname = $surname;
        $this->picture = $picture;
    }

    public function toJson(): array {
        $json["email"] = $this->email;
        $json["name"] = $this->name;
        $json["surname"] = $this->surname;
        $json["picture"] = "http://$_SERVER[HTTP_HOST]/".self::IMAGE_PATH.$this->picture;

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

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password)
    {
        $this->password = $password;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function getSurname(): string
    {
        return $this->surname;
    }

    public function setSurname(string $surname)
    {
        $this->surname = $surname;
    }

    public function getPicture(): string
    {
        return $this->picture;
    }

    public function setPicture(string $picture)
    {
        $this->picture = $picture;
    }



}