<?php
$message_send = $_POST["message"];

file_put_contents('../data/messages.json', $message_send);

?>