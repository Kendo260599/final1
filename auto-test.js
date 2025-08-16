// Script test tự động cho tất cả các nút trong ứng dụng Phong Thủy
// Chạy script này trong console của trình duyệt khi đã mở ứng dụng chính

console.log('🧪 Bắt đầu test tự động tất cả các nút...');

// Hàm helper để đợi
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Hàm test một nút
async function testButton(selector, name, setup = null) {
    try {
        console.log(`🔍 Testing: ${name} (${selector})`);
        
        const button = document.querySelector(selector);
        if (!button) {
            console.error(`❌ Button not found: ${name}`);
            return false;
        }
        
        if (button.disabled) {
            console.warn(`⚠️ Button disabled: ${name}`);
            return false;
        }
        
        // Setup dữ liệu nếu cần
        if (setup) {
            setup();
        }
        
        // Click nút
        button.click();
        
        console.log(`✅ Button clicked successfully: ${name}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error testing ${name}:`, error);
        return false;
    }
}

// Hàm fill dữ liệu mẫu
function fillSampleData() {
    // Thông tin khách hàng
    const nameInput = document.getElementById('kh-ten');
    if (nameInput) nameInput.value = 'Nguyễn Văn Test';
    
    const phoneInput = document.getElementById('kh-phone');
    if (phoneInput) phoneInput.value = '0901234567';
    
    const birthInput = document.getElementById('ngay-sinh');
    if (birthInput) birthInput.value = '1990-01-01';
    
    const genderSelect = document.getElementById('gioi-tinh');
    if (genderSelect) genderSelect.value = 'nam';
    
    const directionSelect = document.getElementById('huong-nha');
    if (directionSelect) directionSelect.value = 'Đông';
    
    const yearInput = document.getElementById('nam-xay');
    if (yearInput) yearInput.value = '2025';
    
    const monthSelect = document.getElementById('thang-xay');
    if (monthSelect) monthSelect.value = '8';
    
    // Thông tin BDS
    const provinceSelect = document.getElementById('bd-province');
    if (provinceSelect) provinceSelect.value = 'Đồng Nai';
    
    const huyenInput = document.getElementById('bd-huyen');
    if (huyenInput) huyenInput.value = 'Biên Hòa';
    
    const addressInput = document.getElementById('bd-address-detail');
    if (addressInput) addressInput.value = '123 Test Street';
    
    const toInput = document.getElementById('bd-to');
    if (toInput) toInput.value = '123';
    
    const thuaInput = document.getElementById('bd-thua');
    if (thuaInput) thuaInput.value = '456';
    
    const priceInput = document.getElementById('bd-price');
    if (priceInput) priceInput.value = '2500000000';
    
    const monthInput = document.getElementById('ad-month');
    if (monthInput) monthInput.value = '2025-08';
    
    const chartNameInput = document.getElementById('chart-name');
    if (chartNameInput) chartNameInput.value = 'Test Chart';
    
    console.log('📝 Sample data filled');
}

// Hàm test chính
async function runAllTests() {
    const results = [];
    let passed = 0;
    let failed = 0;
    
    console.log('📝 Filling sample data...');
    fillSampleData();
    await wait(1000);
    
    // Danh sách các nút cần test
    const buttonTests = [
        // Nút chính
        ['#btn-analyze', 'Phân tích phong thủy', () => fillSampleData()],
        ['#btn-save', 'Lưu hồ sơ', () => fillSampleData()],
        ['#btn-export', 'Xuất CSV'],
        
        // Nút tử vi và biểu đồ
        ['#btn-horoscope', 'Tra cứu tử vi', () => {
            const birth = document.getElementById('ngay-sinh');
            if (birth) birth.value = '1990-01-01';
        }],
        ['#btn-chart', 'Xem biểu đồ', () => {
            const chartName = document.getElementById('chart-name');
            if (chartName) chartName.value = 'Test User';
        }],
        
        // Nút ngày đẹp
        ['#btn-auspicious', 'Xem ngày đẹp', () => {
            const birth = document.getElementById('ngay-sinh');
            const month = document.getElementById('ad-month');
            if (birth) birth.value = '1990-01-01';
            if (month) month.value = '2025-08';
        }],
        
        // Nút phường/xã
        ['#btn-save-ward', 'Lưu phường/xã', () => {
            const wardSelect = document.getElementById('bd-ward');
            const customInput = document.getElementById('bd-ward-custom');
            if (wardSelect) wardSelect.value = '__other__';
            if (customInput) customInput.value = 'Test Ward';
            // Trigger change event
            if (wardSelect) wardSelect.dispatchEvent(new Event('change'));
        }],
        
        // Nút la bàn
        ['#btn-compass-start', 'Bắt đầu la bàn'],
        ['#btn-compass-stop', 'Dừng la bàn'],
        ['#btn-compass-apply', 'Lấy hướng nhà từ la bàn'],
        
        // Nút canvas
        ['#btn-set-center', 'Đặt tâm Bát quái'],
        ['#btn-set-entrance', 'Đặt cửa chính'],
        ['#btn-set-stair', 'Đặt cầu thang'],
        
        // Nút vẽ
        ['#btn-start-draw', 'Bắt đầu vẽ'],
        ['#btn-finish-draw', 'Hoàn tất vẽ'],
        ['#btn-undo', 'Undo'],
        ['#btn-clear', 'Xóa vẽ']
    ];
    
    // Test từng nút
    for (const [selector, name, setup] of buttonTests) {
        const result = await testButton(selector, name, setup);
        results.push({ name, result });
        if (result) passed++; else failed++;
        await wait(2000); // Đợi 2 giây giữa các test
    }
    
    // Test dropdown và select
    console.log('📋 Testing dropdowns and selects...');
    const selectTests = [
        ['#calendar-type', 'Calendar Type'],
        ['#gioi-tinh', 'Gender'],
        ['#huong-nha', 'House Direction'],
        ['#thang-xay', 'Construction Month'],
        ['#bd-province', 'Province'],
        ['#bd-ward', 'Ward']
    ];
    
    for (const [selector, name] of selectTests) {
        try {
            const select = document.querySelector(selector);
            if (select) {
                const options = select.options;
                if (options.length > 0) {
                    select.selectedIndex = 1;
                    select.dispatchEvent(new Event('change'));
                    console.log(`✅ Select working: ${name}`);
                    passed++;
                } else {
                    console.warn(`⚠️ Select has no options: ${name}`);
                    failed++;
                }
            } else {
                console.error(`❌ Select not found: ${name}`);
                failed++;
            }
        } catch (error) {
            console.error(`❌ Error testing select ${name}:`, error);
            failed++;
        }
        await wait(500);
    }
    
    // Test inputs
    console.log('📝 Testing inputs...');
    const inputTests = [
        ['#kh-ten', 'Customer Name'],
        ['#kh-phone', 'Phone Number'],
        ['#ngay-sinh', 'Birth Date'],
        ['#nam-xay', 'Construction Year'],
        ['#bd-huyen', 'District'],
        ['#bd-to', 'Plot Number'],
        ['#bd-thua', 'Land Number'],
        ['#bd-price', 'Price'],
        ['#bd-address-detail', 'Address Detail'],
        ['#bd-note', 'Notes'],
        ['#issues-search', 'Issues Search'],
        ['#profiles-search', 'Profiles Search']
    ];
    
    for (const [selector, name] of inputTests) {
        try {
            const input = document.querySelector(selector);
            if (input) {
                input.value = `Test ${name}`;
                input.dispatchEvent(new Event('input'));
                console.log(`✅ Input working: ${name}`);
                passed++;
            } else {
                console.error(`❌ Input not found: ${name}`);
                failed++;
            }
        } catch (error) {
            console.error(`❌ Error testing input ${name}:`, error);
            failed++;
        }
        await wait(200);
    }
    
    // Kiểm tra danh sách lỗi phong thủy
    console.log('⚠️ Testing issues list...');
    const issuesContainer = document.getElementById('issues-container');
    if (issuesContainer) {
        const checkboxes = issuesContainer.querySelectorAll('input[type="checkbox"]');
        if (checkboxes.length > 0) {
            console.log(`✅ Found ${checkboxes.length} feng shui issues`);
            // Test một vài checkbox
            for (let i = 0; i < Math.min(5, checkboxes.length); i++) {
                checkboxes[i].checked = true;
                checkboxes[i].dispatchEvent(new Event('change'));
            }
            console.log('✅ Issues checkboxes tested');
            passed++;
        } else {
            console.error('❌ No feng shui issues found');
            failed++;
        }
    } else {
        console.error('❌ Issues container not found');
        failed++;
    }
    
    // Kiểm tra danh sách phường/xã
    console.log('🏘️ Testing ward list...');
    const wardSelect = document.getElementById('bd-ward');
    if (wardSelect) {
        const options = wardSelect.options;
        if (options.length > 0) {
            console.log(`✅ Found ${options.length} ward options`);
            passed++;
        } else {
            console.error('❌ No ward options found');
            failed++;
        }
    } else {
        console.error('❌ Ward select not found');
        failed++;
    }
    
    // Kết quả cuối cùng
    const total = passed + failed;
    const percentage = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
    
    console.log('\n📊 ===== KẾT QUẢ TEST TỔNG HỢP =====');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${percentage}%`);
    console.log('=======================================\n');
    
    if (percentage >= 80) {
        console.log('🎉 EXCELLENT! Ứng dụng hoạt động rất tốt!');
    } else if (percentage >= 60) {
        console.log('⚠️ GOOD! Còn một vài vấn đề nhỏ cần sửa.');
    } else {
        console.log('🚨 NEEDS WORK! Có nhiều vấn đề cần khắc phục.');
    }
    
    // Chi tiết kết quả
    console.log('\n📋 Chi tiết kết quả:');
    results.forEach(({ name, result }) => {
        console.log(`${result ? '✅' : '❌'} ${name}`);
    });
    
    return { passed, failed, percentage, results };
}

// Chạy test
runAllTests().then(result => {
    console.log('🏁 Test completed!', result);
}).catch(error => {
    console.error('💥 Test failed:', error);
});
