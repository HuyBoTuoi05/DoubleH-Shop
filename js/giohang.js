// Hàm cập nhật tổng giá
function updateTotalPrice(cartItemsContainer, totalPriceElement) {
    const cartItems = cartItemsContainer.querySelectorAll('tr'); // Lấy lại danh sách sản phẩm
    let total = 0;

    cartItems.forEach(item => {
        const price = parseInt(item.querySelector('td:nth-child(3)').textContent.replace(/[^\d]/g, ''));
        const quantity = parseInt(item.querySelector('input[type="number"]').value);
        total += price * quantity;
    });

    totalPriceElement.textContent = total.toLocaleString('vi-VN') + '₫';
}

function renderCart(cartItemsContainer, totalPriceElement, cart) {
    cartItemsContainer.innerHTML = ''; // Xóa nội dung cũ
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        // Tạo hàng sản phẩm
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" class="img-fluid" style="max-width: 80px;"></td>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString('vi-VN')}₫</td>
            <td>
                <input type="number" class="form-control text-center" value="${item.quantity}" min="1" style="max-width: 80px;">
            </td>
            <td>${itemTotal.toLocaleString('vi-VN')}₫</td>
            <td>
                <button class="btn btn-danger btn-sm">Xóa</button>
            </td>
        `;

        // Thêm sự kiện thay đổi số lượng
        const quantityInput = row.querySelector('input[type="number"]');
        quantityInput.addEventListener('change', function () {
            const newQuantity = parseInt(this.value);
            if (newQuantity < 1) {
                this.value = 1;
                return;
            }
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(JSON.parse(localStorage.getItem('cart')));
            renderCart(cartItemsContainer, totalPriceElement, cart); // Cập nhật lại giỏ hàng
        });

        // Thêm sự kiện xóa sản phẩm
        const deleteButton = row.querySelector('.btn-danger');
        deleteButton.addEventListener('click', function () {
            cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(JSON.parse(localStorage.getItem('cart'))); // Kiểm tra sau khi xóa sản phẩm
            renderCart(cartItemsContainer, totalPriceElement, cart); // Cập nhật lại giỏ hàng
        });

        cartItemsContainer.appendChild(row);
    });

    // Cập nhật tổng giá
    totalPriceElement.textContent = total.toLocaleString('vi-VN') + '₫';
}

// Hàm khởi tạo giỏ hàng
function initializeCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra nếu giỏ hàng trống
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="6" class="text-center">Giỏ hàng trống</td></tr>';
        totalPriceElement.textContent = '0₫';
        return;
    }

    // Hiển thị giỏ hàng
    renderCart(cartItemsContainer, totalPriceElement, cart);
}
// Chạy khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', initializeCart);

document.addEventListener('DOMContentLoaded', function () {
    const checkoutButton = document.getElementById('checkout');

    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            // Lấy giỏ hàng từ localStorage
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Kiểm tra nếu giỏ hàng trống
            if (cart.length === 0) {
                alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.');
                return;
            }

            // Hiển thị thông báo xác nhận thanh toán
            const confirmCheckout = confirm('Bạn có chắc chắn muốn thanh toán?');
            if (confirmCheckout) {
                // Xóa giỏ hàng
                localStorage.removeItem('cart');
                alert('Thanh toán thành công! Cảm ơn bạn đã mua hàng.');
                // Tải lại trang để cập nhật giao diện
                location.reload();
            }
        });
    }
});