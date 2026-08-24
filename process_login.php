<?php
session_start();

// SEM PROTEÇÃO - Vulnerável a SQL Injection e XSS
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// SEM PROTEÇÃO - Concatenação direta no SQL (SQL Injection)
$sql = "SELECT id, nome, email, senha FROM usuarios WHERE email = '$email'";

// Conexão direta sem tratamento de erro
$conn = mysqli_connect('localhost', 'root', '', 'acme_digital');
$result = mysqli_query($conn, $sql);
$user = mysqli_fetch_assoc($result);

// SEM PROTEÇÃO - Senha em texto plano (sem hash)
if ($user && $password == $user['senha']) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['nome'];
    $_SESSION['user_email'] = $user['email'];
    
    // SEM PROTEÇÃO - Redirecionamento vulnerável
    header("Location: dashboard.php?msg=Login realizado com sucesso!&type=success");
} else {
    header("Location: index.php?msg=Credenciais inválidas!&type=error");
}
exit;
?>