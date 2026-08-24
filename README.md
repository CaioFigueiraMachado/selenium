

---

# ACME DIGITAL - SISTEMA DE LOGIN E CADASTRO
DESIGN BY CAIO E LUCAS

## DESCRICAO

Sistema desenvolvido para o curso Tecnico de Desenvolvimento de Sistemas com foco em seguranca e usabilidade. O projeto consiste em telas de login e cadastro com implementacao de medidas de seguranca e testes automatizados.

---

## TECNOLOGIAS UTILIZADAS

- PHP 7.4+
- MySQL 5.7+
- HTML5, CSS3, JavaScript
- SweetAlert2 para notificacoes
- Selenium WebDriver para testes automatizados
- Node.js para execucao dos testes

---

## REQUISITOS DO SISTEMA

### Funcionalidades Implementadas

- Login com validacao de credenciais
- Cadastro de novos usuarios
- Prevencao contra XSS (Cross-Site Scripting)
- Prevencao contra SQL Injection
- Validacao de campos obrigatorios
- Hash de senhas com bcrypt
- Feedback visual com SweetAlert2
- Testes automatizados com Selenium

---

## ESTRUTURA DO PROJETO

```
acme-digital/
├── index.php                 # Tela de login
├── cadastro.php              # Tela de cadastro
├── dashboard.php             # Area protegida apos login
├── process_login.php         # Processamento de login
├── process_register.php      # Processamento de cadastro
├── logout.php                # Encerramento de sessao
├── config/
│   └── database.php          # Configuracao do banco de dados
├── assets/
│   ├── css/
│   │   └── style.css         # Estilos do sistema
│   ├── js/
│   │   └── validation.js     # Validacoes frontend
│   └── screenshots/          # Screenshots dos testes
├── selenium_tests/
│   └── login_test.js         # Testes automatizados
├── database.sql              # Script de criacao do banco
├── package.json              # Dependencias Node.js
└── README.md                 # Este arquivo
```

---

## INSTALACAO E CONFIGURACAO

### 1. Configuracao do Banco de Dados

Execute o script database.sql para criar o banco e as tabelas:

```bash
mysql -u root -p < database.sql
```

Ou importe o arquivo database.sql via phpMyAdmin ou outro gerenciador.

### 2. Configuracao da Conexao

Edite o arquivo `config/database.php` com suas credenciais:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'acme_digital');
define('DB_USER', 'seu_usuario');
define('DB_PASS', 'sua_senha');
```

### 3. Iniciar o Servidor

Utilizando o servidor embutido do PHP:

```bash
php -S localhost:8000
```

Ou utilizando XAMPP/WAMP, coloque os arquivos na pasta htdocs/www e inicie o Apache.

Acesse o sistema em: `http://localhost:8000` ou `http://localhost/slenium/`

### 4. Instalar Dependencias para Testes

```bash
npm install selenium-webdriver chromedriver
```

---

## USUARIO DE TESTE

O sistema ja possui um usuario cadastrado para testes:

- Email: teste@acme.com
- Senha: Teste@123

---

## TESTES AUTOMATIZADOS

### Configuracao dos Testes

O arquivo `testeAutomatizado.js` contem os casos de teste para validar o funcionamento do sistema.

### Casos de Teste

| ID | Descricao | Email | Senha | Resultado Esperado |
|----|-----------|-------|-------|-------------------|
| TC01 | Login correto | admin@teste.com | 1234 | Acesso permitido |
| TC02 | Senha incorreta | admin@teste.com | errada | Acesso negado |
| TC03 | Campo email vazio | (vazio) | 1234 | Exibir erro |
| TC04 | Campo senha vazio | admin@teste.com | (vazio) | Exibir erro |
| TC05 | Tentativa de XSS | <script>alert('XSS')</script> | 1234 | Bloquear entrada |

### Executando os Testes

1. Certifique-se que o servidor PHP esta rodando

2. Execute o comando:

```bash
node testeAutomatizado.js
```

### Resultados dos Testes

Apos a execucao, serao gerados:

- Screenshots na pasta `assets/screenshots/`
- Relatorio em JSON: `relatorio.json`

### Exemplo de Saida

```
=========================================
INICIANDO TESTES AUTOMATIZADOS
=========================================
URL: http://localhost/slenium/index.php
Screenshots: C:\xampp\htdocs\slenium\assets\screenshots
Total de testes: 5
=========================================

Testando: Login correto
   Email: "admin@teste.com" | Senha: "1234"
   Email preenchido: "admin@teste.com"
   Senha preenchida: "1234"
   Botao clicado
   Mensagem: Login realizado com sucesso!
   Screenshot: assets/screenshots/screenshot_Login_correto.png

=========================================
RESUMO DOS TESTES
=========================================
TC01 - Login correto: PASS
TC02 - Senha incorreta: PASS
TC03 - Campo email vazio: PASS
TC04 - Campo senha vazio: PASS
TC05 - Tentativa de XSS: PASS
=========================================
Testes que passaram: 5
Testes que falharam: 0
Relatorio salvo em: relatorio.json
=========================================
```

---

## SEGURANCA IMPLEMENTADA

### Prevencao contra XSS

Validacao em frontend e backend para detectar padroes suspeitos:

```javascript
// Frontend
function containsXSSPattern(input) {
    const patterns = [
        /<script[^>]*>.*?<\/script>/is,
        /javascript:[^"\']*/i,
        /on\w+\s*=/i
    ];
    return patterns.some(pattern => pattern.test(input));
}
```

```php
// Backend
function containsXSS($input) {
    $patterns = ['/<script[^>]*>.*?<\/script>/is', '/javascript:[^"\']*/i'];
    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $input)) {
            return true;
        }
    }
    return false;
}
```

### Prevencao contra SQL Injection

Utilizacao de Prepared Statements:

```php
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
```

### Hash de Senhas

Utilizacao do bcrypt:

```php
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$verify = password_verify($password, $user['senha']);
```

### Validacao de Campos

Validacao em frontend e backend para campos obrigatorios:

```javascript
if (!email || !password) {
    showAlert('Campos vazios', 'Preencha todos os campos.', 'warning');
    return false;
}
```

---

## SOLUCAO DE PROBLEMAS

### Erro: "Cannot find module 'selenium-webdriver'"

```bash
npm install selenium-webdriver chromedriver
```

### Erro: "ChromeDriver not found"

```bash
npm install -g chromedriver
```

### Erro: "ECONNREFUSED" (servidor nao esta rodando)

```bash
php -S localhost:8000
```

### Erro: "Unable to find element"

Verifique se os IDs no HTML estao corretos:

```html
<input id="email">
<input id="senha">
<button class="btn btn-primary">
<div id="mensagem">
```

### Erro: "Duplicate entry for key 'email'"

Remova a restricao UNIQUE da coluna email:

```sql
ALTER TABLE usuarios DROP INDEX email;
```

---

## MANUTENCAO

### Adicionar Novos Testes

No arquivo `testeAutomatizado.js`, adicione novos objetos ao array `testes`:

```javascript
const testes = [
    { email: "novo@email.com", senha: "1234", descricao: "Descricao do teste" },
    // Adicione mais testes aqui
];
```

### Atualizar o Banco de Dados

Para adicionar novos usuarios manualmente:

```sql
INSERT INTO usuarios (nome, email, senha) VALUES 
('Nome do Usuario', 'email@exemplo.com', 'senha_hash');
```

---

## LICENCA

Este projeto e desenvolvido para fins educacionais no curso Tecnico de Desenvolvimento de Sistemas.

---



## OBSERVACOES FINAIS

- Mantenha o servidor PHP rodando durante a execucao dos testes
- Verifique se o Chrome esta instalado no sistema
- Os screenshots sao salvos automaticamente na pasta assets/screenshots
- O relatorio JSON pode ser utilizado para analise dos resultados

---

**Versao: 1.0.0**
**Data: Agosto/2026**
