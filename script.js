// Import các hàm cần thiết từ Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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

 