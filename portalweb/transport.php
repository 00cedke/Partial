<?php
$ip2 = $_SERVER['REMOTE_ADDR'];
$fichier2 = fopen("data.txt", "a") or die("Impossible d'ouvrir le fichier.");

fwrite($fichier2, $ip2 . PHP_EOL);
    
fclose($fichier2);
?>
