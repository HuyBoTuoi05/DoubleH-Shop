
document.addEventListener('DOMContentLoaded', function() {
    initLoadMore();
    initLikeButtons();
});


function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMore');
    const moreProducts = document.getElementById('more-products');
    
    if (loadMoreBtn && moreProducts) {
        loadMoreBtn.addEventListener('click', function() {
            moreProducts.classList.toggle('hidden');
            if (moreProducts.classList.contains('hidden')) {
                loadMoreBtn.innerHTML = '<i class="bi bi-plus-circle me-2"></i>Xem thêm sản phẩm';
            } else {
                loadMoreBtn.innerHTML = '<i class="bi bi-dash-circle me-2"></i>Thu gọn';
            }
        });
    }
}

function initLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('btn-outline-secondary');
            this.classList.toggle('btn-danger');
            const icon = this.querySelector('i');
            icon.classList.toggle('bi-heart');
            icon.classList.toggle('bi-heart-fill');
        });
    });
}

function changeModalImage(src) {
    document.getElementById('modalMainImage').src = src;
    const thumbs = document.querySelectorAll('.thumb-img');
    thumbs.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === src) thumb.classList.add('active');
    });
}

window.changeModalImage = changeModalImage;