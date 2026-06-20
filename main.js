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
    // 1. 原始資料庫 (保持不變)
    const allNewsData = [
        //資訊管理學會
        { id: 1, category: "資訊管理學會", badgeClass: "group-blue", icon: "users", 
            title: "【最後延長徵稿】ICIM 2026暨 育秀AI數位科技論文獎徵選辦法", 
            summary: "壹、活動宗旨 隨著人工智慧 (AI) 等新興數位科技快速演進，AI 已成為驅動產業升級與社會創新的核心引擎。為回應智慧化時代...", 
            date: "2026-02-05", link: "IM1.html" },
        { id: 2, category: "資訊管理學會", badgeClass: "group-blue", icon: "users", 
            title: "【學會成果】啟迪智慧 惠澤學子 _ 育秀AI暨數位科技研創論文獎媒體報導", 
            summary: "財團法人育秀教育基金會贊助資管學會舉辦IMP 2025國際研討會暨育秀AI數位科技研創論文獎，12/20在長庚大學盛大展開...", 
            date: "2026-01-05", link: "IM2.html" },
        { id: 3, category: "資訊管理學會", badgeClass: "group-blue", icon: "users", 
            title: "【選舉公告】中華民國資訊管理學會第十九屆理事、監事選舉自即日起開始接受候選人推薦登記", 
            summary: "主旨：中華民國資訊管理學會第十九屆理事、監事選舉公告，並自即日起開始接受候選人推薦登記。依據：人民團體選舉罷免法、中...", 
            date: "2025-12-23", link: "IM3.html" },
        { id: 4, category: "資訊管理學會", badgeClass: "group-blue", icon: "users", 
            title: "【論文徵稿】IMP 2025第30屆國際資訊管理暨實務研討會暨育秀AI數位科技研創論⽂獎", 
            summary: "『IMP 2025第30屆國際資訊管理暨實務研討會暨育秀AI數位科技研創論⽂獎』The 30th International Conference on Informat...", 
            date: "2025-09-26", link: "IM4.html" },
        { id: 5, category: "資訊管理學會", badgeClass: "group-blue", icon: "users", 
            title: "【會員代表當選公告】社團法人中華民國資訊管理學會第十八屆會員代表選舉 會員代表當選名單", 
            summary: "社團法人中華民國資訊管理學會第十八屆會員代表選舉 會員代表當選名單公告 北區: 54人 蕭瑞祥、黃明達、翁頌舜、汪志堅、廖則竣...", 
            date: "2025-07-01", link: "IM5.html" },
        { id: 6, category: "資訊管理學會", badgeClass: "group-blue", icon: "users", 
            title: "【會員代表選舉公告】有關社團法人中華民國資訊管理學會第十八屆會員代表「南區」選票備註標示錯誤之更正說明", 
            summary: "主旨：有關社團法人中華民國資訊管理學會第十八屆會員代表「南區」選票備註標示錯誤之更正說明 公告事項：一、本學會於第十八屆會員...", 
            date: "2025-06-10", link: "IM6.html" },
        { id: 7, category: "資訊管理學會", badgeClass: "group-blue", icon: "users", 
            title: "【會員代表選舉公告】中華民國資訊管理學會第十八屆會員代表通訊選舉投票公告", 
            summary: "主旨：社團法人中華民國資訊管理學會第十八屆會員代表選舉投票 依據：人民團體選舉罷免法、中華民國資訊管理學會組織章程、中華民國...", 
            date: "2025-05-13", link: "IM7.html" },

        //學校
        { id: 8, category: "學校", badgeClass: "group-emerald", icon: "landmark", 
            title: "【徵聘教師】靜宜大學 資料科學暨大數據分析與應用學系誠徵專任教師公告", 
            summary: "靜宜大學 資料科學暨大數據分析與應用學系(簡稱: 資科系)目前正在誠徵教師, 希望之專長領域為: 人工智慧、資料科學(大數據)相關領域...", 
            date: " 2026-06-03", link: "school1.html" },
        { id: 9, category: "學校", badgeClass: "group-emerald", icon: "landmark", 
            title: "【徵聘院長候選人】國立中央大學公開徵求管理學院院長候選人", 
            summary: "國立中央大學公開徵求管理學院院長候選人啟事 一、本校管理學院院長任期將屆滿，特公開徵求具前瞻理念、領導協調能力及國際視野之院...", 
            date: " 2026-04-24", link: "school2.html" },
        { id: 10, category: "學校", badgeClass: "group-emerald", icon: "landmark", 
            title: "【徵聘教師】國立臺灣科技大學資訊工程系誠徵專任教師公告", 
            summary: "國立臺灣科技大學資訊工程系誠徵專任教師公告 一、職稱:專任助理教授職級(含)以上。二、擬聘員額:專任教師 3 名,本職缺得...", 
            date: " 2026-04-21", link: "school3.html" },
        { id: 11, category: "學校", badgeClass: "group-emerald", icon: "landmark", 
            title: "【徵聘教師】國立屏東科技大學資訊管理系誠徵助理教授(含)以上專任教師1名", 
            summary: "（自115年8月1日起聘） 徵聘單位：國立屏東科技大學資訊管理系 徵聘職稱：助理教授(含)以上 名額：1名 一般資格...", 
            date: " 2026-03-24", link: "school4.html" },
        { id: 12, category: "學校", badgeClass: "group-emerald", icon: "landmark", 
            title: "【徵稿公告】2026第六屆數位醫療與醫療數據分析國際研討會 (DHA 2026) 敬邀投稿", 
            summary: "由國立高雄科技大學、高雄醫學大會、英國雪菲爾大學 (The University of Sheffield)及醫療系統聯盟聯合主辦之「2026第六屆數...", 
            date: " 2026-02-04", link: "school5.html" },
        { id: 13, category: "學校", badgeClass: "group-emerald", icon: "landmark", 
            title: "【徵聘教師】臺科大資工系聘任專任助理教授（含）以上教師 2 名", 
            summary: "一、職稱：專任助理教授職級（含）以上。二、擬聘員額：專任教師2名，本職缺得視成績增列候補人員1名，候補期間自甄...", 
            date: " 2026-01-15", link: "school6.html" },
        { id: 14, category: "學校", badgeClass: "group-emerald", icon: "landmark", 
            title: "【徵聘教師】國立東華大學資訊管理學系徵聘專任教師 2 名", 
            summary: "一、誠徵助理教授(含)以上之專任師資。二、名額：2 名。三、擬聘年度：115年2月1日(114學年度第2學期)或115年8月1日(115學年度第1學期...", 
            date: " 2025-10-27", link: "school7.html" },

        //業界
        { id: 12, category: "業界", badgeClass: "group-indigo", icon: "briefcase", 
            title: "【論文徵稿】第十一屆服務科學研究論壇暨2021中華民國資訊應用發展協會研討會", 
            summary: "第十一屆服務科學研究論壇暨2021中華民國資訊應用發展協會研討會（The 11th FSSR & 2021 ITMA Conjoint Conference）預定...", 
            date: "2021-08-09", link: "industry1.html" },
        { id: 13, category: "業界", badgeClass: "group-indigo", icon: "briefcase", 
            title: "【徵才公告】衛生福利部食品藥物管理署徵審查員2名", 
            summary: "衛生福利部食品藥物管理署 徵才公告 主旨：食品藥物管理署為強化大數據資訊應用，目前徵求2名資訊數據分析人才，相關徵才資訊如下...", 
            date: "2019-05-23", link: "industry2.html" },
        { id: 14, category: "業界", badgeClass: "group-indigo", icon: "briefcase", 
            title: "Drupal跨界整合之社群大會即將開跑", 
            summary: "現代人都知道各式網站和平台就存在於我們生活之中，而台灣有一群熱情的人們正努力推動與分享Drupal一個能夠幫助我...", 
            date: "2014-08-20", link: "industry3.html" },
    ];

    const itemsPerPage = 4;
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const resetBtn = document.getElementById("resetBtn");
    const newsListContainer = document.getElementById("newsListContainer");
    const paginationContainer = document.getElementById("paginationContainer");
    const cardTemplate = document.getElementById("cardTemplate") ? document.getElementById("cardTemplate").querySelector(".card") : null;

    // 💡 關鍵新功能：自動判斷當前頁面的分類
    function getCurrentPageCategory() {
        // 抓取網址最後的檔名，例如 "new_IM.html"
        const pageName = window.location.pathname.split("/").pop();
        
        if (pageName === "new_IM.html") {
            return "資訊管理學會";
        } else if (pageName === "new_school.html") {
            return "學校";
        } else if (pageName === "new_industry.html") {
            return "業界";
        }
        return "全部"; // 預設 new_all.html 顯示全部
    }

    const currentCategory = getCurrentPageCategory();

    // 2. 核心渲染功能 (保持不變)
    function renderContent(filteredData) {
        newsListContainer.innerHTML = "";
        paginationContainer.innerHTML = "";

        if (filteredData.length === 0) {
            newsListContainer.innerHTML = `<div class="no-data" style="text-align:center; padding: 40px; color: #888;">沒有找到相關的消息。</div>`;
            return;
        }

        const totalPages = Math.ceil(filteredData.length / itemsPerPage);

        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const pageWrapper = document.createElement("div");
            pageWrapper.className = `scroll-page ${pageNum === 1 ? "active-page" : ""}`;
            pageWrapper.id = `page-${pageNum}`;

            const startIndex = (pageNum - 1) * itemsPerPage;
            const pageItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

            pageItems.forEach(item => {
                let cardClone;
                if (cardTemplate) {
                    cardClone = cardTemplate.cloneNode(true);
                    cardClone.className = `card ${item.badgeClass}`;
                    cardClone.setAttribute("href", item.link);
                    cardClone.querySelector(".category-text").textContent = item.category;
                    cardClone.querySelector(".card-title").textContent = item.title;
                    cardClone.querySelector(".card-summary").textContent = item.summary;
                    cardClone.querySelector(".date-info span:not(.lucide)").textContent = item.date;
                    const iconEl = cardClone.querySelector(".badge-icon i");
                    if (iconEl) iconEl.setAttribute("data-lucide", item.icon);
                } else {
                    const cardAnchor = document.createElement("a");
                    cardAnchor.className = `card ${item.badgeClass}`;
                    cardAnchor.setAttribute("href", item.link);
                    cardAnchor.innerHTML = `
                        <div class="card-main">
                            <div class="category-block">
                                <div class="badge-icon"><i data-lucide="${item.icon}"></i></div>
                                <span class="category-text">${item.category}</span>
                            </div>
                            <div class="content-block">
                                <h3 class="card-title">${item.title}</h3>
                                <p class="card-summary">${item.summary}</p>
                            </div>
                        </div>
                        <div class="card-side">
                            <span class="date-info"><i data-lucide="calendar"></i><span>${item.date}</span></span>
                            <span class="more-link"><span>閱讀更多</span><i data-lucide="arrow-right"></i></span>
                        </div>
                    `;
                    cardClone = cardAnchor;
                }
                pageWrapper.appendChild(cardClone);
            });

            newsListContainer.appendChild(pageWrapper);
        }

        if (totalPages > 1) {
            const firstBtn = document.createElement("button");
            firstBtn.className = "page-btn id-first";
            firstBtn.innerHTML = `<i data-lucide="chevrons-left"></i><span>第一頁</span>`;
            firstBtn.addEventListener("click", () => {
                const targetPage = document.getElementById("page-1");
                if (targetPage) {
                    targetPage.scrollIntoView({ behavior: "smooth" });
                    updateActivePageEffects(1);
                }
            });
            paginationContainer.appendChild(firstBtn);

            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement("button");
                btn.className = `page-num ${i === 1 ? "active" : ""}`;
                btn.textContent = i;
                btn.setAttribute("data-target", i);
                btn.addEventListener("click", () => {
                    const targetPage = document.getElementById(`page-${i}`);
                    if (targetPage) {
                        targetPage.scrollIntoView({ behavior: "smooth" });
                        updateActivePageEffects(i);
                    }
                });
                paginationContainer.appendChild(btn);
            }

            const lastBtn = document.createElement("button");
            lastBtn.className = "page-btn id-last";
            lastBtn.innerHTML = `<span>最後一頁</span><i data-lucide="chevrons-right"></i>`;
            lastBtn.addEventListener("click", () => {
                const targetPage = document.getElementById(`page-${totalPages}`);
                if (targetPage) {
                    targetPage.scrollIntoView({ behavior: "smooth" });
                    updateActivePageEffects(totalPages);
                }
            });
            paginationContainer.appendChild(lastBtn);
        }

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    }

    function updateActivePageEffects(pageNum) {
        const buttons = paginationContainer.querySelectorAll(".page-num");
        buttons.forEach(btn => btn.classList.toggle("active", parseInt(btn.getAttribute("data-target")) === pageNum));

        const pages = newsListContainer.querySelectorAll(".scroll-page");
        pages.forEach(page => {
            const idNum = parseInt(page.id.replace("page-", ""));
            page.classList.toggle("active-page", idNum === pageNum);
        });
    }

    newsListContainer.addEventListener("scroll", () => {
        const pages = newsListContainer.querySelectorAll(".scroll-page");
        const containerTop = newsListContainer.getBoundingClientRect().top;
        pages.forEach(page => {
            const rect = page.getBoundingClientRect();
            if (rect.top >= containerTop - 100 && rect.top <= containerTop + 100) {
                const pageNum = parseInt(page.id.replace("page-", ""));
                updateActivePageEffects(pageNum);
            }
        });
    });

    // 💡 3. 升級版大腦：在最一開始，先過濾掉不屬於該頁面的分類資料！
    function filterAndSortData() {
        const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
        const sortOrder = sortSelect ? sortSelect.value : "latest";
        const startDateVal = startDateInput ? startDateInput.value : "";
        const endDateVal = endDateInput ? endDateInput.value : "";

        let result = allNewsData.filter(item => {
            // 先過濾：如果不是「全部」頁面，且卡片的分類跟當前頁面分類不符，直接淘汰！
            if (currentCategory !== "全部" && item.category !== currentCategory) {
                return false;
            }

            // A. 關鍵字篩選
            const matchesQuery = item.title.toLowerCase().includes(query) || 
                                 item.summary.toLowerCase().includes(query);
            
            // B. 日期區間篩選
            let matchesDate = true;
            const itemDate = new Date(item.date);
            if (startDateVal) {
                const start = new Date(startDateVal);
                if (itemDate < start) matchesDate = false;
            }
            if (endDateVal) {
                const end = new Date(endDateVal);
                end.setHours(23, 59, 59, 999);
                if (itemDate > end) matchesDate = false;
            }

            return matchesQuery && matchesDate;
        });

        // 排序
        result.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
        });

        renderContent(result);
    }

    // 4. 監聽控制項
    if (searchInput) searchInput.addEventListener("input", filterAndSortData);
    if (sortSelect) sortSelect.addEventListener("change", filterAndSortData);
    if (startDateInput) startDateInput.addEventListener("change", filterAndSortData);
    if (endDateInput) endDateInput.addEventListener("change", filterAndSortData);

    // 清除篩選按鈕
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            if (startDateInput) startDateInput.value = "";
            if (endDateInput) endDateInput.value = "";
            if (sortSelect) sortSelect.value = "latest";
            filterAndSortData();
        });
    }

    // 初始化渲染
    filterAndSortData();
});




