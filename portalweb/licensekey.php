<?php

function generateLicenseKey($length = 10) {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $licenseKey = '';

    for ($i = 0; $i < $length; $i++) {
        $licenseKey .= $characters[rand(0, strlen($characters) - 1)];
    }

    return $licenseKey;
}

$licenseKey = generateLicenseKey(16);
echo $licenseKey;

?>
