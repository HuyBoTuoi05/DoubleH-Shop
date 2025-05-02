function xemAnh() {
    const thumbnails = document.querySelectorAll("#imageModal .thumbnail-img");
    const mainImage = document.querySelector("#imageModal .modal-image");

    thumbnails.forEach(thumb => {
        thumb.addEventListener("click", function () {
            mainImage.src = this.src;
        });
    });
}
function doiAnh() {
    const thumbnails = document.querySelectorAll(".thumbnail-container .thumbnail-img");
    const mainImage = document.querySelector(".main-image-container .main-image");
    thumbnails.forEach(thumb => {
        thumb.addEventListener("click", function () {
            mainImage.src = this.src;
        });
    });
};
function addToCart(productName, productPrice, productImage) {
    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    };

    // Thêm sản phẩm vào localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    // Nếu có, tăng số lượng sản phẩm lên 1
    // Nếu chưa, thêm sản phẩm mới vào giỏ hàng
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    // Cập nhật giỏ hàng trong localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(JSON.parse(localStorage.getItem('cart')));
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
}

document.addEventListener("DOMContentLoaded", function () {
    const addToCartButton = document.getElementById('giohang');
    console.log(JSON.parse(localStorage.getItem('cart')));
    
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function () {
            const productNameElement = document.querySelector('.product-title');
            const productPriceElement = document.querySelector('.current-price');
            const productImageElement = document.querySelector('.main-image');

            if (!productNameElement || !productPriceElement || !productImageElement) {
                alert('Không thể lấy thông tin sản phẩm!');
                return;
            }

            const productName = productNameElement.textContent.trim();
            const productPrice = parseInt(productPriceElement.textContent.replace(/[^\d]/g, ''));
            const productImage = productImageElement.src;

            addToCart(productName, productPrice, productImage);
        });
    }
    xemAnh();
    doiAnh();
    updateStars(rating);
    
});