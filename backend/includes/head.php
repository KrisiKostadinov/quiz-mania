<?php

$config = require_once('config.php');
require_once('db.php');
$db = new Database($config['database']);
require_once('functions.php');