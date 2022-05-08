<?php

require_once 'AppController.php';
require_once __DIR__.'/../models/User.php';
require_once __DIR__.'/../repository/UserRepository.php';
require_once __DIR__.'/../repository/RecoveryRepository.php';
require_once __DIR__.'/../../email/EmailServer.php';

class RecoveryController extends AppController {
    private $userRepository;
    private $recoveryRepository;
    private $emailServer;

    public function __construct() {
        parent::__construct();
        $this->userRepository = new UserRepository();
        $this->recoveryRepository = new RecoveryRepository();
        $this->emailServer = new EmailServer();
    }

    public function sendCode() {

        $request = $this->getRequest('POST');
        $email = trim($request->email);

        if(empty($email)) {

            http_response_code(400);
            echo json_encode("Bad request");

        } else {

            $user = $this->userRepository->getUser($email);

            if(!$user) {
                http_response_code(404);
                echo json_encode("Wrong email.");
            } else {
                $code = $this->generateCode($user);

                if($this->emailServer->sendRecoveryMail($user->getEmail(), $code)) {
                    http_response_code(200);
                    echo json_encode("Email sent.");
                } else {
                    http_response_code(500);
                    echo json_encode("Email could not be send.");
                }
            }
        }
    }

    public function recoverAccount() {

        $request = $this->getRequest('POST');
        $code = trim($request->recoveryCode);

        if(empty($code)) {

            http_response_code(400);
            echo json_encode("Bad request");

        } else {

            $user = $this->recoveryRepository->getUserByCode($code);

            if(!$user) {
                http_response_code(404);
                echo json_encode("Wrong recovery code.");
            } else {
                $tmpPassword['tmpPassword'] = $this->generateTmpPassword($user->getEmail());
                $this->recoveryRepository->setUsedRecovery($user->getEmail(), $code);

                http_response_code(200);
                echo json_encode($tmpPassword);
            }
        }
    }

    private function generateCode($user): string {
        $code = '';

        do {
            $string = str_shuffle("0123456789");

            for($i = 0; $i < 8; $i++) {
                $code .= $string[mt_rand(0, strlen($string) - 1)];
            }
        } while (!$this->recoveryRepository->codeUnique($code));

        $this->recoveryRepository->setCode($user, $code);

        return $code;
    }

    private function generateTmpPassword($email): string {
        $tmpPassword = '';

        for($i = 0; $i < 6; $i++) {
            $string = str_shuffle("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
            $tmpPassword .= $string[mt_rand(0, strlen($string) - 1)];
        }

        $this->recoveryRepository->setTmpPassword($email, password_hash($tmpPassword, null));

        return $tmpPassword;
    }
}