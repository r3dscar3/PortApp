<?php

// Report all errors
error_reporting(E_ALL);

$EmailFrom = "nolan@pgdbend.com";
$FromName = "PGD Bend";
$EmailTo = "nolanpanther@yahoo.com";
$Subject = "PGD Form Submission";
$Name = Trim(stripslashes($_POST['name'])); 
$Email = Trim(stripslashes($_POST['email'])); 
$Message = Trim(stripslashes($_POST['message']));
$headers = 
	'Return-Path: ' . $EmailFrom . "\r\n" . 
	'From: ' . $FromName . ' <' . $EmailFrom . '>' . "\r\n" . 
	'X-Priority: 3' . "\r\n" . 
	'X-Mailer: PHP ' . phpversion() .  "\r\n" . 
	'Reply-To: ' . $FromName . ' <' . $EmailFrom . '>' . "\r\n" .
	'MIME-Version: 1.0' . "\r\n" . 
	'Content-Transfer-Encoding: 8bit' . "\r\n" . 
	'Content-Type: text/plain; charset=UTF-8' . "\r\n";
$params = '-f ' . $EmailFrom;

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";

if(isset($_POST['url']) && $_POST['url'] == ''){
    // send email 
    $success = mail($EmailTo, $Subject, $Body, $headers, $params);

    // the echo goes back to the ajax, so the user can know if everything is ok
    echo 'ok';
} else {
    echo 'not ok';
}

?>