<?php
$ip = $_SERVER['REMOTE_ADDR'];

$token = "https://discord.com/api/webhooks/1228227307727224853/T8B6uR1RpLanuGaRXdcy5vS-u4nX0S3iGJ8GnEK_rFioGa2veDvAs-i1fyJH0c3i8W2s";

$data = array(
    "content" => "$ip conencted on partial.great-site.net"
);

$jsonData = json_encode($data);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_HTTPHEADER => array(
        "Content-Type: application/json"
    ),
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $jsonData,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYPEER => false
));

$response = curl_exec($curl);

curl_close($curl);

echo $response;
?>
