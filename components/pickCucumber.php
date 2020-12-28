<?php
require_once __DIR__ . '\sql.php';

if(empty($_POST['id']) || empty($_POST['amount'])){
    echo json_encode(["error" => 'Nuskinti nepavyko.']);
    return;
}

$id = $_POST['id'];
$amount = preg_replace('/[^0-9]/', '', $_POST['amount']);

if($amount!=$_POST['amount'] || $amount<0){
    echo json_encode(["error" => 'Prasome pasitikslinti skinama kieki.']);
    return;
}

$sql = $conn->query("SELECT count FROM garden WHERE id = '$id'");
if(!($sql->num_rows)){
    echo json_encode(["error" => 'Tokiu agurku nera']);
    return;
}

while ($row = $sql->fetch_assoc()) $u_amount = $row["count"];

if($u_amount-$amount<0){
    echo json_encode(["error" => 'Kiekis negali buti neigiamas.']);
    return;
}

$conn->query("UPDATE garden SET count = count - $amount WHERE id = '$id'");