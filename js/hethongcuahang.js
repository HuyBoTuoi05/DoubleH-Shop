
document.addEventListener('DOMContentLoaded', function() {
    // Xử lý click vào card cửa hàng
    const storeCards = document.querySelectorAll('.store-card');
    
    storeCards.forEach(card => {
        card.addEventListener('click', function() {
            storeCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    
    // Xử lý nút chỉ đường
    document.querySelectorAll('.btn-outline-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.store-card');
            const storeId = card.dataset.store;
            let address = '';
            switch(storeId) {
                case '1':
                    address = '14 Nguyễn Văn Bảo, P.4, Gò Vấp';
                    break;
                case '2':
                    address = '456 Lê Đức Thọ, P.15, Gò Vấp';
                    break;
                case '3':
                    address = '789 Nguyễn Oanh, P.17, Gò Vấp';
                    break;
            }
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank');
        });
    });
});