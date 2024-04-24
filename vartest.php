<?php
echo "<h1>Superglobal Variables</h1>";

echo "<h2> \$_SERVER:</h2>";
echo "<pre>";
print_r($_SERVER);
echo "</pre>";

echo "<h2> \$_GET:</h2>";
echo "<pre>";
print_r($_GET);
echo "</pre>";

echo "<h2> \$_POST:</h2>";
echo "<pre>";
print_r($_POST);
echo "</pre>";

echo "<h2> \$_FILES:</h2>";
echo "<pre>";
print_r($_FILES);
echo "</pre>";

echo "<h2> \$_COOKIE:</h2>";
echo "<pre>";
print_r($_COOKIE);
echo "</pre>";

echo "<h2> \$_SESSION:</h2>";
echo "<pre>";
print_r($_SESSION);
echo "</pre>";

echo "<h2> \$_REQUEST:</h2>";
echo "<pre>";
print_r($_REQUEST);
echo "</pre>";

echo "<h2> \$_ENV:</h2>";
echo "<pre>";
print_r($_ENV);
echo "</pre>";

echo "<h2> \$_GLOBALS:</h2>";
echo "<pre>";
print_r($GLOBALS);
echo "</pre>";
?>
