<?php
require('data.php');
$name = "";
$errors = [];
$types = ["electric", "fire", "grass", "water", "bug", "normal", "poison"];
$type = "";
$hp = "";
$attack = "";
$defense = "";
$price = "";
$description = "";
$image = "";
if ($_GET) {
    $ok = true;
    if ($_GET['name'] != NULL) {
        $name = $_GET['name'];
        $nameExists = false;

        foreach ($Cards as $card) {
            if ($card['name'] === $name) {
                $nameExists = true;
                break; // exit the loop once a match is found
            }
        }

        if ($nameExists) {
            $errors[] = "This name is already exist!";
            $ok = false;
        }
    } else {
        $errors[] = "Missing name!";
        $ok = false;
    }

    if ($_GET['type'] != NULL) {
        $type = $_GET['type'];
        if (!in_array($type, $types)) {
            $errors[] = "This type is not exist!";
            $ok = false;
        }
    } else {
        $errors[] = "Missing type!";
        $ok = false;
    }

    if ($_GET['hp'] != NULL) {
        if (ctype_digit($_GET['hp'])) {
            $hp = intval($_GET['hp']);
            if ($hp < 0 || $hp > 1000) {
                $errors[] = "Hp must be between 1 and 999 !";
                $ok = false;
            }
        } else {
            $errors[] = "Hp must be a number!";
            $ok = false;
        }
    } else {
        $errors[] = "Missing hp!";
        $ok = false;
    }

    if ($_GET['attack'] != NULL) {
        if (ctype_digit($_GET['attack'])) {
            $attack = intval($_GET['attack']);
            if ($attack < 0 || $attack > 1000) {
                $errors[] = "Attack must be between 1 and 999 !";
                $ok = false;
            }
        } else {
            $errors[] = "Attack must be a number!";
            $ok = false;
        }
    } else {
        $errors[] = "Missing attack!";
        $ok = false;
    }

    if ($_GET['defense'] != NULL) {
        if (ctype_digit($_GET['defense'])) {
            $defense = intval($_GET['defense']);
            if ($defense < 0 || $defense > 1000) {
                $errors[] = "Defense must be between 1 and 999 !";
                $ok = false;
            }
        } else {
            $errors[] = "Defense must be a number!";
            $ok = false;
        }
    } else {
        $errors[] = "Missing defense!";
        $ok = false;
    }

    if ($_GET['price'] != NULL) {
        if (ctype_digit($_GET['price'])) {
            $price = intval($_GET['price']);
            if ($price < 0 || $price > 1000) {
                $errors[] = "Price must be between 1 and 999 !";
                $ok = false;
            }
        } else {
            $errors[] = "Price must be a number!";
            $ok = false;
        }
    } else {
        $errors[] = "Price defense!";
        $ok = false;
    }

    if ($_GET['description'] != NULL) {
        $description = $_GET['description'];
    } else {
        $errors[] = "Missing description!";
        $ok = false;
    }

    if ($_GET['image'] != NULL) {
        $image = $_GET['image'];
    } else {
        $errors[] = "Missing image!";
        $ok = false;
    }

    if ($ok) {
        $cardNumber = count($Cards);
        $Cards['card' . $cardNumber] = array(
            'name' => $name,
            'type' => $type,
            'hp' => $hp,
            'attack' => $attack,
            'defense' => $defense,
            'price' => $price,
            'description' => $description,
            'image' => $image,
            'owner' => 'admin',
        );
        file_put_contents('data.php', '<?php $Cards = ' . var_export($Cards, true) . ';');
        $page = 'index.php?name=admin&password=admin';
        header("Location: $page");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IKémon | New card</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/details.css">
</head>

<body>
    <header>
        <h1><a href="index.php?name=admin&password=admin">IKémon</a> > New card</h1>
    </header>



    <?php
    if (count($errors) > 0) {
        foreach ($errors as $error) {
            echo $error . '<br>';
        }
    }
    ?>

    <form action="" id="newCardForm" method="get" novalidate>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" novalidate>
        <br>

        <label for="type">Type:</label>
        <select id="type" name="type">
            <?php
            foreach ($types as $type) {
                echo '<option value="' . $type . '">' . $type . '</option>';
            }
            ?>
        </select>
        <br>

        <label for="hp">Hp:</label>
        <input type="text" id="hp" name="hp" novalidate>
        <br>

        <label for="attack">Attack:</label>
        <input type="text" id="attack" name="attack" novalidate>
        <br>

        <label for="defense">Defense:</label>
        <input type="text" id="defense" name="defense" novalidate>
        <br>

        <label for="price">Price:</label>
        <input type="text" id="price" name="price" novalidate>
        <br>

        <label for="description">Description:</label>
        <input type="text" id="description" name="description" novalidate>
        <br>

        <label for="image">Image:</label>
        <input type="text" id="image" name="image" novalidate>
        <br>

        <input id="submitButton" type="submit" value="Add">
    </form>
</body>

</html>