<?php
require('usersData.php');
$name = $_GET['name'];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
    echo '<title>IKémon | User: ' . $name . '</title>';
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
    echo 'Name: ' . $name . '<br>';
    echo 'E-mail: ' . $Users[$name]['email'] . '<br>';
    echo 'Money: ' . $Users[$name]['money'] . '<br>';
    echo 'Cards:<br>';
    ?>

    <div id="content">
        <div id="card-list">
            <?php
            require('data.php');
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
                echo '<form id="sell' . $key . '" action="sell.php" method="post">';
                echo '<input type="hidden" name="name" value="' . $name . '" />';
                echo '<input type="hidden" name="card" value="card' . $key . '" />';
                echo '<button class="buy-sellButton" onclick="submitForm("sell' . $key . '")>';
                echo '<div class="buy">';
                echo '<span class="card-price"><span class="icon">💰</span>' . ($c['price'] * 0.9) . ' Sell</span>';
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