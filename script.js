document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const priceTable = document.getElementById('priceTable');
    const loginMessage = document.getElementById('loginMessage');
    const headerContent = document.querySelector('.header-content'); // Chọn tiêu đề và thông tin liên lạc
    const loginSection = document.querySelector('.login'); // Chọn phần form đăng nhập
    const datetimeElement = document.getElementById('datetime'); // Phần tử hiển thị thời gian và ngày tháng

    // Cập nhật thời gian và ngày tháng
    function updateDatetime() {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const formattedTime = now.toLocaleTimeString('vi-VN');
        datetimeElement.textContent = `Ngày: ${formattedDate}, Giờ: ${formattedTime}`;
    }

    // Gọi hàm cập nhật thời gian khi tải trang
    updateDatetime();

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn form gửi đi

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Tài khoản ví dụ
        const validUsername = 'phuocdat';
        const validPassword = 'admin687294';

        if (username === validUsername && password === validPassword) {
            priceTable.style.display = 'block'; // Hiển thị bảng giá
            loginMessage.style.display = 'none'; // Ẩn thông báo lỗi

            // Ẩn form đăng nhập và nền của nó
            loginSection.classList.add('hidden');

            // Căn giữa tiêu đề và thông tin liên lạc
            headerContent.classList.add('center');

            // Hiển thị thời gian và ngày tháng
            datetimeElement.style.display = 'block';

            // Cập nhật thời gian mỗi giây
            setInterval(updateDatetime, 1000); // Cập nhật mỗi giây
        } else {
            loginMessage.style.display = 'block'; // Hiển thị thông báo lỗi
            priceTable.style.display = 'none'; // Ẩn bảng giá
        }
    });
});

// Lấy tất cả các trường giá từ Local Storage khi trang tải
window.onload = function() {
    const buyPrice999 = localStorage.getItem('buyPrice999');
    const sellPrice999 = localStorage.getItem('sellPrice999');
    const buyPrice980 = localStorage.getItem('buyPrice980');
    const sellPrice980 = localStorage.getItem('sellPrice980');
    const buyPrice960 = localStorage.getItem('buyPrice960');
    const sellPrice960 = localStorage.getItem('sellPrice960');
    const buyPrice610 = localStorage.getItem('buyPrice610');
    const sellPrice610 = localStorage.getItem('sellPrice610');

    if (buyPrice999) document.getElementById('buyPrice999').value = buyPrice999;
    if (sellPrice999) document.getElementById('sellPrice999').value = sellPrice999;
    if (buyPrice980) document.getElementById('buyPrice980').value = buyPrice980;
    if (sellPrice980) document.getElementById('sellPrice980').value = sellPrice980;
    if (buyPrice960) document.getElementById('buyPrice960').value = buyPrice960;
    if (sellPrice960) document.getElementById('sellPrice960').value = sellPrice960;
    if (buyPrice610) document.getElementById('buyPrice610').value = buyPrice610;
    if (sellPrice610) document.getElementById('sellPrice610').value = sellPrice610;
};

// Lưu giá trị vào Local Storage khi giá trị thay đổi
document.addEventListener('input', function(event) {
    if (event.target.matches('.price-table input')) {
        const id = event.target.id;
        const value = event.target.value;
        localStorage.setItem(id, value);
    }
});

