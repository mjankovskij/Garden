<?php
require_once __DIR__ . '\sql.php';

$sql = $conn->query('SELECT * FROM garden ORDER by id');


while ($row = $sql->fetch_assoc()) {
    $id = $row['id'];
    $img = $row['img'];
    $count = $row['count'];

    $array[] = ['id' =>$id, 'img' =>$img, 'count' => $count];
}

echo json_encode($array);