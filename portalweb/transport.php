<?php
$ip2 = $_SERVER['REMOTE_ADDR'];
$fichier2 = fopen("data.txt", "a") or die("Impossible d'ouvrir le fichier.");

fwrite($fichier2, $ip2 . PHP_EOL);
    
fclose($fichier2);

if(isset($_GET['message'])) {
    $message = $_GET['message'];

    $ip = $_SERVER['REMOTE_ADDR'];
    
    $fichier = fopen("data.txt", "a") or die("Impossible d'ouvrir le fichier.");

    fwrite($fichier, $message . PHP_EOL);
    
    fclose($fichier);
    
    echo "success";
} else {
    echo "false";
}
?>
