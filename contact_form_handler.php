<?php
// Server-side code to validate entered data by the user
$errors = '';
$myemail = 'arshdeepkarwalyt@gmail.com';

if(
    empty($_POST['name']) ||
    empty($_POST['email']) ||
    empty($_POST['message'])
    )
{
    $errors .= "\n Error: all fields are required";
}

$name = $_POST['name'] ?? null;
$email_address = $_POST['email'] ?? null;
$message = $_POST['message'] ?? null;

// if(
//     !preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", $email_address))
// {
//     $errors .= "\n Error: Invalid email address";
// }

if(empty($errors))
{
$to_email = $myemail;
$email_subject = "Contact form submission: $name";
$email_body = "You have received a new message. Here are the details:\n
Name: $name
Email: $email_address\n
Message: \n$message";

$headers = "From: $myemail\n";

if(mail($to_email, $email_subject, $email_body, $headers)){
    header("Location: " . "http://" . $_SERVER['HTTP_HOST'] . $location);
    exit;
}
else{
    echo "Email sending failed...";
}
}
?>