<?php

$db = new PDO('sqlite:database.sqlite');

$db->exec("
CREATE TABLE IF NOT EXISTS entries(
id INTEGER PRIMARY KEY,
team TEXT,
user TEXT,
date TEXT,
status TEXT
)");

$data=json_decode(file_get_contents("php://input"),true);

$action=$data["action"];

if($action==="add"){
$stmt=$db->prepare("
INSERT INTO entries(team,user,date,status)
VALUES(?,?,?,?)
");
$stmt->execute([
$data["team"],
$data["user"],
$data["date"],
$data["status"]
]);
echo json_encode(["ok"=>true]);
}

if($action==="list"){
$stmt=$db->prepare("
SELECT * FROM entries WHERE team=?
");
$stmt->execute([$data["team"]]);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}
