<?php
$servername = "localhost";
$database = "fh4umf1d_db_chat-chat";
$username = "fh4umf1d_Lancelot";
$password = "JackBoo17";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, content, id_user, name_user, date, time FROM messages";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

  $arr = [];

  while($row = $result->fetch_assoc()) {
    array_push($arr, $row);
  }

  echo json_encode($arr);
  

} else {
  echo "0 results";
}
$conn->close();
?>