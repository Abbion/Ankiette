<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once 'vendor/phpmailer/phpmailer/src/Exception.php';
require_once 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require_once 'vendor/phpmailer/phpmailer/src/SMTP.php';

require_once 'emailConfig.php';

class EmailServer {
    private $mail;

    /**
     * @throws Exception
     */
    public function __construct() {
        $this->mail = new PHPMailer(false);

        $this->mail->isSMTP();
        $this->mail->Host = 'smtp.gmail.com';
        $this->mail->SMTPAuth = true;
        $this->mail->Username = EMAIL;
        $this->mail->Password = EMAIL_PASSWORD;
        $this->mail->SMTPSecure = 'tls';
        $this->mail->Port = 587;

        $this->mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        $this->mail->setFrom('ankiette@donotreply.com', 'Ankiette');
        $this->mail->addReplyTo('ankiette@reply.com', 'Ankiette');
    }

    public function sendRecoveryMail($email, $code) {

        try {
            $this->mail->addAddress($email);
        } catch (Exception $e) {
            return false;
        }

        $this->mail->isHTML(true);

        $this->mail->Subject = 'Ankiette - account recovery code';

        $bodyContent = '<h1>Recovery code</h1>';
        $bodyContent .= '<p>Your password recovery code is: </p>'.$code;
        $this->mail->Body = $bodyContent;

        try {
            return $this->mail->send();
        } catch (Exception $e) {
            return false;
        }
    }
}