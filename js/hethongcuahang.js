// Biến toàn cục
let map;
let markers = [];

function initOptimizedMap() {
    // 1. Sử dụng requestAnimationFrame để khởi tạo mượt mà
    requestAnimationFrame(() => {
        // 2. Tạo bản đồ với tùy chọn tối ưu
        map = L.map('simple-store-map', {
            center: [10.8381, 106.6650],
            zoom: 14,
            zoomControl: false, // Tắt control nếu không cần
            preferCanvas: true, // Sử dụng Canvas thay SVG cho performance tốt hơn
            inertia: false // Tắt hiệu ứng inertia nếu không cần
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap',
            subdomains: 'abcd',
            maxZoom: 19,
            minZoom: 12
        }).addTo(map);

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                map.invalidateSize();
            }, 200);
        });

        // 7. Tối ưu sự kiện click card
        const storeCards = document.querySelectorAll('.store-card');
        storeCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                storeCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                map.flyTo(markers[index].getLatLng(), 16, {
                    duration: 0.5 // Giảm thời gian animation
                });
                
                markers[index].openPopup();
            });
        });
    });
}

// Khởi tạo khi DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js';
    script.onload = () => {
        const clusterScript = document.createElement('script');
        clusterScript.src = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js';
        clusterScript.onload = initOptimizedMap;
        document.head.appendChild(clusterScript);
    };
    document.head.appendChild(script);
});