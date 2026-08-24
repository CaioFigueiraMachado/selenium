<?php
session_start();
if (isset($_SESSION['user_id'])) {
    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACME Digital - Login</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container">
        <div class="login-box">
            <div class="logo-container">
                <h1>ACME</h1>
                <span class="badge">Digital</span>
            </div>
            <h2>Login</h2>
            
            <!-- SEM PROTEÇÃO - Vulnerável a XSS -->
            <?php if (isset($_GET['msg'])): ?>
                <div class="alert alert-<?php echo $_GET['type'] ?? 'info'; ?>">
                    <?php echo $_GET['msg']; ?>
                </div>
            <?php endif; ?>
            
            <!-- SEM PROTEÇÃO - Envia dados diretamente -->
            <!-- index.php - VERSÃO PARA TESTE -->
<form id="loginForm" action="process_login.php" method="POST">
    <div class="input-group">
        <label for="loginEmail">E-mail</label>
        <input type="text" id="email" name="email" placeholder="seu@email.com" required>
        <!--        ↑ ID para o Selenium -->
    </div>
    <div class="input-group">
        <label for="loginPassword">Senha</label>
        <input type="password" id="senha" name="password" placeholder="********" required>
        <!--                ↑ ID para o Selenium -->
    </div>
    <button type="submit" id="btn-login" class="btn btn-primary">Entrar</button>
    <!--                     ↑ ID para o Selenium -->
</form>

<!-- Div para mensagens (colocar depois do form) -->
<div id="mensagem">
    <?php if (isset($_GET['msg'])): ?>
        <div class="alert alert-<?php echo $_GET['type'] ?? 'info'; ?>">
            <?php echo $_GET['msg']; ?>
        </div>
    <?php endif; ?>
</div>
    <script src="assets/js/validation.js"></script>
</body>
</html>