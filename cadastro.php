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
    <title>ACME Digital - Cadastro</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container">
        <div class="login-box">
            <div class="logo-container">
                <h1>ACME</h1>
                <span class="badge">Digital</span>
            </div>
            <h2>Cadastro</h2>
            
            <!-- SEM PROTEÇÃO - Vulnerável a XSS -->
            <?php if (isset($_GET['msg'])): ?>
                <div class="alert alert-<?php echo $_GET['type'] ?? 'info'; ?>">
                    <?php echo $_GET['msg']; ?>
                </div>
            <?php endif; ?>
            
            <form id="registerForm" action="process_register.php" method="POST">
                <div class="input-group">
                    <label for="registerName">Nome Completo</label>
                    <input type="text" id="registerName" name="nome" placeholder="Seu nome completo">
                </div>
                <div class="input-group">
                    <label for="registerEmail">E-mail</label>
                    <input type="text" id="registerEmail" name="email" placeholder="seu@email.com">
                </div>
                <div class="input-group">
                    <label for="registerPassword">Senha</label>
                    <input type="password" id="registerPassword" name="password" placeholder="********">
                </div>
                <div class="input-group">
                    <label for="registerConfirmPassword">Confirmar Senha</label>
                    <input type="password" id="registerConfirmPassword" name="confirm_password" placeholder="Confirme sua senha">
                </div>
                <button type="submit" class="btn btn-primary">Cadastrar</button>
                <p class="register-link">Já tem uma conta? <a href="index.php">Faça login</a></p>
            </form>
        </div>
    </div>
    <script src="assets/js/validation.js"></script>
</body>
</html>