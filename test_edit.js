const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('dialog', async dialog => {
        console.log('DIALOG:', dialog.message());
        await dialog.dismiss();
    });

    await page.goto('http://127.0.0.1:5500/create-room.html', { waitUntil: 'networkidle0' });
    
    // Click Manage Rooms
    await page.click('#manage-btn');
    await page.waitForTimeout(1000);
    
    // Click Edit on the first room
    const editBtns = await page.$$('.start-btn');
    if (editBtns.length > 1) {
        await editBtns[1].click(); // The second button might be "Edit"
    } else {
        console.log("Edit button not found");
    }
    
    await page.waitForTimeout(1000);
    
    // Go to Tasks tab
    const tabs = await page.$$('.nav-item');
    for (let tab of tabs) {
        const text = await page.evaluate(el => el.textContent, tab);
        if (text.includes('Tasks')) {
            await tab.click();
            break;
        }
    }
    
    await page.waitForTimeout(1000);
    
    // Click Save Tasks
    const saveBtns = await page.$$('button');
    for (let btn of saveBtns) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text.includes('Save Tasks')) {
            await btn.click();
            break;
        }
    }
    
    await page.waitForTimeout(1000);
    await browser.close();
})();
