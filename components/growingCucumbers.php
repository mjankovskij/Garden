<?php
require_once __DIR__ . '\sql.php';

foreach($_POST as $key=>$item){
$conn->query("UPDATE garden SET count = count + $item WHERE id = '$key'");
}
