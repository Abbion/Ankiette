<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Content-Type');

    header('Content-type: application/json');
    http_response_code(200);

    echo json_encode("Dziaa");
?>