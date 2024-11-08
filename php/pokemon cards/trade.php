<?php
require('usersData.php');
require('data.php');
$name = $_POST['name'];
$tradeCard1 = $_POST['tradecard1'];
if (isset($_POST['tradecard2'])) {
    $tradeCard2 = $_POST['tradecard2'];
    trade($tradeCard1, $tradeCard2);
}

function trade($t1, $t2)
{
    global $Cards;
    global $Users;
    global $name;
    $owner = $Cards[$t1]['owner'];
    $cardNumber1 = preg_replace('/[^0-9]/', '', $t1);
    $cardNumber2 = preg_replace('/[^0-9]/', '', $t2);
    $Users[$name]['cards'][$cardNumber1] = intval($cardNumber1);
    $Users[$owner]['cards'][$cardNumber2] = intval($cardNumber2);
    unset($Users[$name]['cards'][$cardNumber2]);
    unset($Users[$owner]['cards'][$cardNumber1]);
    $Cards[$t1]['owner'] = $name;
    $Cards[$t2]['owner'] = $owner;
    file_put_contents('usersData.php', '<?php $Users = ' . var_export($Users, true) . ';');
    file_put_contents('data.php', '<?php $Cards = ' . var_export($Cards, true) . ';');
    $page = 'index.php?name=' . $name . '&password=' . $Users[$name]['password'];
    header("Location: $page");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
    echo '<title>IKémon | Trade </title>';
    ?>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/cards.css">
</head>

<body>
    <header>
        <?php
        echo '<h1><a href="index.php?name=' . $name . '&password=' . $Users[$name]['password'] . '">IKémon</a> > User: ' . $name . '</h1>';
        ?>
    </header>

    <?php
    $cT = $Cards[$tradeCard1];
    echo '<div class="pokemon-card">';
    echo '<div class="image clr-' . $cT['type'] . '">';
    echo '<img src="' . $cT['image'] . '" alt="">';
    echo '</div>';
    echo '<div class="details">';
    echo '<h2><a href="card-details.php?id=card' . $tradeCard1 . '&name=' . $name . '&password=' . $Users[$name]['password'] . '">' . $cT['name'] . '</a></h2>';
    echo '<span class="card-type"><span class="icon">🏷</span>' . $cT['type'] . '</span>';
    echo '<span class="attributes">';
    echo '<span class="card-hp"><span class="icon">❤</span>' . $cT['hp'] . '</span>';
    echo '<span class="card-attack"><span class="icon">⚔</span>' . $cT['attack'] . '</span>';
    echo '<span class="card-defense"><span class="icon">🛡</span>' . $cT['defense'] . '</span>';
    echo '</span>';
    echo '</div>';
    echo '</div>';
    ?>

    <div id="content">
        <div id="card-list">
            <?php
            foreach ($Users[$name]['cards'] as $key) {
                $c = $Cards['card' . $key];
                echo '<div class="pokemon-card">';
                echo '<div class="image clr-' . $c['type'] . '">';
                echo '<img src="' . $c['image'] . '" alt="">';
                echo '</div>';
                echo '<div class="details">';
                echo '<h2><a href="card-details.php?id=card' . $key . '&name=' . $name . '&password=' . $Users[$name]['password'] . '">' . $c['name'] . '</a></h2>';
                echo '<span class="card-type"><span class="icon">🏷</span>' . $c['type'] . '</span>';
                echo '<span class="attributes">';
                echo '<span class="card-hp"><span class="icon">❤</span>' . $c['hp'] . '</span>';
                echo '<span class="card-attack"><span class="icon">⚔</span>' . $c['attack'] . '</span>';
                echo '<span class="card-defense"><span class="icon">🛡</span>' . $c['defense'] . '</span>';
                echo '</span>';
                echo '<form id="trade' . $key . '" action="trade.php" method="post">';
                echo '<input type="hidden" name="name" value="' . $name . '" />';
                echo '<input type="hidden" name="tradecard1" value="' . $tradeCard1 . '" />';
                echo '<input type="hidden" name="tradecard2" value="card' . $key . '" />';
                echo '<button class="buy-sellButton" onclick="submitForm("trade' . $key . '")>';
                echo '<div class="buy">';
                echo '<span class="card-price">Trade</span>';
                echo '</form>';
                echo '</div>';
                echo '</button>';
                echo '</div>';
                echo '</div>';
            }
            ?>

        </div>
    </div>

    <script>
        function submitForm($form) {
            if ($name != 'admin') {
                document.getElementById($form).submit();
            }
        }
    </script>

</body>

</html>