<?php
// Сообщение
$message = "Пришла заявка! \r\nНода: " . $_POST['node'] . "\r\nПериод: " . $_POST['period'] . "\r\nEmail: "
 . $_POST['email'] . "\r\nИмя: " . $_POST['name'];

// На случай если какая-то строка письма длиннее 70 символов мы используем wordwrap()
$message = wordwrap($message, 70, "\r\n");

// Отправляем
mail('deadcourtyardwood@gmail.com', 'Nodes', $message);
?>