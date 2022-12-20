<?php

require_once('includes/head.php');

$email = $_POST['email'];
$user = $db->get('users', "WHERE email = '$email'");

if (! empty($user) ) {
    json_view_with_error('This user already exists!');
}

$_POST['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);
$db->create('users', $_POST);
$user = $db->get('users', "WHERE email = '$email'");

unset($user['password']);
json_view($user);