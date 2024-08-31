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
    setInterval(updateDatetime, 1000); // Cập nhật mỗi giây

    // Khởi tạo Firebase
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

    // Hàm ghi dữ liệu giá vào Firebase
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

    // Hàm đọc dữ liệu giá từ Firebase
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

    // Hàm xử lý đăng nhập
    function login(event) {
        event.preventDefault(); // Ngăn chặn gửi form

        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Đăng nhập thành công
                const user = userCredential.user;
                console.log('Người dùng đã đăng nhập:', user);

                // Hiển thị bảng giá
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
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Lỗi đăng nhập:', errorCode, errorMessage);
                loginMessage.style.display = 'block'; // Hiển thị thông báo lỗi
                priceTable.style.display = 'none'; // Ẩn bảng giá nếu đăng nhập sai
            });
    }

    // Lắng nghe sự kiện khi gửi form đăng nhập
    loginForm.addEventListener('submit', login);

    // Lắng nghe sự kiện để lưu giá
    document.getElementById('saveButton').addEventListener('click', writePriceData);

    // Đọc dữ liệu giá khi trang tải
    readPriceData();
});
