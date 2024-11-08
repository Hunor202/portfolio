<?php
require("data.php");
require("usersData.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $card = $_POST['card'];
    $name = $_POST['name'];
    echo $card;
    echo $name;
    if ($name != "admin") {
        sell($card, $name);
    } else {
        $page = 'user-details.php?name=' . $name;
        header("Location: $page");
        exit();
    }
}

function sell($card, $name)
{
    global $Cards;
    global $Users;
    $price = $Cards[$card]['price'];
    $Users[$name]['money'] += $price * 0.9;
    $Cards[$card]['owner'] = "admin";
    $cardNumber = preg_replace('/[^0-9]/', '', $card);
    $Users['admin']['cards'][$cardNumber] = intval($cardNumber);
    unset($Users[$name]['cards'][$cardNumber]);
    file_put_contents('usersData.php', '<?php $Users = ' . var_export($Users, true) . ';');
    file_put_contents('data.php', '<?php $Cards = ' . var_export($Cards, true) . ';');
    $page = 'user-details.php?name=' . $name;
    header("Location: $page");
    exit();
}
?>