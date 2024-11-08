<?php
require('usersData.php');
$registered = false;
$name = "";
$email = "";
$password = "";
$errors = [];
if ($_GET) {
    $ok = true;
    if ($_GET['name'] != NULL) {
        $name = $_GET['name'];
        if (array_key_exists($name, $Users)) {
            $errors[] = "This name is already taken!";
            $ok = false;
        }
    } else {
        $errors[] = "Missing name!";
        $ok = false;
    }
    if ($_GET["email"] != NULL) {
        $email = $_GET["email"];
        if (!str_contains($email, '@')) {
            $errors[] = "Invalid E-mail!";
            $ok = false;
        }
    } else {
        $errors[] = "Missing E-mail!";
        $ok = false;
    }
    if ($_GET["password1"] != NULL && $_GET["password2"] != NULL) {
        $password = $_GET["password1"];
        $password2 = $_GET["password2"];
        if ($password != $password2) {
            $errors[] = "Passwords do not match!";
            $ok = false;
        }
    } else {
        $errors[] = "Missing password(s)!";
        $ok = false;
    }
    if ($ok) {
        $Users[$name] = array(
            "email" => $email,
            "password" => $password,
            "money" => 1000,
            "isAdmin" => false,
            'cards' => [],
        );
        file_put_contents('usersData.php', '<?php $Users = ' . var_export($Users, true) . ';');
        $registered = true;
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IKémon | Registration</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/details.css">
</head>

<body>
    <header>
        <h1><a href="index.php">IKémon</a> > Registration</h1>
    </header>



    <?php
    if (count($errors) > 0) {
        foreach ($errors as $error) {
            echo $error . '<br>';
        }
    }
    ?>

    <form action="" id="registrationForm" method="get" novalidate>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" novalidate>
        <br>

        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" novalidate>
        <br>

        <label for="password1">Password:</label>
        <input type="password" id="password1" name="password1" novalidate>
        <br>

        <label for="password2">Password again:</label>
        <input type="password" id="password2" name="password2" novalidate>
        <br>

        <input id="submitButton" type="submit" value="Registration">
    </form>

    <?php
    if ($registered) {
        $page = 'index.php?name=' . $name . '&password=' . $password;
        header("Location: $page");
        exit();
    }
    ?>
</body>

</html>