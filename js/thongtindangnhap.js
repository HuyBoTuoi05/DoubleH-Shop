window.onload = function() {
    // localStorage.clear();
    // Xóa localStorage khi tải lại trang 
    const loggedInUser = localStorage.getItem('loggedInUser'); 
    if (loggedInUser) {
        displayCustomerInfo(loggedInUser);
    }
};
// Hàm lấy thông tin khách hàng dựa trên email hoặc số điện thoại
function getCustomerInfo(identifier) {
    // Lấy danh sách users từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Tìm user theo email hoặc số điện thoại
    const customer = users.find(user => 
        user.email === identifier || user.sdt === identifier
    );
    
    return customer; // Trả về thông tin khách hàng hoặc undefined nếu không tìm thấy
}

function displayCustomerInfo(identifier) {
    const customer = getCustomerInfo(identifier);
    if (!customer) {
        console.error("Không tìm thấy thông tin khách hàng");
        // Có thể hiển thị thông báo cho người dùng
        return;
    }
    
    // Hiển thị thông tin lên các phần tử HTML
    document.getElementById('Hoten').innerHTML = customer.ho + " " +  customer.ten; 
    document.getElementById('email').innerHTML =  customer.email;
    document.getElementById('mk').innerHTML =  customer.mk.replace(/./g, '•'); // Ẩn mật khẩu
    document.getElementById('sdt').innerHTML =  customer.sdt;
    document.getElementById('diachi').innerHTML =  customer.diachi;
    document.getElementById('ngaydk').innerHTML = customer.ngaydk;
}

// Biến lưu trữ mật khẩu thực
let realPassword = '';
// Lấy mật khẩu thực 
const loggedInUser = localStorage.getItem('loggedInUser');
const customer = getCustomerInfo(loggedInUser);
realPassword = customer.mk || '';

// Hàm hiển thị/ẩn mật khẩu
function togglePassword() {
    const passwordElement = document.getElementById('mk');
    const eyeIcon = document.querySelector('.btn-show-password i');

    if (passwordElement.textContent === realPassword) {
        // Ẩn mật khẩu
        passwordElement.textContent = '•'.repeat(realPassword.length);
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
        passwordElement.classList.add('password-value'); // Thêm lại class style
    } else {
        // Hiện mật khẩu
        passwordElement.textContent = realPassword;
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
        passwordElement.classList.remove('password-value'); // Bỏ style ẩn mật khẩu
    }
}

function logout() {
    // Xóa thông tin đăng nhập
    localStorage.removeItem('loggedInUser');
    
    alert("Đăng xuất thành công!");
    window.location.href = "../HTML/dangky.html"; // Chuyển về trang đăng nhập
}
