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
        const validUsername = 'phuocdat123';
        const validPassword = 'password123';

        if (username === validUsername && password === validPassword) {
            // Không ẩn bảng giá nữa
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
            // Không ẩn bảng giá nữa
            priceTable.style.display = 'none'; // Ẩn bảng giá nếu thông tin đăng nhập sai
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

<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
  import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"; // Thêm Firebase Authentication

  const firebaseConfig = {
    apiKey: "AIzaSyB0Ksr9vDX7drpD8h7msR5E_bfa-ERHGfU",
    authDomain: "tiemvangphuocdat-8490c.firebaseapp.com",
    projectId: "tiemvangphuocdat-8490c",
    storageBucket: "tiemvangphuocdat-8490c.appspot.com",
    messagingSenderId: "696904080135",
    appId: "1:696904080135:web:e221432fda552d5f7a83a2",
    measurementId: "G-QX6WRSNBPG"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);
  const auth = getAuth(app);

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

  // Function to handle login
  function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('User logged in:', user);
        // You can now use the logged-in user's data
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login error:', errorCode, errorMessage);
      });
  }

  window.onload = function() {
    readPriceData(); // Load data on page load
    document.getElementById('saveButton').addEventListener('click', writePriceData); // Save data on button click
    document.getElementById('loginButton').addEventListener('click', login); // Handle login on button click
  };
</script>
