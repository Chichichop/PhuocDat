// Import các hàm cần thiết từ Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
//01/09/2024
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";


// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC4MQQil3glnu91OVEzWweBlyp2eEOC3eo",
    authDomain: "phuocdat-35f05.firebaseapp.com",
    projectId: "phuocdat-35f05",
    storageBucket: "phuocdat-35f05.appspot.com",
    messagingSenderId: "755558027609",
    appId: "1:755558027609:web:ac11bae129942d41abbc48",
    measurementId: "G-D9XT8RNJ55",
    databaseURL: "https://phuocdat-35f05-default-rtdb.firebaseio.com/",
};

// Khởi tạo ứng dụng Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Khởi tạo Firebase Realtime Database
const database = getDatabase(app); 
console.log(database)
const starCountRef = ref(database, "buyPrice");
console.log(starCountRef)

onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    
  });

// Hàm để cập nhật giá vàng trong Realtime Database
function updateGoldPrice(type, buyPrice, sellPrice) {
    set(ref(database, 'goldPrices/' + type), {
        buy: buyPrice,
        sell: sellPrice
    });
}

// Lắng nghe sự thay đổi giá vàng từ Firebase
function listenForGoldPriceChanges() {
    const goldPricesRef = ref(database, 'goldPrices');
    onValue(goldPricesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            Object.keys(data).forEach(type => {
                document.getElementById(`buyPrice${type}`).value = data[type].buy;
                document.getElementById(`sellPrice${type}`).value = data[type].sell;
            });
            console.log(data)
        }
    });
}


// Gọi hàm lắng nghe khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    listenForGoldPriceChanges();
});

// Thêm sự kiện cập nhật giá khi người dùng chỉnh sửa giá vàng
document.querySelectorAll('.buy-price input, .sell-price input').forEach(input => {
    input.addEventListener('change', (event) => {
        const type = event.target.closest('tr').querySelector('.type').textContent.trim(); // Đảm bảo không có khoảng trắng thừa
        const buyPrice = document.getElementById(`buyPrice${type}`).value;
        const sellPrice = document.getElementById(`sellPrice${type}`).value;
        updateGoldPrice(type, buyPrice, sellPrice);
    });
});


// Hàm cập nhật ngày giờ
function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    const dateString = now.toLocaleDateString('vi-VN', options);
    
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const timeString = now.toLocaleTimeString('vi-VN', timeOptions);

    const dateTimeString = `${dateString} ${timeString}`;
    document.getElementById('currentDateTime').textContent = dateTimeString;
}

// Cập nhật ngày giờ khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    updateDateTime();
    // Cập nhật ngày giờ mỗi giây
    setInterval(updateDateTime, 1000);
});

console.log(auth);




//10:27 01/09/2024
function toggleInputFields(isEnabled) {
    const inputs = document.querySelectorAll('.price-table input');
    inputs.forEach(input => {
        input.disabled = !isEnabled;
    });
}

// Xử lý việc đăng nhập
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Đăng nhập thành công
            const user = userCredential.user;
            console.log("Đăng nhập thành công:", user);
            toggleInputFields(true); // Mở khóa các trường nhập liệu
            document.getElementById('loginForm').style.display = 'none'; // Ẩn form đăng nhập
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById('loginMessage').style.display = 'block'; // Hiện thông báo lỗi
            console.error("Lỗi đăng nhập:", errorCode, errorMessage);
        });
});

// Kiểm tra trạng thái đăng nhập
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Người dùng đã đăng nhập
        toggleInputFields(true); // Mở khóa các trường nhập liệu
        document.getElementById('loginForm').style.display = 'none'; // Ẩn form đăng nhập
    } else {
        // Người dùng chưa đăng nhập
        toggleInputFields(false); // Khóa các trường nhập liệu
        document.getElementById('loginForm').style.display = 'block'; // Hiện form đăng nhập
    }
});



// Sự kiện click vào logo để reset trạng thái về trước khi đăng nhập
document.getElementById('logo').addEventListener('click', () => {
    // Khóa các ô nhập liệu
    toggleInputFields(false);

    // Hiển thị lại form đăng nhập
    document.getElementById('loginForm').style.display = 'block';

    // Xóa thông báo lỗi đăng nhập (nếu có)
    document.getElementById('loginMessage').style.display = 'none';
});
