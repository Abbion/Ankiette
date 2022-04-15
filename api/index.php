<?php

require 'Routing.php';

$path = trim($_SERVER['REQUEST_URI'], '/');
$path = parse_url($path, PHP_URL_PATH);

Routing::get('', 'DefaultController');
Routing::get('test', 'DefaultController');

Routing::get('login', 'SecurityController'); // dlaczego get????
Routing::post('register', 'SecurityController');

Routing::get('sendCode', 'RecoveryController');
Routing::get('recoverAccount', 'RecoveryController');


Routing::get('getUserDetails', 'userController');
Routing::post('setUserDetails', 'userController');
Routing::post('setProfilePicture', 'userController');

Routing::run($path);