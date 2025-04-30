function checkHo(){
    var ho = document.getElementById("ho").value;
    var pattern = /^[A-ZÀ-Ỹ][A-Za-zà-ỹ]*(\s[A-ZĐ][A-Za-zà-ỹ]*)*$/;
    if(ho.length === 0){
        document.getElementById("hoErr").innerHTML = "Họ không được để trống";
        return false;
    }
    if(pattern.test(ho)){
        document.getElementById("hoErr").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("hoErr").innerHTML = "Họ phải viết hoa chữ cái đầu tiên và không được chứa số";
        return false;
    }
}
function checkTen(){
    var ten = document.getElementById("ten").value;
    var pattern = /^[A-ZÀ-Ỹ][A-Za-zà-ỹ]*(\s[A-ZĐ][A-Za-zà-ỹ]*)*$/;
    if(ten.length === 0){
        document.getElementById("tenErr").innerHTML = "Tên không được để trống";
        return false;
    }
    if(pattern.test(ten)){
        document.getElementById("tenErr").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("tenErr").innerHTML = "Tên phải viết hoa chữ cái đầu tiên và không được chứa số";
        return false;
    }
}
function checkDiachi(){
    var diachi = document.getElementById("diachi").value;
    var pattern = /^[A-ZÀ-Ỹà-ỹa-z0-9\s,.-]+$/;
    if(diachi.length === 0){
        document.getElementById("diachiErr").innerHTML = "Địa chỉ không được để trống";
        return false;
    }
    if(pattern.test(diachi)){
        document.getElementById("diachiErr").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("diachiErr").innerHTML = "Địa chỉ không hợp lệ";
        return false;
    }
}
function checkSDT(){
    var sdt = document.getElementById("sdt").value;
    var pattern = /^(0[2|3|5|7|8|9][0-9]{8})$/;
    if(sdt.length === 0){
        document.getElementById("sdtErr").innerHTML = "Số điện thoại không được để trống";
        return false;
    }
    if(pattern.test(sdt)){
        document.getElementById("sdtErr").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("sdtErr").innerHTML = "Số điện thoại có 10 chữ số và bắt đầu bằng 02, 03, 05, 07, 08, 09";
        return false;
    }
}
function checkEmail(){
    var email = document.getElementById("email").value;
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
    if(email.length === 0){
        document.getElementById("emailErr").innerHTML = "Email không được để trống";
        return false;
    }
    if(pattern.test(email)){
        document.getElementById("emailErr").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("emailErr").innerHTML = "Email không hợp lệ";
        return false;
    }
}
function checkMK(){
    var mk = document.getElementById("mk").value;
    var pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(mk.length === 0){
        document.getElementById("mkErr").innerHTML = "Mật khẩu không được để trống";
        return false;
    }
    if(pattern.test(mk)){
        document.getElementById("mkErr").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("mkErr").innerHTML = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số";
        return false;
    }
}
function checkXNMK(){
    var xnmkm = document.getElementById("xnmk").value;
    var mk = document.getElementById("mk").value;
    if(xnmkm === mk){
        document.getElementById("xnmkErr").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("xnmkErr").innerHTML = "Mật khẩu không khớp";
        return false;
    }
}

// Hàm đăng nhập
function checkDn() {
    const dn = document.getElementById("dn").value;
    const errorElement = document.getElementById("dnErr");
    
    // Kiểm tra xem có tài khoản nào được đăng ký trong localStorage hay không
    if (!localStorage.getItem('users')) {
        errorElement.textContent = "Tài khoản không tồn tại";
        return false;
    }

    const storedUser = JSON.parse(localStorage.getItem('users'));
    const matchedUser = storedUser.find(user => (user.email === dn || user.sdt === dn));
    if (!dn) {
        errorElement.textContent = "Vui lòng nhập email hoặc số điện thoại";
        return false;
    }
    if (!storedUser || !matchedUser) {
        errorElement.textContent = "Tài khoản không tồn tại";
        return false;
    }
    errorElement.textContent = "";
    return true;
}
function checkMKdn() {
    const dn = document.getElementById("dn").value;
    const mkdn = document.getElementById("mkdn").value;
    const errorElement = document.getElementById("mkdnErr");
    const storedUser = JSON.parse(localStorage.getItem('users'));
    const matchedUser = storedUser.find(user => ((user.email === dn || user.sdt === dn) && user.mk === mkdn));
    if (!mkdn) {
        errorElement.textContent = "Vui lòng nhập mật khẩu";
        return false;
    }
    if (!storedUser || !matchedUser) {
        errorElement.textContent = "Mật khẩu không đúng";
        return false;
    }
    errorElement.textContent = "";
    return true;
}
function checkValidDN(event) {
    if (event) event.preventDefault();
    if (checkDn() && checkMKdn()) {
        const dn = document.getElementById("dn").value;
        localStorage.setItem('loggedInUser', dn);
        alert("Đăng nhập thành công!");
        return true;
    }
    return false;
}

// Lưu dữ liệu vào localStorage khi form được submit
function saveFormData(event) {
    if (event) event.preventDefault();
    if (!checkValid()) return false;
    const newUser = {
        ho: document.getElementById("ho").value,
        ten: document.getElementById("ten").value,
        email: document.getElementById("email").value,
        sdt: document.getElementById("sdt").value,
        diachi: document.getElementById("diachi").value,
        mk: document.getElementById("mk").value,
        ngaydk: new Date().toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
    };
    // Lấy danh sách user hiện có hoặc tạo mới nếu chưa có
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Kiểm tra email hoặc số điện thoại đã tồn tại chưa
    const isExist = users.some(user => 
        user.email === newUser.email || user.sdt === newUser.sdt
    );
    if (isExist) {
        alert("Email hoặc số điện thoại đã được đăng ký!");
        return false;
    }
    // Thêm user mới vào mảng
    users.push(newUser);
    // Lưu lại vào localStorage
    localStorage.setItem('users', JSON.stringify(users));
    alert("Đăng ký thành công!");
    showLoginForm();
    return true;
}

function checkValid() {
    return (
        checkHo() &&
        checkTen() &&
        checkEmail() &&
        checkSDT() &&
        checkDiachi() &&
        checkMK() &&
        checkXNMK()
    );
}

//Hàm hiển thị form đăng ký
function showRegisterForm() {
    document.getElementById('registration-container').style.display = 'flex';
    document.getElementById('login-container').style.display = 'none';
}
// Hàm hiển thị form đăng nhập
function showLoginForm() {
    document.getElementById('registration-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', function() {
    // Mặc định hiển thị form đăng nhập
    showLoginForm();
});
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (checkValid()) {
        saveFormData();
    }
});
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    checkValidDN(event);
});