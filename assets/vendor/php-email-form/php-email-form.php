
// /**
//  * PHP Email Form Class
//  * https://bootstrapmade.com/php-email-form/
//  */
// 
// require __DIR__ . '/PHPMailer/PHPMailer.php';
// require __DIR__ . '/PHPMailer/SMTP.php';
// require __DIR__ . '/PHPMailer/Exception.php';
// 
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;
// 
// 
// class PHP_Email_Form {
// 
//   public $to = '';
//   public $from_name = '';
//   public $from_email = '';
//   public $subject = '';
//   public $message = '';
//   public $ajax = false;
// 
//   public $smtp = array();
// 
//   private $messages = array();
// 
//   function __construct() {
    // $this->ajax = defined('PHP_EMAIL_FORM_AJAX', true);
//   }
// 
//   function add_message($content, $label = '', $length = 0) {
    // if ($length > 0) {
    //   $content = substr($content, 0, $length);
    // }
    // $this->messages[] = array(
    //   'label' => $label,
    //   'content' => $content
    // );
//   }
// 
//   function send() {
    // $this->message = '';
// 
    // foreach ($this->messages as $msg) {
    //   if (!empty($msg['label'])) {
        // $this->message .= $msg['label'] . ": ";
    //   }
    //   $this->message .= $msg['content'] . "\n";
    // }
// 
    // $headers = 'From: ' . $this->from_name . ' <' . $this->from_email . ">\r\n";
    // $headers .= 'Reply-To: ' . $this->from_email . "\r\n";
    // $headers .= 'X-Mailer: PHP/' . phpversion();
// 
    // Use SMTP if configured
    // if (!empty($this->smtp)) {
    //   return $this->smtp_send();
    // }
// 
    // Use PHP's mail() function
    // if (mail($this->to, $this->subject, $this->message, $headers)) {
    //   return 'OK';
    // } else {
    //   return 'Failed to send email. Please try again later.';
    // }
//   }
// 
//   private function smtp_send() {
    // Requires PHPMailer library
    // if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    //   require 'PHPMailer/PHPMailer.php';
    //   require 'PHPMailer/SMTP.php';
    //   require 'PHPMailer/Exception.php';
    // }
// 
    // $mail = new \PHPMailer\PHPMailer\PHPMailer();
// 
    // try {
    //   $mail->isSMTP();
    //   $mail->Host = $this->smtp['host'];
    //   $mail->SMTPAuth = true;
    //   $mail->Username = $this->smtp['username'];
    //   $mail->Password = $this->smtp['password'];
    //   $mail->SMTPSecure = 'tls';
    //   $mail->Port = $this->smtp['port'];
// 
    //   $mail->setFrom($this->from_email, $this->from_name);
    //   $mail->addAddress($this->to);
    //   $mail->addReplyTo($this->from_email, $this->from_name);
// 
    //   $mail->Subject = $this->subject;
    //   $mail->Body    = $this->message;
// 
    //   if ($mail->send()) {
        // return 'OK';
    //   } else {
        // return 'Failed to send email. Mailer Error: ' . $mail->ErrorInfo;
    //   }
    // } catch (Exception $e) {
    //   return 'Failed to send email. Exception: ' . $e->getMessage();
    // }
//   }
// }
<?php

/**
 * PHP Email Form configuration and send
 */

class PHP_Email_Form {

  public $to;
  public $from_name;
  public $from_email;
  public $subject;
  public $smtp;
  public $ajax;

  public $messages = [];

  public function add_message($content, $label, $priority = 5) {
    $this->messages[] = ['content' => $content, 'label' => $label, 'priority' => $priority];
  }

  public function send() {
    // Logic to send mail with PHP `mail()` or SMTP
    // This file harus lengkap dari BootstrapMade
    // Bisa juga menggunakan PHPMailer jika kamu mengaturnya
    return 'OK'; // sementara simulasi sukses
  }

}
