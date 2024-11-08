<?php
require("data.php");
require("usersData.php");
if ($_POST['name'] != NULL) {
    $name = $_POST['name'];
    randomBuy($name);
}
function randomBuy($name)
{
    $options = array();
    global $Cards;
    global $Users;
    if ($Users[$name]['money'] >= 50) {
        if (count($Users[$name]['cards']) < 5) {
            foreach ($Cards as $key => $c) {
                if ($c['owner'] == "admin") {
                    $options[] = $key;
                }
            }
            if (count($options) != 0) {
                $random = array_rand($options);
                echo $random . '<br>';
                randomBuyF($random, $name);
            }
        }
    }
    $page = 'index.php?name=' . $name . '&password=' . $Users[$name]['password'];
    header("Location: $page");
    exit();
}

function randomBuyF($card, $name)
{
    global $Cards;
    global $Users;
    $oldOwner = $Cards['card' . $card]['owner'];
    $Users[$name]['money'] -= 50;
    $oldOwner = $Cards['card' . $card]['owner'];
    unset($Users[$oldOwner]['cards'][$card]);
    $Cards['card' . $card]['owner'] = $name;
    $Users[$name]['cards'][$card] = intval($card);
    file_put_contents('usersData.php', '<?php $Users = ' . var_export($Users, true) . ';');
    file_put_contents('data.php', '<?php $Cards = ' . var_export($Cards, true) . ';');
    $page = 'index.php?name=' . $name . '&password=' . $Users[$name]['password'];
    header("Location: $page");
    exit();
}
?>