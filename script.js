import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const priceTable = document.getElementById('priceTable');
    const loginMessage = document.getElementById('loginMessage');
    const headerContent = document.querySelector('.header-content');
    const loginSection = document.querySelector('.login');
    const datetimeElement = document.getElementById('datetime');

    function updateDatetime() {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const formattedTime = now.toLocaleTimeString('vi-VN');
        datetimeElement.textContent = `Ngày: ${formattedDate}, Giờ: ${formattedTime}`;
    }

    updateDatetime();
    setInterval(updateDatetime, 1000);

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
                console.log('Giá đã được lưu thành công.');
            })
            .catch((error) => {
                console.error('Lỗi khi lưu giá:', error);
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
                console.log("Không có dữ liệu.");
            }
        }).catch((error) => {
            console.error('Lỗi khi đọc dữ liệu:', error);
        });
    }

    function login(event) {
        event.preventDefault();

        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Người dùng đã đăng nhập:', user);

                priceTable.style.display = 'block';
                loginMessage.style.display = 'none';
                loginSection.classList.add('hidden');
                headerContent.classList.add('center');
                datetimeElement.style.display = 'block';

                readPriceData();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Lỗi đăng nhập:', errorCode, errorMessage);
                loginMessage.style.display = 'block';
                priceTable.style.display = 'none';
            });
    }

    loginForm.addEventListener('submit', login);
    document.getElementById('saveButton').addEventListener('click', writePriceData);
    readPriceData();
});
