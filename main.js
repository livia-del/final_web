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
