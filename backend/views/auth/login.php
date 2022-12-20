<?php

require_once('includes/head.php');
require_once('jwt.php');

$email = $_POST['email'];
$user = $db->get('users', "WHERE email = '$email'");

if (! empty($user) && password_verify($_POST['password'], $user['password']) ) {
    unset($user['password']);

    $headers = array('alg'=>'HS256','typ'=>'JWT');
    $payload = array('email'=>$email, 'exp'=>((time() + 60) * 60 * 24)); // 24 hours

    $jwt = generate_jwt($headers, $payload);
    $data = (object) [
        'token' => $jwt
    ];
    json_view($data);
}

json_view_with_error('Invalid email or password');