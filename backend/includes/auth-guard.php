<?php

require_once('jwt.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$bearer_token = get_bearer_token();
$is_jwt_valid = is_jwt_valid($bearer_token);

if (! $is_jwt_valid ) {
    json_view_with_error('Don\'t authenticated');
}
