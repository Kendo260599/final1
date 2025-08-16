// File serving evaluation
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

async function testEverything() {
    console.log('🧪 Testing file serving...');
    
    const files = [
        { path: '/', name: 'Main page' },
        { path: '/script.js', name: 'Main script' },
        { path: '/style.css', name: 'Stylesheet' },
        { path: '/data/wards.json', name: 'Ward data' },
        { path: '/lunar.mjs', name: 'Lunar module' },
        { path: '/siteIssues.mjs', name: 'Issues module' },
        { path: '/public/horoscope.js', name: 'Horoscope' }
    ];
    
    let passed = 0;
    
    for (const file of files) {
        try {
            const { stdout } = await execAsync(`curl -s -w "%{http_code}" http://localhost:8001${file.path} | tail -1`);
            if (stdout.trim() === '200') {
                console.log(`✅ ${file.name}`);
                passed++;
            } else {
                console.log(`❌ ${file.name}: ${stdout.trim()}`);
            }
        } catch (e) {
            console.log(`❌ ${file.name}: Error`);
        }
    }
    
    console.log(`\n🎯 ${passed}/${files.length} files working`);
    return passed === files.length;
}

testEverything().then(success => {
    if (success) {
        console.log('🎉 All files served correctly!');
        console.log('✅ App ready for button testing!');
    } else {
        console.log('⚠️ Some files have issues');
    }
});
