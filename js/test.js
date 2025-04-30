document.addEventListener('DOMContentLoaded', function() {
  // Lấy các phần tử DOM
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegisterLink = document.getElementById('show-register');
  const showLoginLink = document.getElementById('show-login');
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');

  // Mặc định hiển thị form đăng nhập
  showLoginForm();

  // Sự kiện chuyển đổi giữa các form
  showRegisterLink.addEventListener('click', showRegisterForm);
  showLoginLink.addEventListener('click', showLoginForm);

  // Sự kiện đăng nhập và đăng ký
  loginBtn.addEventListener('click', login);
  registerBtn.addEventListener('click', register);

  // Hiển thị form đăng nhập và ẩn form đăng ký
  function showLoginForm() {
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
      document.getElementById('login-error').textContent = '';
  }
  
  // Hiển thị form đăng ký và ẩn form đăng nhập
  function showRegisterForm() {
      registerForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      document.getElementById('register-error').textContent = '';
  }
  
  // Kiểm tra xem tài khoản đã tồn tại chưa
  function isUsernameTaken(username) {
      const users = JSON.parse(sessionStorage.getItem('users')) || [];
      return users.some(user => user.username === username);
  }
  
  // Đăng ký tài khoản mới
  function register() {
      const username = document.getElementById('register-username').value.trim();
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const errorElement = document.getElementById('register-error');
      
      // Kiểm tra dữ liệu nhập vào
      if (!username || !password || !confirmPassword) {
          errorElement.textContent = 'Vui lòng điền đầy đủ thông tin!';
          return;
      }
      
      if (password !== confirmPassword) {
          errorElement.textContent = 'Mật khẩu không khớp!';
          return;
      }
      
      if (isUsernameTaken(username)) {
          errorElement.textContent = 'Tên đăng nhập đã tồn tại!';
          return;
      }
      
      // Lưu thông tin người dùng
      const users = JSON.parse(sessionStorage.getItem('users')) || [];
      users.push({ username, password });
      sessionStorage.setItem('users', JSON.stringify(users));
      
      // Thông báo thành công và chuyển sang form đăng nhập
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      showLoginForm();
      
      // Xóa nội dung form đăng ký
      document.getElementById('register-username').value = '';
      document.getElementById('register-password').value = '';
      document.getElementById('confirm-password').value = '';
  }
  
  // Đăng nhập
  function login() {
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value;
      const errorElement = document.getElementById('login-error');
      
      // Kiểm tra dữ liệu nhập vào
      if (!username || !password) {
          errorElement.textContent = 'Vui lòng điền đầy đủ thông tin!';
          return;
      }
      
      // Kiểm tra thông tin đăng nhập
      const users = JSON.parse(sessionStorage.getItem('users')) || [];
      const user = users.find(user => user.username === username && user.password === password);
      
      if (user) {
          // Lưu thông tin người dùng đã đăng nhập
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          alert('Đăng nhập thành công!');
          // Có thể chuyển hướng đến trang khác ở đây
          // window.location.href = 'trang-chu.html';
      } else {
          errorElement.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng!';
      }
  }
});