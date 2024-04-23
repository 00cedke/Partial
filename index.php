<?php

$user_ip = $_SERVER['REMOTE_ADDR'];

try {
    $db = new PDO('sqlite:users.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $db->exec("CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                ip TEXT NOT NULL
            )");

    $stmt = $db->prepare("INSERT INTO users (ip) VALUES (:ip)");
    $stmt->bindParam(':ip', $user_ip);
    $stmt->execute();

} catch(PDOException $e) {
    echo "Fucking error : " . $e->getMessage();
}

$db = null;
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta langue="fr">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>PartialVerse - Loading...</title>
	<meta http-equiv="refresh" content="5; URL=portalweb/welcome.html">
</head>
<body>
<img src="https://files.catbox.moe/af556k.webm" width="100%" height="100%">
<audio loop autoplay>
	<source src="portalweb/audio/bootaud.mp3" type="audio/mpeg">
</audio>
<script type="text/javascript">
	if (navigator.userAgent.indexOf('.11274.US') !=-1)
	{
	window.location.href = "welcome.html"
	}
	else if (navigator.userAgent.indexOf('.11274.EU') !=-1)
        {
        window.location.href = "welcome.html"
        }
        else if (navigator.userAgent.indexOf('.11274.JP') !=-1)
        {
        window.location.href = "welcome.html"
        }
        else if (navigator.userAgent.indexOf('.11264') !=-1)
        {
        window.location.href = "welcome.html"
        }
        else if (navigator.userAgent.indexOf('.11224') !=-1)
        {
        window.location.href = "welcome.html"
        }
        else if (navigator.userAgent.indexOf('Nintendo WiiU') !=-1)
        {
        window.location.href = "portalweb/xxx.html"
        }
        else
        {
        window.location.href = "portalweb/wiiu404.html"
        }
</script>
</body>
</html>
