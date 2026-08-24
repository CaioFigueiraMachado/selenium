<?php
session_start();

// SEM PROTEÇÃO - Vulnerável a XSS e SQL Injection
$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$confirm_password = $_POST['confirm_password'] ?? '';

// SEM PROTEÇÃO - Conexão direta
$conn = mysqli_connect('localhost', 'root', '', 'acme_digital');

// SEM PROTEÇÃO - SQL Injection
$sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('$nome', '$email', '$password')";
$result = mysqli_query($conn, $sql);

if ($result) {
    header("Location: index.php?msg=Cadastro realizado com sucesso!&type=success");
} else {
    header("Location: cadastro.php?msg=Erro ao cadastrar!&type=error");
}
exit;
?>