<?php

$message = json_decode($_POST["message"]);

$content = $message -> content;
$id_user = $message -> id_user;
$name_user = $message -> name_user;
$date = $message -> date;
$time = $message -> time;

$servername = "localhost";
$database = "fh4umf1d_db_chat-chat";
$username = "fh4umf1d_Lancelot";
$password = "JackBoo17";
// Create connection using musqli_connect function
$conn = mysqli_connect($servername, $username, $password, $database);
// Connection Check

if (!$conn) {
    die("Connection failed: " . $conn->connect_error);
}

else{
  //insert query
$qu="INSERT INTO messages(content, id_user, name_user, date, time) VALUES ('$content', '$id_user', '$name_user', '$date', '$time')";
//query execution
if($conn->query($qu)===TRUE){

echo "Inserted Successfully";
   $conn->close();
}else{
echo "Insert Failed ".$conn->error;
$conn->close();
}
}

?>