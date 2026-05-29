const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    
    await page.goto('http://127.0.0.1:5500/create-room.html', { waitUntil: 'networkidle0' });
    
    // Evaluate the save function directly
    await page.evaluate(async () => {
        try {
            const roomData = {
                roomName: "Test Room",
                description: "type bye",
                roomCode: "test1",
                completionTime: 60,
                difficulty: "Medium",
                cloning: false,
                visibility: "Private",
                privateMessage: "",
                bannerUrl: "",
                avatarUrl: "",
                video1: null,
                video2: null,
                tasks: [
                    {
                        id: 12345,
                        title: "Task 1",
                        description: "type bye",
                        questions: [
                            {
                                id: 12346,
                                text: "hi",
                                answer: "bye",
                                points: 10
                            }
                        ]
                    }
                ],
                categories: []
            };
            const res = await fetch('http://localhost:5000/api/create_room', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomData)
            });
            const data = await res.json();
            console.log("SUCCESS:", JSON.stringify(data));
        } catch(e) {
            console.log("CATCH:", e.message);
        }
    });
    
    await page.waitForTimeout(1000);
    await browser.close();
})();
