// Testes para verificar VULNERABILIDADES (não proteções)
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('ACME Digital - Testes de VULNERABILIDADES', function() {
    let driver;
    const baseUrl = 'http://localhost:8000';

    beforeAll(async function() {
        const options = new chrome.Options();
        options.addArguments('--headless');
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    afterAll(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    // TESTE PARA VERIFICAR XSS (DEVE FUNCIONAR - SISTEMA VULNERÁVEL)
    test('TC01 - XSS deve funcionar (sistema vulnerável)', async function() {
        await driver.get(baseUrl);
        
        const emailInput = await driver.findElement(By.id('loginEmail'));
        const passwordInput = await driver.findElement(By.id('loginPassword'));
        const submitBtn = await driver.findElement(By.css('button[type="submit"]'));

        // Tentativa de XSS - DEVE EXECUTAR
        await emailInput.sendKeys('<script>alert("XSS")</script>');
        await passwordInput.sendKeys('qualquercoisa');
        await submitBtn.click();

        // Verifica se o XSS foi executado (vai gerar alert)
        // O teste deve falhar porque o sistema está vulnerável
        const alertPresent = await driver.executeScript('return window.alert.toString().includes("XSS")');
        expect(alertPresent).toBe(true);
    });

    // TESTE PARA VERIFICAR SQL INJECTION (DEVE FUNCIONAR)
    test('TC02 - SQL Injection deve funcionar', async function() {
        await driver.get(baseUrl);
        
        const emailInput = await driver.findElement(By.id('loginEmail'));
        const passwordInput = await driver.findElement(By.id('loginPassword'));
        const submitBtn = await driver.findElement(By.css('button[type="submit"]'));

        // SQL Injection - DEVE FUNCIONAR
        await emailInput.sendKeys("' OR '1'='1");
        await passwordInput.sendKeys("' OR '1'='1");
        await submitBtn.click();

        // Verifica se o login foi bypassado
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('dashboard.php');
    });

    // TESTE PARA VERIFICAR CAMPOS VAZIOS (DEVE FUNCIONAR)
    test('TC03 - Envio com campos vazios deve funcionar', async function() {
        await driver.get(baseUrl);
        
        const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
        await submitBtn.click();

        // Verifica se enviou mesmo com campos vazios
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('process_login.php');
    });
});