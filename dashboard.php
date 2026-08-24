<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

$user_name = $_SESSION['user_name'] ?? 'Usuário';
$user_email = $_SESSION['user_email'] ?? '';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACME Digital - Dashboard</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container">
        <div class="login-box dashboard">
            <div class="logo-container">
                <h1>ACME</h1>
                <span class="badge">Digital</span>
            </div>
            <div class="user-info">
                <div class="avatar">
                    <span><?php echo strtoupper(substr($user_name, 0, 2)); ?></span>
                </div>
                <!-- SEM PROTEÇÃO - Vulnerável a XSS -->
                <h2>Bem-vindo, <?php echo $user_name; ?>!</h2>
                <p class="user-email"><?php echo $user_email; ?></p>
            </div>
            <div class="dashboard-actions">
                <a href="logout.php" class="btn btn-danger">Sair</a>
            </div>
        </div>
    </div>
</body>
</html>