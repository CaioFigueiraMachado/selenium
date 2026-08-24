/**
 * testeAutomatizado.js
 *
 * Como rodar:
 * 1) npm install selenium-webdriver chromedriver
 * 2) node testeAutomatizado.js
 *
 * Testes automatizados para ACME Digital
 */

const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");
let relatorio = [];

// ---------- CONFIGURAÇÃO ----------
const TARGET_URL = "http://localhost/slenium/index.php";
const SCREENSHOT_DIR = path.join(__dirname, "assets", "screenshots");
const TIMEOUT_MS = 10000; // Aumentei para 10 segundos

// Garante que a pasta de screenshots exista
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

// Função para salvar screenshot base64 em arquivo
function salvarScreenshot(base64, nomeArquivo) {
    const filePath = path.join(SCREENSHOT_DIR, nomeArquivo);
    fs.writeFileSync(filePath, base64, "base64");
    return filePath;
}

// ---------- FUNÇÃO DE TESTE ----------
async function testarLogin(email, senha, descricao) {
    let driver = await new Builder().forBrowser("chrome").build();
    let status = "pass";
    let mensagem = "";

    try {
        console.log(`\n🔍 Testando: ${descricao}`);
        console.log(`   Email: "${email}" | Senha: "${senha}"`);
        
        // Abre a página
        await driver.get(TARGET_URL);
        
        // Aguarda a página carregar completamente
        await driver.sleep(2000);

        // ============================================
        // 1. Preenche o campo de email
        // ============================================
        try {
            await driver.wait(until.elementLocated(By.id("email")), TIMEOUT_MS);
            const emailField = await driver.findElement(By.id("email"));
            await emailField.clear();
            await emailField.sendKeys(email);
            console.log(`   ✅ Email preenchido: "${email}"`);
        } catch (e) {
            console.log(`   ❌ Campo 'email' não encontrado!`);
            throw new Error("Campo email não encontrado. Verifique se o ID 'email' existe no HTML.");
        }

        // ============================================
        // 2. Preenche o campo de senha
        // ============================================
        try {
            await driver.wait(until.elementLocated(By.id("senha")), TIMEOUT_MS);
            const senhaField = await driver.findElement(By.id("senha"));
            await senhaField.clear();
            await senhaField.sendKeys(senha);
            console.log(`   ✅ Senha preenchida: "${senha}"`);
        } catch (e) {
            console.log(`   ❌ Campo 'senha' não encontrado!`);
            throw new Error("Campo senha não encontrado. Verifique se o ID 'senha' existe no HTML.");
        }

        // ============================================
        // 3. Clica no botão de login
        // ============================================
        try {
            // CORREÇÃO: Usar By.className() em vez de By.class()
            await driver.wait(until.elementLocated(By.className("btn-primary")), TIMEOUT_MS);
            await driver.findElement(By.className("btn-primary")).click();
            console.log(`   ✅ Botão clicado`);
        } catch (e) {
            console.log(`   ❌ Botão 'btn-primary' não encontrado!`);
            throw new Error("Botão não encontrado. Verifique se a classe 'btn-primary' existe.");
        }

        // Aguarda a resposta do servidor
        await driver.sleep(2000);

        // ============================================
        // 4. Verifica a mensagem ou redirecionamento
        // ============================================
        try {
            // Tenta encontrar a div de mensagem
            await driver.wait(until.elementLocated(By.id("mensagem")), TIMEOUT_MS);
            const mensagemElement = await driver.findElement(By.id("mensagem"));
            mensagem = await mensagemElement.getText();
            // Remove tags HTML da mensagem
            mensagem = mensagem.replace(/<[^>]*>/g, '').trim();
            console.log(`   ✅ Mensagem: ${mensagem}`);
        } catch (e) {
            // Se não encontrar mensagem, verifica se redirecionou
            const currentUrl = await driver.getCurrentUrl();
            if (currentUrl.includes('dashboard.php')) {
                mensagem = "Login realizado com sucesso (redirecionado)";
                console.log(`   ✅ Redirecionado para: ${currentUrl}`);
            } else {
                mensagem = "Sem mensagem visível";
                console.log(`   ⚠️ Sem mensagem visível. URL atual: ${currentUrl}`);
            }
        }

        // ============================================
        // 5. Tira screenshot
        // ============================================
        const safeName = descricao
            .replace(/\s+/g, "_")
            .replace(/[^a-zA-Z0-9_\-]/g, "");
        const screenshotName = `screenshot_${safeName}.png`;
        const base64 = await driver.takeScreenshot();
        const savedPath = salvarScreenshot(base64, screenshotName);
        console.log(`   📸 Screenshot: ${savedPath}`);

        // Adiciona ao relatório
        relatorio.push({
            teste: descricao,
            email: email,
            senha: senha,
            status: status,
            mensagem: mensagem,
            screenshot: savedPath,
        });

    } catch (err) {
        status = "fail";
        console.log(`   ❌ Erro: ${err.message}`);

        // Tenta salvar screenshot de erro
        try {
            const safeName = descricao
                .replace(/\s+/g, "_")
                .replace(/[^a-zA-Z0-9_\-]/g, "");
            const screenshotName = `screenshot_erro_${safeName}.png`;
            const base64 = await driver.takeScreenshot();
            const savedPath = salvarScreenshot(base64, screenshotName);
            console.log(`   📸 Screenshot de erro: ${savedPath}`);
            
            relatorio.push({
                teste: descricao,
                email: email,
                senha: senha,
                status: status,
                mensagem: err.message,
                screenshot: savedPath,
            });
        } catch (e) {
            console.log(`   ⚠️ Não foi possível salvar screenshot: ${e.message}`);
            relatorio.push({
                teste: descricao,
                email: email,
                senha: senha,
                status: status,
                mensagem: err.message,
                screenshot: null,
            });
        }
    } finally {
        await driver.quit();
        // Aguarda 2 segundos antes do próximo teste
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

// ---------- ARRAY DE TESTES ----------
const testes = [
    { email: "admin@teste.com", senha: "1234", descricao: "Login correto" },
    { email: "admin@teste.com", senha: "errada", descricao: "Senha incorreta" },
    { email: "", senha: "1234", descricao: "Campo email vazio" },
    { email: "admin@teste.com", senha: "", descricao: "Campo senha vazio" },
    { email: "<script>alert('XSS')</script>", senha: "1234", descricao: "Tentativa de XSS" },
];

// ---------- EXECUÇÃO SEQUENCIAL ----------
(async () => {
    console.log("🚀 =========================================");
    console.log("🚀 INICIANDO TESTES AUTOMATIZADOS");
    console.log("🚀 =========================================");
    console.log(`📍 URL: ${TARGET_URL}`);
    console.log(`📁 Screenshots: ${SCREENSHOT_DIR}`);
    console.log(`📊 Total de testes: ${testes.length}`);
    console.log("🚀 =========================================\n");

    for (let t of testes) {
        await testarLogin(t.email, t.senha, t.descricao);
    }

    // Salva relatório final em JSON
    fs.writeFileSync("relatorio.json", JSON.stringify(relatorio, null, 2));
    
    // ============================================
    // MOSTRA RESUMO FINAL
    // ============================================
    console.log("\n📊 =========================================");
    console.log("📊 RESUMO DOS TESTES");
    console.log("📊 =========================================");
    
    let passCount = 0;
    let failCount = 0;
    
    relatorio.forEach((r, index) => {
        const emoji = r.status === 'pass' ? '✅' : '❌';
        const num = String(index + 1).padStart(2, '0');
        console.log(`${emoji} TC${num} - ${r.teste}: ${r.status.toUpperCase()}`);
        if (r.status === 'pass') passCount++;
        else failCount++;
    });
    
    console.log("📊 =========================================");
    console.log(`✅ Testes que passaram: ${passCount}`);
    console.log(`❌ Testes que falharam: ${failCount}`);
    console.log(`📄 Relatório salvo em: relatorio.json`);
    console.log("📊 =========================================");
})();

// ---------- FUNÇÕES AUXILIARES ----------
function testsOrArrayIsValid(arr) {
    return Array.isArray(arr) && arr.length > 0;
}