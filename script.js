// script.js

// Ghi dữ liệu vào Firebase
function writePriceData() {
    const prices = {
      buyPrice999: document.getElementById('buyPrice999').value,
      sellPrice999: document.getElementById('sellPrice999').value,
      buyPrice980: document.getElementById('buyPrice980').value,
      sellPrice980: document.getElementById('sellPrice980').value,
      buyPrice960: document.getElementById('buyPrice960').value,
      sellPrice960: document.getElementById('sellPrice960').value,
      buyPrice610: document.getElementById('buyPrice610').value,
      sellPrice610: document.getElementById('sellPrice610').value,
    };
  
    set(ref(database, 'prices/'), prices)
      .then(() => {
        console.log('Prices saved successfully.');
      })
      .catch((error) => {
        console.error('Error saving prices:', error);
      });
  }
  
  // Đọc dữ liệu từ Firebase
  function readPriceData() {
    const dbRef = ref(database, 'prices/');
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        document.getElementById('buyPrice999').value = data.buyPrice999;
        document.getElementById('sellPrice999').value = data.sellPrice999;
        document.getElementById('buyPrice980').value = data.buyPrice980;
        document.getElementById('sellPrice980').value = data.sellPrice980;
        document.getElementById('buyPrice960').value = data.buyPrice960;
        document.getElementById('sellPrice960').value = data.sellPrice960;
        document.getElementById('buyPrice610').value = data.buyPrice610;
        document.getElementById('sellPrice610').value = data.sellPrice610;
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error('Error reading data:', error);
    });
  }
  
  // Khi trang tải
  window.onload = function() {
    readPriceData();
    updateDatetime(); // Đảm bảo thời gian và ngày tháng được cập nhật khi tải trang
  };
  
  // Cập nhật thời gian và ngày tháng
  function updateDatetime() {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const formattedTime = now.toLocaleTimeString('vi-VN');
      datetimeElement.textContent = `Ngày: ${formattedDate}, Giờ: ${formattedTime}`;
  }
  
  // Xử lý sự kiện submit của form đăng nhập
  document.addEventListener('DOMContentLoaded', function() {
      const loginForm = document.getElementById('loginForm');
      const priceTable = document.getElementById('priceTable');
      const loginMessage = document.getElementById('loginMessage');
      const headerContent = document.querySelector('.header-content'); // Chọn tiêu đề và thông tin liên lạc
      const loginSection = document.querySelector('.login'); // Chọn phần form đăng nhập
      const datetimeElement = document.getElementById('datetime'); // Phần tử hiển thị thời gian và ngày tháng
  
      // Gọi hàm cập nhật thời gian mỗi giây
      setInterval(updateDatetime, 1000); // Cập nhật mỗi giây
  
      loginForm.addEventListener('submit', function(event) {
          event.preventDefault(); // Ngăn chặn form gửi đi
  
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
  
          // Tài khoản ví dụ
          const validUsername = 'phuocdat123';
          const validPassword = 'password123';
  
          if (username === validUsername && password === validPassword) {
              priceTable.style.display = 'block'; // Hiển thị bảng giá
              loginMessage.style.display = 'none'; // Ẩn thông báo lỗi
  
              // Ẩn form đăng nhập và nền của nó
              loginSection.classList.add('hidden');
  
              // Căn giữa tiêu đề và thông tin liên lạc
              headerContent.classList.add('center');
  
              // Hiển thị thời gian và ngày tháng
              datetimeElement.style.display = 'block';
  
              // Đọc dữ liệu giá từ Firebase
              readPriceData();
          } else {
              loginMessage.style.display = 'block'; // Hiển thị thông báo lỗi
              priceTable.style.display = 'none'; // Ẩn bảng giá
          }
      });
  });
  
  // Lưu giá trị vào Firebase khi giá trị thay đổi
  document.addEventListener('input', function(event) {
      if (event.target.matches('.price-table input')) {
          writePriceData();
      }
  });
  