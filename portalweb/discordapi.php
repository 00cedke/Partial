<?php
function get_user_ip() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

$user_ip = get_user_ip();

$webhook_url = 'https://discord.com/api/webhooks/1228791358400237648/xiv8SqKydiCeAb_W4i3W1tMTe726PR5JQ60NGTdYCiUJ86L0BmtVbaBOGYTFxneFTKso';

$message = array('content' => '$ip connected on http://localhost:8080');

$message_json = json_encode($message);

$ch = curl_init($webhook_url);

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $message_json);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$response = curl_exec($ch);

if ($response === false) {
    echo 'Erreur cURL : ' . curl_error($ch);
} else {
    echo 'Réponse Discord : ' . $response;
}

curl_close($ch);
?>
