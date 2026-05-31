const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    
    page.on('dialog', async dialog => {
        console.log('DIALOG:', dialog.message());
        await dialog.dismiss();
    });
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    
    await page.goto('http://127.0.0.1:5501/create-room.html', { waitUntil: 'networkidle0' });
    
    // Fill out the form
    await page.evaluate(() => {
        // Find Tasks tab and click it
        const navs = document.querySelectorAll('.nav-item');
        for (let nav of navs) {
            if (nav.innerText.includes('Tasks')) {
                nav.click();
                break;
            }
        }
    });
    
    await page.waitForTimeout(500);
    
    // Add task
    await page.evaluate(() => {
        const btns = document.querySelectorAll('button');
        for (let btn of btns) {
            if (btn.innerText.includes('Add task')) {
                btn.click();
                break;
            }
        }
    });
    
    await page.waitForTimeout(500);
    
    // Save
    await page.evaluate(() => {
        const btns = document.querySelectorAll('button');
        for (let btn of btns) {
            if (btn.innerText.includes('Save Tasks')) {
                btn.click();
                break;
            }
        }
    });
    
    await page.waitForTimeout(1000);
    await browser.close();
})();
