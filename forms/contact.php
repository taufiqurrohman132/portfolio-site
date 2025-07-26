<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address

// Replace with your real receiving email address
$receiving_email_address = 'taufiqurrohman132132@gmail.com';

if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
  include($php_email_form);
} else {
  die('Unable to load the "PHP Email Form" Library!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;

$contact->to = $receiving_email_address;
$contact->from_name = $_POST['name'];
$contact->from_email = $_POST['email'];
$contact->subject = $_POST['subject'];

// Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials

// $contact->smtp = array(
//   'host' => 'smtp.gmail.com',
//   'username' => 'emailkamu@gmail.com',
//   'password' => 'password_aplikasi_gmail',
//   'port' => '587'
// );

$contact->add_message($_POST['name'], 'From');
$contact->add_message($_POST['email'], 'Email');
isset($_POST['phone']) && $contact->add_message($_POST['phone'], 'Phone', 3);
$contact->add_message($_POST['message'], 'Message', 10);

echo $contact->send();

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//   $to = "taufiqurrohman132132@gmail.com";
//   $subject = strip_tags(trim($_POST["subject"]));
//   $name = strip_tags(trim($_POST["name"]));
//   $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
//   $message = strip_tags(trim($_POST["message"]));
//   $phone = isset($_POST["phone"]) ? strip_tags(trim($_POST["phone"])) : '';

//   $email_body = "Nama: $name\nEmail: $email\nTelepon: $phone\n\nPesan:\n$message\n";
//   $headers = "From: $name <$email>";

//   if (mail($to, $subject, $email_body, $headers)) {
//     http_response_code(200);
//     echo "OK";
//   } else {
//     http_response_code(500);
//     echo "Gagal mengirim pesan. Coba lagi.";
//   }
// } else {
//   http_response_code(403);
//   echo "Metode tidak valid.";
// }


?>
