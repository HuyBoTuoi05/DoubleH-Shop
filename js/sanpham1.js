function xemAnh() {
    const thumbnails = document.querySelectorAll("#imageModal .thumb-img");
    const mainImage = document.querySelector("#imageModal .modal-body img");

    thumbnails.forEach(thumb => {
        thumb.addEventListener("click", function () {
            mainImage.src = this.src;
        });
    });
}
function chonMau(){
    const options = document.querySelectorAll(".color-option");
    options.forEach(option => {
        option.addEventListener("click", function () {
            options.forEach(opt => opt.classList.remove("selected"));
            this.classList.add("selected");

            const selectedColor = this.getAttribute("data-color");
            console.log("Màu được chọn:", selectedColor);        });
    });
}
const stars = document.querySelectorAll(".rating i");
let rating = 0;
stars.forEach(star => {
    star.addEventListener("click", function () {
        rating = this.getAttribute("data-rate");
        updateStars(rating);
    });
});
function updateStars(rate) {
    stars.forEach(star => {
        if (star.getAttribute("data-rate") <= rate) {
            star.classList.add("active");
        } else {
            star.classList.remove("active");
        }
    });
}

function doiAnh() {
    const thumbnails = document.querySelectorAll("#anh .thumb-img");
    const mainImage = document.querySelector(".imgMain img");

    thumbnails.forEach(thumb => {
        thumb.addEventListener("click", function () {
            mainImage.src = this.src;
        });
    });
};
document.addEventListener("DOMContentLoaded", function () {
    doiAnh();
    updateStars(rating);
    xemAnh();
    chonMau();
    anhChay("anhChinh", 3000);
});
