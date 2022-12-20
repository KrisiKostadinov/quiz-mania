<?php

require_once('includes/head.php');
$data = (object) array('1' => 'foo');

json_view($data);