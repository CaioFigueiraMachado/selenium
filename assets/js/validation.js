document.addEventListener('DOMContentLoaded', function() {
    // Login form - SEM VALIDAÇÃO
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            // NÃO FAZ NENHUMA VALIDAÇÃO
            // Permite envio com campos vazios, XSS, etc.
            return true;
        });
    }

    // Register form - SEM VALIDAÇÃO
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            // NÃO FAZ NENHUMA VALIDAÇÃO
            // Permite cadastro com senhas fracas, XSS, etc.
            return true;
        });
    }

    // Função de alerta - SEM PROTEÇÃO
    function showAlert(title, message, icon) {
        // Usa alert() nativo - NÃO PROFISSIONAL
        alert(title + ': ' + message);
    }
});