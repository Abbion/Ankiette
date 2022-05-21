<?php

require 'Routing.php';

$path = trim($_SERVER['REQUEST_URI'], '/');
$path = parse_url($path, PHP_URL_PATH);

Routing::get('', 'DefaultController');
Routing::get('test', 'DefaultController');

Routing::get('login', 'SecurityController'); // dlaczego get???
Routing::post('register', 'SecurityController');

Routing::post('sendCode', 'RecoveryController');
Routing::get('recoverAccount', 'RecoveryController');

Routing::post('getUserDetails', 'userController');
Routing::post('setUserDetails', 'userController');
Routing::post('setProfilePicture', 'userController');

Routing::post('addForm', 'FormController');
Routing::post('removeForm', 'FormController');
Routing::post('getForm', 'FormController');
Routing::post('getAllForms', 'FormController');

Routing::post('addQuestions', 'QuestionController');

Routing::post('addAnswers', 'AnswersController');
Routing::post('getAnswers', 'AnswersController');

Routing::run($path);