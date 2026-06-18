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





//頁數滾動
// 初始化 Lucide 圖標
lucide.createIcons();

// 抓取 DOM 節點
const listWrapper = document.querySelector('.list-wrapper');
const scrollPages = document.querySelectorAll('.scroll-page');
const pageButtons = document.querySelectorAll('.page-num');
const nextBtn = document.querySelector('.page-btn.id-next');
const lastBtn = document.querySelector('.page-btn.id-last');

let currentPage = 1;
const maxPage = scrollPages.length;

// ====== 功能 1：精準控制點擊切換 (與頂部完美對齊) ======
function scrollToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > maxPage) return;
    
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        // 計算目標頁面相對於 listWrapper 容器內部的精確偏移量
        const containerTop = listWrapper.getBoundingClientRect().top;
        const targetTop = targetPage.getBoundingClientRect().top;
        const finalScrollTop = listWrapper.scrollTop + (targetTop - containerTop);

        listWrapper.scrollTo({
            top: finalScrollTop,
            behavior: 'smooth'
        });
    }
}

// 綁定數字鍵點擊
pageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetPage = parseInt(btn.getAttribute('data-target'));
        if (targetPage) scrollToPage(targetPage);
    });
});

// 下一頁按鈕點擊
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentPage < maxPage) {
            scrollToPage(currentPage + 1);
        }
    });
}

// 最後一頁按鈕點擊
if (lastBtn) {
    lastBtn.addEventListener('click', () => {
        scrollToPage(maxPage);
    });
}


// ====== 功能 2：自動偵測 + 注入進出場動態特效 ======
const observerOptions = {
    root: listWrapper,
    threshold: 0.52 // 當有 52% 面積出現在框框內，就觸發轉場
};

const pageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const pageId = entry.target.id;
            currentPage = parseInt(pageId.replace('page-', ''));
            
            // 移除所有頁面的活動狀態，並為當前頁面單獨加上 active-page 達到放大淡入效果
            scrollPages.forEach(page => page.classList.remove('active-page'));
            entry.target.classList.add('active-page');
            
            // 同步下方按鈕的 active 狀態
            pageButtons.forEach(btn => {
                const btnTarget = parseInt(btn.getAttribute('data-target'));
                if (btnTarget === currentPage) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    });
}, observerOptions);

// 啟動滾動偵測
scrollPages.forEach(page => pageObserver.observe(page));





//搜尋
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    
    // 確保欄位存在才執行，避免其他頁面報錯
    if (!searchInput) return;

    // 監聽輸入事件（即時搜尋）
    searchInput.addEventListener("input", function () {
        const query = this.value.trim().toLowerCase();
        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            // 抓取標題與摘要文字
            const title = card.querySelector(".card-title") ? card.querySelector(".card-title").textContent.toLowerCase() : "";
            const summary = card.querySelector(".card-summary") ? card.querySelector(".card-summary").textContent.toLowerCase() : "";

            // 判斷是否包含關鍵字
            if (title.includes(query) || summary.includes(query)) {
                card.style.display = ""; // 顯示
            } else {
                card.style.display = "none"; // 隱藏
            }
        });

        // 輔助處理：如果某頁 (.scroll-page) 裡面的卡片全被隱藏了，就把該頁容器也隱藏，避免留白
        const pages = document.querySelectorAll(".scroll-page");
        pages.forEach(page => {
            const visibleCards = page.querySelectorAll('.card:not([style*="display: none"])');
            if (visibleCards.length === 0 && query !== "") {
                page.style.display = "none";
            } else {
                page.style.display = "";
            }
        });
    });
});