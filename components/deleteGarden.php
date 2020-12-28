<?php
require_once __DIR__ . '\sql.php';
// print_r($_POST);
$id = $_POST['id'];

$conn->query("DELETE FROM garden WHERE id='$id'");

echo json_encode([
    "message" => "Agurku sodas $id istrintas.",
]);