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
        if (!array_key_exists($name, $Users)) {
            $errors[] = "This user does not exist!";
            $ok = false;
        }
    } else {
        $errors[] = "Missing name!";
        $ok = false;
    }
    if ($_GET["password"] != NULL) {
        $password = $_GET["password"];
        if ($password != $Users[$name]['password']) {
            $errors[] = "Invalid password!";
            $ok = false;
        }
    } else {
        $errors[] = "Missing password!";
        $ok = false;
    }
    if ($ok) {
        $page = 'index.php?name=' . $name . '&password=' . $password;
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
    <title>IKémon | Login</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/details.css">
</head>

<body>
    <header>
        <h1><a href="index.php">IKémon</a> > Login</h1>
    </header>



    <?php
    if (count($errors) > 0) {
        foreach ($errors as $error) {
            echo $error . '<br>';
        }
    }
    ?>

    <form action="" id="loginForm" method="get" novalidate>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" novalidate>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" novalidate>

        <input id="submitButton" type="submit" value="Log in">
    </form>
</body>

</html>