<?php
$message_send = $_POST["message"];

file_put_contents('./messages.json', $message_send);

?>