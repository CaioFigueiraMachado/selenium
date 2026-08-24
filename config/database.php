<?php
// Configuração do banco de dados - SEM PROTEÇÃO
define('DB_HOST', 'localhost');
define('DB_NAME', 'acme_digital');
define('DB_USER', 'root');
define('DB_PASS', '');

// Conexão simples sem PDO
function getConnection() {
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    return $conn;
}
?>