<?php

require_once('includes/head.php');

// only logged in users
require_once('includes/auth-guard.php');

$data = array("a" => "Apple", "b" => "Ball", "c" => "Cat");
json_view($data);