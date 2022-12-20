<?php

function dd($value) {
    ?>
    <pre>
        <?php var_dump($value) ?>
    </pre>
    <?php
}

function json_view($data) {
    header("Content-Type: application/json");
    echo json_encode($data);
    exit();
}

function json_view_with_error($msg, $stack = null) {
    header("Content-Type: application/json");
    $data = (object) [
        'message' => $msg,
        'stack' => $_ENV['current_env'] === 'development' ? $stack : null
    ];
    echo json_encode($data);
    exit();
}