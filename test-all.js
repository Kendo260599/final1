#!/usr/bin/env node

// Script test tự động cho ứng dụng Phong Thủy
// Kiểm tra tất cả các API endpoints và chức năng

const http = require('http');
const { URL } = require('url');

console.log('🧪 TESTING ALL BUTTONS AND FUNCTIONS - Phong Thủy App');
console.log('='.repeat(60));

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

// Hàm helper để gọi HTTP request
function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const requestOptions = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.pathname + parsedUrl.search,
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        const req = http.request(requestOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });

        req.on('error', reject);
        
        if (options.body) {
            req.write(options.body);
        }
        
        req.end();
    });
}

// Hàm test một endpoint
async function testEndpoint(url, name, expectedStatus = 200, method = 'GET', body = null) {
    totalTests++;
    try {
        console.log(`🔍 Testing: ${name}`);
        console.log(`   URL: ${method} ${url}`);
        
        const response = await makeRequest(url, { method, body });
        
        if (response.statusCode === expectedStatus) {
            console.log(`   ✅ PASS - Status: ${response.statusCode}`);
            if (response.body) {
                const preview = response.body.substring(0, 100);
                console.log(`   📄 Response: ${preview}${response.body.length > 100 ? '...' : ''}`);
            }
            passedTests++;
            return true;
        } else {
            console.log(`   ❌ FAIL - Expected: ${expectedStatus}, Got: ${response.statusCode}`);
            console.log(`   📄 Response: ${response.body.substring(0, 200)}`);
            failedTests++;
            return false;
        }
    } catch (error) {
        console.log(`   💥 ERROR - ${error.message}`);
        failedTests++;
        return false;
    }
}

// Hàm test chính
async function runAllTests() {
    const baseUrl = 'http://localhost:3000';
    
    console.log('📱 Testing Main Application Pages...');
    console.log('-'.repeat(40));
    
    // Test trang chính
    await testEndpoint(baseUrl, 'Main Application Page');
    await testEndpoint(`${baseUrl}/style.css`, 'CSS Stylesheet');
    await testEndpoint(`${baseUrl}/script.js`, 'Main JavaScript');
    await testEndpoint(`${baseUrl}/data/wards.json`, 'Wards Data File');
    
    console.log('\n🌐 Testing API Endpoints...');
    console.log('-'.repeat(40));
    
    // Test API endpoints
    await testEndpoint(
        `${baseUrl}/api/auspicious-days?birth=1990-01-01&year=2025&month=8`,
        'Auspicious Days API'
    );
    
    // /api/horoscope removed (AI functions excised)
    
    await testEndpoint(
        `${baseUrl}/api/chart?name=TestUser`,
        'Chart API'
    );
    
    // Test POST API
    // /api/ai-analyze removed
    
    console.log('\n📁 Testing Module Files...');
    console.log('-'.repeat(40));
    
    // Test các file module
    const moduleFiles = [
        'lunar.mjs',
        'siteIssues.mjs',
        'wards.mjs',
        'parseDateParts.mjs',
        'fortune.mjs',
        'advancedHoroscope.mjs',
        'getAuspiciousDays.mjs',
        'elements.js'
    ];
    
    for (const file of moduleFiles) {
        await testEndpoint(`${baseUrl}/${file}`, `Module: ${file}`);
    }
    
    console.log('\n🗂️ Testing Public Files...');
    console.log('-'.repeat(40));
    
    // Test public files
    const publicFiles = [
        'public/compass.js',
        'public/horoscope.js', 
        'public/profiles.js'
    ];
    
    for (const file of publicFiles) {
        await testEndpoint(`${baseUrl}/${file}`, `Public File: ${file}`);
    }
    
    console.log('\n🧪 Testing Special Cases...');
    console.log('-'.repeat(40));
    
    // Test các trường hợp đặc biệt
    await testEndpoint(
        `${baseUrl}/api/auspicious-days?birth=invalid&year=2025&month=8`,
        'Auspicious Days API (Invalid Input)',
        400
    );
    
    // Skipping removed /api/horoscope missing params test
    await testEndpoint(
        `${baseUrl}/health`,
        'Health Endpoint',
        200
    );
    
    await testEndpoint(
        `${baseUrl}/nonexistent-page`,
        'Non-existent Page',
        404
    );
    
    console.log('\n📊 Testing Page Content...');
    console.log('-'.repeat(40));
    
    // Test nội dung trang chính
    try {
        const response = await makeRequest(baseUrl);
        if (response.statusCode === 200) {
            const html = response.body;
            const checks = [
                { name: 'Page Title', test: html.includes('Phong Thủy Lê Gia') },
                { name: 'Analyze Button', test: html.includes('btn-analyze') },
                { name: 'Issues Container', test: html.includes('issues-container') },
                { name: 'Ward Select', test: html.includes('bd-ward') },
                { name: 'Compass Section', test: html.includes('compass-wrap') },
                { name: 'Canvas Element', test: html.includes('fengCanvas') },
                { name: 'Profiles Section', test: html.includes('profiles-section') }
            ];
            
            for (const check of checks) {
                totalTests++;
                if (check.test) {
                    console.log(`   ✅ PASS - ${check.name} found`);
                    passedTests++;
                } else {
                    console.log(`   ❌ FAIL - ${check.name} missing`);
                    failedTests++;
                }
            }
        }
    } catch (error) {
        console.log(`   💥 ERROR testing page content: ${error.message}`);
    }
    
    // Kết quả cuối cùng
    console.log('\n📈 FINAL RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${passedTests}`);
    console.log(`❌ Failed: ${failedTests}`);
    
    const successRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0;
    console.log(`📊 Success Rate: ${successRate}%`);
    
    if (successRate >= 80) {
        console.log('\n🎉 EXCELLENT! Ứng dụng hoạt động rất tốt!');
        console.log('✨ Tất cả các chức năng chính đều hoạt động đúng.');
    } else if (successRate >= 60) {
        console.log('\n⚠️ GOOD! Ứng dụng hoạt động tốt với một vài vấn đề nhỏ.');
        console.log('🔧 Cần kiểm tra lại một số chức năng.');
    } else {
        console.log('\n🚨 NEEDS WORK! Có nhiều vấn đề cần khắc phục.');
        console.log('🛠️ Cần debug và sửa lỗi.');
    }
    
    console.log('\n🔧 Khuyến nghị:');
    console.log('• AI đã bị loại bỏ hoàn toàn (endpoints cũng bị xóa)');
    console.log('• Test thủ công các nút bấm trên giao diện');
    console.log('• Kiểm tra console browser để tìm lỗi JavaScript');
    console.log('• Đảm bảo tất cả file dữ liệu được tải đúng');
    
    return { totalTests, passedTests, failedTests, successRate };
}

// Chạy test
console.log('⏳ Starting automated tests...\n');

runAllTests().then((result) => {
    console.log('\n🏁 Testing completed!');
    process.exit(result.failedTests > 0 ? 1 : 0);
}).catch((error) => {
    console.error('\n💥 Testing failed:', error);
    process.exit(1);
});
