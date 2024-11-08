<?php
require('data.php');
$c = $Cards[$_GET['id']];
$background_color = 'white';
switch ($c['type']) {
    case 'electric':
        $background_color = 'yellow';
        break;
    case 'fire':
        $background_color = 'orange';
        break;
    case 'grass':
        $background_color = 'lightgreen';
        break;
    case 'water':
        $background_color = 'blue';
        break;
    case 'bug':
        $background_color = 'brown';
        break;
    case 'normal':
        $background_color = 'lightyellow';
        break;
    case 'poison':
        $background_color = 'green';
        break;
}

$loggedIn = false;
$name = "";
$password = "";
if (isset($_GET['name']) && isset($_GET['password'])) {
    $name = $_GET['name'];
    $password = $_GET['password'];
    $loggedIn = true;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
    echo '<title>IKémon | ' . $c['name'] . '</title>';
    ?>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/details.css">
    <style>
        <?php
        echo 'body { background-color: ' . $background_color . '; }';
        ?>
    </style>
</head>

<body>
    <header>
        <?php
        if ($loggedIn) {
            echo '<h1><a href="index.php?name=' . $name . '&password=' . $password . '">IKémon</a> > ' . $c['name'] . '</h1>';
        } else {
            echo '<h1><a href="index.php">IKémon</a> > ' . $c['name'] . '</h1>';
        }
        ?>
    </header>
    <div id="content">
        <div id="details">

            <?php
            echo '<div class="image clr-' . $c['type'] . '">';
            echo '<img src="' . $c['image'] . '" alt="">';
            echo '</div>';
            echo '<div class="info">';
            echo '<span>Name: ' . $c['name'] . '</span>';
            echo '<div class="description">' . $c['description'] . '</div>';
            echo '<span class="card-type"><span class="icon">🏷</span> Type: ' . $c['type'] . '</span>';
            echo '<div class="attributes">';
            echo '<span class="card-hp"><span class="icon">❤</span> Health: ' . $c['hp'] . '</span><br>';
            echo '<span class="card-attack"><span class="icon">⚔</span> Attack: ' . $c['attack'] . '</span><br>';
            echo '<span class="card-defense"><span class="icon">🛡</span> Defense: ' . $c['defense'] . '</span><br>';
            echo '</div>';
            echo '</div>';
            ?>
        </div>
    </div>
</body>

</html>