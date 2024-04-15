<?php

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

socket_bind($socket, '127.9.2.1', 8080);

socket_listen($socket);

echo "connecting to the server..\n";

while (true) {
    $clientSocket = socket_accept($socket);

    $request = socket_read($clientSocket, 1024);

    $response = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n";
    $response .= "<h1>test</h1>";

    socket_write($clientSocket, $response, strlen($response));

    socket_close($clientSocket);
}

socket_close($socket);
?>
