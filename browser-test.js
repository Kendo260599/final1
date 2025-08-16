// Comprehensive button testing script for the feng shui app
// Run this in browser console after page loads

console.log('🧪 Bắt đầu test tất cả các nút của ứng dụng phong thủy...');

// Helper function to wait
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to trigger click event
const clickButton = (selector) => {
    const btn = document.querySelector(selector);
    if (btn) {
        console.log(`➡️ Clicking: ${selector}`);
        btn.click();
        return true;
    } else {
        console.log(`❌ Button not found: ${selector}`);
        return false;
    }
};

// Helper function to check if element exists and has content
const checkElement = (selector, description = '') => {
    const element = document.querySelector(selector);
    if (element) {
        const hasContent = element.textContent.trim() !== '';
        console.log(`✅ ${description || selector}: Found ${hasContent ? 'with content' : 'but empty'}`);
        return hasContent;
    } else {
        console.log(`❌ ${description || selector}: Not found`);
        return false;
    }
};

async function runAllTests() {
    let testResults = {
        passed: 0,
        failed: 0,
        details: []
    };

    console.log('\n📅 Test 1: Date selection and analysis');
    // Set a test date
    const dateInput = document.querySelector('#date');
    if (dateInput) {
        dateInput.value = '2025-01-15';
        dateInput.dispatchEvent(new Event('change'));
        testResults.details.push('Date input: Set to 2025-01-15');
        testResults.passed++;
    } else {
        testResults.details.push('❌ Date input not found');
        testResults.failed++;
    }

    await delay(500);

    // Test main analysis button
    console.log('\n🔮 Test 2: Main Feng Shui Analysis');
    if (clickButton('#btn-analyze')) {
        await delay(2000);
        
        // Check results
        const lunarResult = checkElement('#lunarResult', 'Lunar conversion result');
        const horoscopeResult = checkElement('#horoscopeResult', 'Horoscope result');
        
        if (lunarResult) testResults.passed++; else testResults.failed++;
        if (horoscopeResult) testResults.passed++; else testResults.failed++;
    } else {
        testResults.failed++;
    }

    console.log('\n🏠 Test 3: Ward selection');
    // Test province selection
    const provinceSelect = document.querySelector('#province');
    if (provinceSelect && provinceSelect.options.length > 1) {
        provinceSelect.value = provinceSelect.options[1].value;
        provinceSelect.dispatchEvent(new Event('change'));
        testResults.passed++;
        testResults.details.push('Province selected');
        
        await delay(500);
        
        // Check if wards populated
        const wardSelect = document.querySelector('#ward');
        if (wardSelect && wardSelect.options.length > 1) {
            testResults.passed++;
            testResults.details.push('Wards populated successfully');
        } else {
            testResults.failed++;
            testResults.details.push('❌ Wards not populated');
        }
    } else {
        testResults.failed++;
        testResults.details.push('❌ Province select not working');
    }

    console.log('\n🎯 Test 4: Feng Shui Issues Analysis');
    if (clickButton('#btn-analyze-issues')) {
        await delay(2000);
        
        const issuesResult = checkElement('#issuesResult', 'Feng Shui Issues');
        if (issuesResult) testResults.passed++; else testResults.failed++;
    } else {
        testResults.failed++;
    }

    console.log('\n🧭 Test 5: Compass Direction');
    if (clickButton('#btn-compass')) {
        await delay(1000);
        
        const compassResult = checkElement('#compassResult', 'Compass result');
        if (compassResult) testResults.passed++; else testResults.failed++;
    } else {
        testResults.failed++;
    }

    console.log('\n🌟 Test 6: Auspicious Days');
    if (clickButton('#btn-auspicious')) {
        await delay(1000);
        
        const auspiciousResult = checkElement('#auspiciousResult', 'Auspicious days');
        if (auspiciousResult) testResults.passed++; else testResults.failed++;
    } else {
        testResults.failed++;
    }

    console.log('\n🔮 Test 7: Advanced Horoscope');
    if (clickButton('#btn-advanced-horoscope')) {
        await delay(1000);
        
        const advancedResult = checkElement('#advancedHoroscopeResult', 'Advanced horoscope');
        if (advancedResult) testResults.passed++; else testResults.failed++;
    } else {
        testResults.failed++;
    }

    console.log('\n🎰 Test 8: Fortune');
    if (clickButton('#btn-fortune')) {
        await delay(1000);
        
        const fortuneResult = checkElement('#fortuneResult', 'Fortune result');
        if (fortuneResult) testResults.passed++; else testResults.failed++;
    } else {
        testResults.failed++;
    }

    // Final report
    console.log('\n📊 KẾT QUẢ TEST TỔNG HỢP:');
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`📈 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
    
    console.log('\n📝 Chi tiết:');
    testResults.details.forEach(detail => console.log(`  ${detail}`));

    // Check for any JavaScript errors
    console.log('\n🐛 Kiểm tra lỗi JavaScript:');
    if (window.lastError) {
        console.log(`❌ Có lỗi: ${window.lastError}`);
    } else {
        console.log('✅ Không có lỗi JavaScript được phát hiện');
    }

    return testResults;
}

// Capture JavaScript errors
window.addEventListener('error', (e) => {
    window.lastError = e.message;
    console.error('JavaScript Error:', e.message, 'at', e.filename, 'line', e.lineno);
});

// Start tests automatically if the page is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests);
} else {
    runAllTests();
}

console.log('📋 Test script loaded. Kiểm tra console để xem kết quả.');
