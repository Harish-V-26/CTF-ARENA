const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    
    await page.goto('http://127.0.0.1:5501/index.html');
    await page.evaluate(() => {
        localStorage.setItem("ctf_active_user_session", JSON.stringify({uid: "123", email: "test@gmail.com", displayName: "Test", photoURL: null}));
    });
    
    await page.goto('http://127.0.0.1:5000/room/new-room', { waitUntil: 'networkidle0' });
    
    await browser.close();
})();
