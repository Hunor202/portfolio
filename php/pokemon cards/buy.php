<?php
require("data.php");
require("usersData.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $card = $_POST['card'];
    $name = $_POST['name'];
    buy($card, $name);
}

function buy($card, $name)
{
    global $Cards;
    global $Users;
    $price = $Cards[$card]['price'];
    $money = $Users[$name]['money'];
    $cardNumber = preg_replace('/[^0-9]/', '', $card);
    $oldOwner = $Cards[$card]['owner'];
    if ($money >= $price && $oldOwner == "admin" && count($Users[$name]['cards']) < 5 && $name != 'admin') {
        $Users[$name]['money'] = $money - $price;
        $oldOwner = $Cards[$card]['owner'];
        unset($Users[$oldOwner]['cards'][$cardNumber]);
        $Cards[$card]['owner'] = $name;
        $Users[$name]['cards'][$cardNumber] = intval($cardNumber);
        file_put_contents('usersData.php', '<?php $Users = ' . var_export($Users, true) . ';');
        file_put_contents('data.php', '<?php $Cards = ' . var_export($Cards, true) . ';');
    }
    $page = 'index.php?name=' . $name . '&password=' . $Users[$name]['password'];
    header("Location: $page");
    exit();
}
?>