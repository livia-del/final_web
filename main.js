window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    const btn = document.getElementById("backToTop");
    // 當頁面捲動超過 100px 時顯示按鈕，否則隱藏
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

// 2. 點擊按鈕後回到頂部的功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 關鍵：平滑滾動效果
    });
}


//旋轉木馬
document.addEventListener("DOMContentLoaded", function () {
    const windowEl = document.querySelector(".mission-carousel-window");
    const track = document.getElementById("carouselTrack");
    const items = document.querySelectorAll(".mission-text-item");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let currentIndex = 0;
    let autoPlay;

    function updateCarousel(index) {
        // 處理邊界條件
        if (index >= items.length) currentIndex = 0;
        else if (index < 0) currentIndex = items.length - 1;
        else currentIndex = index;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        // 更新分頁圓點狀態
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    // 初始化寬度與定位
    updateCarousel(0);

    // 監聽視窗縮放（RWD），防止螢幕大小改變時錯位
    window.addEventListener("resize", () => {
        updateCarousel(currentIndex);
    });

    // 按鈕點擊滑動
    nextBtn.addEventListener("click", () => updateCarousel(currentIndex + 1));
    prevBtn.addEventListener("click", () => updateCarousel(currentIndex - 1));

    // 圓點點擊滑動
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => updateCarousel(i));
    });

    // 開啟自動輪播（每 2 秒）
    function startAutoPlay() {
        autoPlay = setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 2000);
    }

    startAutoPlay();

    // 當滑鼠移入時停止自動輪播，移出時重啟
    const container = document.querySelector(".mission-carousel-container");
    container.addEventListener("mouseenter", () => clearInterval(autoPlay));
    container.addEventListener("mouseleave", startAutoPlay);
});