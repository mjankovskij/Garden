<?php
require_once __DIR__ . '\sql.php';
$rand = rand(1,3);
$conn->multi_query("INSERT INTO garden (img , count) VALUES ('$rand', '0');");
