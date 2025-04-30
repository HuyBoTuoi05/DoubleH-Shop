function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMore');
    const products = document.querySelectorAll('#product-list .col');
    const maxVisible = 8; // Số lượng sản phẩm hiển thị ban đầu

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            const hiddenProducts = Array.from(products).slice(maxVisible); // Lấy các sản phẩm vượt quá maxVisible

            if (hiddenProducts.some(product => product.classList.contains('hidden'))) {
                // Hiển thị tất cả sản phẩm
                hiddenProducts.forEach(product => {
                    product.classList.remove('hidden');
                    product.style.display = "block";
                });
                loadMoreBtn.innerHTML = '<i class="bi bi-dash-circle me-2"></i>Thu gọn';
            } else {
                // Ẩn lại các sản phẩm vượt quá maxVisible
                hiddenProducts.forEach(product => {
                    product.classList.add('hidden');
                    product.style.display = "none";
                });
                loadMoreBtn.innerHTML = '<i class="bi bi-plus-circle me-2"></i>Xem thêm sản phẩm';
            }
        });
    }
}

function initCategoryFilter() {
    const selectElement = document.getElementById("loaiSP");
    const products = document.querySelectorAll('#product-list .col');
    const maxVisible = 8; // Số lượng sản phẩm hiển thị ban đầu

    if (selectElement) {
        selectElement.addEventListener("change", function () {
            const selectedCategory = this.value;

            let visibleCount = 0; // Đếm số sản phẩm hiển thị

            products.forEach(product => {
                const productCategory = product.getAttribute("data-category");

                if (selectedCategory === "0" || productCategory === selectedCategory) {
                    if (visibleCount < maxVisible) {
                        product.classList.remove('hidden');
                        product.style.display = "block";
                        visibleCount++;
                    } else {
                        product.classList.add('hidden');
                        product.style.display = "none";
                    }
                } else {
                    product.classList.add('hidden');
                    product.style.display = "none";
                }
            });

            // Cập nhật trạng thái nút "Xem thêm sản phẩm"
            initLoadMore();
        });
    }
}

function initLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('btn-outline-secondary');
            this.classList.toggle('btn-danger');
            const icon = this.querySelector('i');
            icon.classList.toggle('bi-heart');
            icon.classList.toggle('bi-heart-fill');
        });
    });
}

function sortProductsHighToLow() {
    const productList = document.getElementById('product-list');
    const products = Array.from(productList.getElementsByClassName('col'));

    // Lấy giá trị giá từ sản phẩm và sắp xếp
    products.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.text-danger').textContent.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.querySelector('.text-danger').textContent.replace(/[^\d]/g, ''));
        return priceB - priceA; // Sắp xếp giảm dần
    });

    // Xóa các sản phẩm cũ và thêm lại theo thứ tự mới
    products.forEach(product => productList.appendChild(product));
}
function sortProductsLowToHigh() {
    const productList = document.getElementById('product-list');
    const products = Array.from(productList.getElementsByClassName('col'));

    // Lấy giá trị giá từ sản phẩm và sắp xếp
    products.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.text-danger').textContent.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.querySelector('.text-danger').textContent.replace(/[^\d]/g, ''));
        return priceA - priceB; // Sắp xếp tăng dần
    });

    // Xóa các sản phẩm cũ và thêm lại theo thứ tự mới
    products.forEach(product => productList.appendChild(product));
}
function sortProductsKhuyenMai() {
    const productList = document.getElementById('product-list');
    const products = Array.from(productList.getElementsByClassName('col'));

    // Lấy giá trị phần trăm khuyến mãi từ sản phẩm và sắp xếp
    products.sort((a, b) => {
        const discountA = getDiscountPercent(a);
        const discountB = getDiscountPercent(b);
        return discountB - discountA; // Sắp xếp giảm dần theo phần trăm khuyến mãi
    });

    // Xóa các sản phẩm cũ và thêm lại theo thứ tự mới
    products.forEach(product => productList.appendChild(product));
}

// Hàm tính phần trăm khuyến mãi
function getDiscountPercent(product) {
    const originalPrice = parseInt(product.querySelector('.text-muted').textContent.replace(/[^\d]/g, ''));
    const salePrice = parseInt(product.querySelector('.text-danger').textContent.replace(/[^\d]/g, ''));
    if (!originalPrice || !salePrice) return 0; // Nếu không có giá, trả về 0
    return ((originalPrice - salePrice) / originalPrice) * 100; // Tính phần trăm khuyến mãi
}
function sortProductsXemNhieu() {
    const productList = document.getElementById('product-list');
    const products = Array.from(productList.getElementsByClassName('col'));

    // Lấy số lượng "Đã bán" từ sản phẩm và sắp xếp
    products.sort((a, b) => {
        const soldA = parseInt(a.querySelector('.small.text-muted').textContent.replace(/[^\d]/g, ''));
        const soldB = parseInt(b.querySelector('.small.text-muted').textContent.replace(/[^\d]/g, ''));
        return soldB - soldA; // Sắp xếp giảm dần theo số lượng đã bán
    });

    // Xóa các sản phẩm cũ và thêm lại theo thứ tự mới
    products.forEach(product => productList.appendChild(product));
}
document.addEventListener('DOMContentLoaded', function () {
    initLoadMore();
    initCategoryFilter();
    initLikeButtons();
    const sortHighToLowBtn = document.getElementById('sortHighToLow');
    if (sortHighToLowBtn) {
        sortHighToLowBtn.addEventListener('click', sortProductsHighToLow);
    }
    const sortLowToHighBtn = document.getElementById('sortLowToHigh');
    if (sortLowToHighBtn) {
        sortLowToHighBtn.addEventListener('click', sortProductsLowToHigh);
    }
    const sortKhuyenMaiBtn = document.getElementById('sortKhuyenMai');
    if (sortKhuyenMaiBtn) {
        sortKhuyenMaiBtn.addEventListener('click', sortProductsKhuyenMai);
    }
    const sortXemNhieuBtn = document.getElementById('sortXemNhieu');
    if (sortXemNhieuBtn) {
        sortXemNhieuBtn.addEventListener('click', sortProductsXemNhieu);
    }
});

window.changeModalImage = changeModalImage;