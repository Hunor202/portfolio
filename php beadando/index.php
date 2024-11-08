<?php
require('usersData.php');
$types = ["electric", "fire", "grass", "water", "bug", "normal", "poison"];
$loggedIn = false;
$name = "";
$errors = [];
if ($_GET) {
    $ok = true;
    if ($_GET['name'] != "" && $_GET['password'] != "") {
        $name = $_GET['name'];
        $password = $_GET['password'];
        if (!key_exists($name, $Users) || $Users[$name]['password'] != $password) {
            $errors[] = "Invalid datas!";
            $ok = false;
        }
    } else {
        $ok = false;
    }
    if ($ok) {
        $loggedIn = true;
    }
}
?>

<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IKémon | Home</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/cards.css">

</head>

<body>
    <header>

        <?php
        if (!$loggedIn) {
            echo '<h1><a href="index.php">IKémon</a> > Home</h1>';
            echo '<h2><a href="login.php">Log in</a></h2>';
            echo '<h2><a href="registration.php">Registration</a></h2>';
        } else {
            echo '<h1><a href="index.php?name=' . $name . '&password=' . $Users[$name]['password'] . '">IKémon</a> > Home</h1>';
            if ($name == 'admin') {
                echo '<h2><a href="newCard.php">New card</a></h2>';
            }
            echo '<h2><a href="index.php">Log out</a></h2>';
        }
        ?>
    </header>

    <?php
    if (count($errors) > 0) {
        foreach ($errors as $error) {
            echo $error . '<br>';
        }
    }

    if ($loggedIn) {
        echo 'Name: <a href="user-details.php?name=' . $name . '">' . $name . '</a><br>';
        echo 'Money: ' . $Users[$name]['money'] . '<br>';
        if ($name != "admin") {
            echo '<form id="randomBuy" action="randomBuy.php" method="post">';
            echo '<input type="hidden" name="name" value="' . $name . '" />';
            echo '</form>';
            echo '<button onclick="submitForm(\'randomBuy\')">Buy a random card for 50</button>';
        }
    }
    ?>

    <form action="" method="post">
        <label for="filter">Filter by type:</label>
        <select id="type" name="type">
            <option value="" disabled selected>Select type</option>
            <option value="all">all</option>
            <?php
            foreach ($types as $type) {
                echo '<option value="' . $type . '">' . $type . '</option>';
            }
            ?>
        </select>
        <br>
        <input type="submit" value="Filter">
    </form>

    <div id="content">
        <div id="card-list">
            <?php
            require('data.php');
            $type = "";
            if (isset($_POST['type'])) {
                $type = $_POST['type'];
            }
            foreach ($Cards as $key => $c) {
                if ($type == "" || $type == "all" || $type == $c['type']) {
                    echo '<div class="pokemon-card">';
                    echo '<div class="image clr-' . $c['type'] . '">';
                    echo '<img src="' . $c['image'] . '" alt="">';
                    echo '</div>';
                    echo '<div class="details">';
                    if ($loggedIn) {
                        echo '<h2><a href="card-details.php?id=' . $key . '&name=' . $name . '&password=' . $password . '">' . $c['name'] . '</a></h2>';
                    } else {
                        echo '<h2><a href="card-details.php?id=' . $key . '">' . $c['name'] . '</a></h2>';
                    }
                    echo '<span class="card-type"><span class="icon">🏷</span>' . $c['type'] . '</span>';
                    echo '<span class="attributes">';
                    echo '<span class="card-hp"><span class="icon">❤</span>' . $c['hp'] . '</span>';
                    echo '<span class="card-attack"><span class="icon">⚔</span>' . $c['attack'] . '</span>';
                    echo '<span class="card-defense"><span class="icon">🛡</span>' . $c['defense'] . '</span>';
                    echo '</span>';
                    if ($loggedIn) {
                        if ($c['owner'] == 'admin') {
                            echo '<button class="buy-sellButton" onclick="submitForm(\'buy' . $key . '\')" value="' . $key . '">';
                            echo '<form id="buy' . $key . '" action="buy.php" method="post">';
                            echo '<input type="hidden" name="name" value="' . $name . '" />';
                            echo '<input type="hidden" name="card" value="' . $key . '" />';
                            echo '<div class="buy">';
                            echo '<span class="card-price"><span class="icon">💰</span>' . $c['price'] . '</span>';
                            echo '</div>';
                            echo '</form>';
                            echo '</button>';
                        } else if ($c['owner'] == $name) {
                            echo '<div class="buy">';
                            echo '<span class="card-price">Own</span>';
                            echo '</div>';
                        } else if ($name == 'admin') {
                            echo '<div class="buy">';
                            echo '<span class="card-price">Sold</span>';
                            echo '</div>';
                        } else {
                            echo '<button class="buy-sellButton" onclick="submitForm(\'trade' . $key . '\')" value="' . $key . '">';
                            echo '<form id="trade' . $key . '" action="trade.php" method="post">';
                            echo '<input type="hidden" name="name" value="' . $name . '" />';
                            echo '<input type="hidden" name="tradecard1" value="' . $key . '" />';
                            echo '<div class="buy">';
                            echo '<span class="card-price">Trade</span>';
                            echo '</div>';
                            echo '</form>';
                            echo '</button>';
                        }

                    }
                    echo '</div>';
                    echo '</div>';
                }
            }
            ?>


        </div>
    </div>
    <script>
        function submitForm(form) {
            document.getElementById(form).submit();
        }
    </script>
</body>

</html>