// ===== Drawer =====
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

const productToggle = document.getElementById("productToggle");
const productSubmenu = document.getElementById("productSubmenu");

function openDrawer(){
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden","false");
  overlay.hidden = false;
  menuBtn.setAttribute("aria-expanded","true");
  document.body.style.overflow = "hidden";
}


function closeDrawer(){
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden","true");
  menuBtn.setAttribute("aria-expanded","false");
  if(!searchPanel.classList.contains("open")) overlay.hidden = true;
  document.body.style.overflow = "";
}
//===========點擊☰展開Drawer，在展開狀態再次點擊☰收合=========
//menuBtn.addEventListener("click", openDrawer);  >>這是你原本寫的

menuBtn.addEventListener("click", () => {
  // 檢查目前 drawer 是否含有 "open" class
  const isOpen = drawer.classList.contains("open");
  
  if (isOpen) {
    closeDrawer(); // 如果已經是開的，就執行收合
  } else {
    openDrawer();  // 如果是關的，就執行展開
  }
});
//==============點擊☰展開Drawer，在展開狀態再次點擊☰收合=========
closeBtn.addEventListener("click", closeDrawer);

productToggle.addEventListener("click", () => {
  const expanded = productToggle.getAttribute("aria-expanded") === "true";
  productToggle.setAttribute("aria-expanded", String(!expanded));
  productSubmenu.hidden = expanded;
  productToggle.querySelector(".chev").textContent = expanded ? "▾" : "▴";
});

// ===== Search =====
const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const searchCloseBtn = document.getElementById("searchCloseBtn");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

function openSearch(){
  searchPanel.classList.add("open");
  searchPanel.setAttribute("aria-hidden","false");
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  searchInput.value = "";
  searchResults.innerHTML = "";
  setTimeout(()=>searchInput.focus(), 0);
}
function closeSearch(){
  searchPanel.classList.remove("open");
  searchPanel.setAttribute("aria-hidden","true");
  if(!drawer.classList.contains("open")) overlay.hidden = true;
  document.body.style.overflow = "";
}

searchBtn.addEventListener("click", openSearch);
searchCloseBtn.addEventListener("click", closeSearch);

overlay.addEventListener("click", () => {
  if(drawer.classList.contains("open")) closeDrawer();
  if(searchPanel.classList.contains("open")) closeSearch();
});

document.addEventListener("keydown", (e) => {
  if(e.key === "Escape"){
    if(drawer.classList.contains("open")) closeDrawer();
    if(searchPanel.classList.contains("open")) closeSearch();
  }
});

// 即時搜尋 → 點結果跳詳情
function renderSearchResults(list){
  searchResults.innerHTML = "";
  if(list.length === 0){
    searchResults.innerHTML = `<div style="color:rgba(0,0,0,.6);font-weight:700;padding:8px 4px;">找不到符合的商品</div>`;
    return;
  }
  list.slice(0,8).forEach(p => {
    const item = document.createElement("div");
    item.className = "search-item";
    item.innerHTML = `<div class="name">${p.name}</div><div class="meta">$${p.price}｜${p.theme}</div>`;
    item.addEventListener("click", () => location.href = `product-detail.html?id=${p.id}`);
    searchResults.appendChild(item);
  });
}

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  if(!q){ searchResults.innerHTML = ""; return; }
  const filtered = PRODUCTS.filter(p => (p.name || "").toLowerCase().includes(q));
  renderSearchResults(filtered);
});


// ===== Hero Slider + Hotspots =====
// 先用 placeholder 圖片路徑，之後換成你們做好的 hero 圖
const HERO_SLIDES = [
  {
    image: "images/hero1.jpg",
    hotspots: [
      { productId: "L001", x: 75, y: 58 },
      { productId: "T001", x: 20, y: 72 }
    ]
  },
  {
    image: "images/hero2.jpg",
    hotspots: [
      { productId: "C001", x: 68, y: 62 }
    ]
  },
  {
    image: "images/hero3.jpg",
    hotspots: [
      { productId: "T002", x: 26, y: 66 }
    ]
  }
];

const heroStage = document.getElementById("heroStage");
const heroDots = document.getElementById("heroDots");
let heroIndex = 0;
let heroTimer = null;

function clearNode(node){
  while(node.firstChild) node.removeChild(node.firstChild);
}

function renderHero(idx){
  const slide = HERO_SLIDES[idx];
  clearNode(heroStage);

  const img = document.createElement("img");
  img.className = "hero-img";
  img.src = slide.image;
  img.alt = "Hero Banner";
  img.onerror = () => { // 圖片還沒準備好時用 fallback
    img.remove();
    const ph = document.createElement("div");
    ph.className = "hero-placeholder";
    ph.textContent = "Hero Banner（之後換成圖片）";
    heroStage.appendChild(ph);
  };
  heroStage.appendChild(img);

  // Hotspots
  slide.hotspots.forEach(h => {
    const dot = document.createElement("div");
    dot.className = "hotspot";
    dot.style.left = h.x + "%";
    dot.style.top = h.y + "%";

    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      showProductPop(h, dot);
    });

    heroStage.appendChild(dot);
  });

  // dots active
  [...heroDots.children].forEach((d, i) => d.classList.toggle("active", i === idx));
}

function showProductPop(hotspot, anchorEl){
  // 先移除舊的 pop
  const old = heroStage.querySelector(".product-pop");
  if(old) old.remove();

  const p = PRODUCTS.find(x => x.id === hotspot.productId);
  if(!p) return;

  const pop = document.createElement("div");
  pop.className = "product-pop";
  pop.style.left = hotspot.x + "%";
  pop.style.top = hotspot.y + "%";
  pop.innerHTML = `
    <div>${p.name}</div>
    <div class="small">$${p.price}</div>
  `;

  // 點 pop → 進商品詳情
  pop.addEventListener("click", () => {
    location.href = `product-detail.html?id=${p.id}`;
  });

  heroStage.appendChild(pop);
}

// 點 hero 空白處關閉 pop
heroStage.addEventListener("click", () => {
  const old = heroStage.querySelector(".product-pop");
  if(old) old.remove();
});

function initHero(){
  // dots
  heroDots.innerHTML = "";
  HERO_SLIDES.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "hero-dot" + (i===0 ? " active":"");
    d.addEventListener("click", () => {
      heroIndex = i;
      renderHero(heroIndex);
      restartHeroAuto();
    });
    heroDots.appendChild(d);
  });

  renderHero(0);
  restartHeroAuto();
}

function restartHeroAuto(){
  if(heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    heroIndex = (heroIndex + 1) % HERO_SLIDES.length;
    renderHero(heroIndex);
  }, 6000);
}

initHero();


// ===== Category Frames: 每60秒換圖 =====
const CATEGORY_IMAGES = {
  "生活用品": ["images/cat1.jpg","images/cat2.jpg","images/cat3.jpg"],
  "玩具": ["images/toy1.jpg","images/toy2.jpg","images/toy3.jpg"],
  "服飾": ["images/clo1.jpg","images/clo2.jpg","images/clo3.jpg"]
};

function initCategoryRotator(){
  document.querySelectorAll("[data-rotator]").forEach(imgEl => {
    const theme = imgEl.dataset.rotator;
    const list = CATEGORY_IMAGES[theme] || [];
    let idx = 0;

    function setImg(){
      if(list.length === 0) return;
      imgEl.src = list[idx % list.length];
      imgEl.onerror = () => { imgEl.removeAttribute("src"); };
    }

    setImg();
    setInterval(() => {
      idx++;
      setImg();
    }, 60000); // 1分鐘
  });
}

initCategoryRotator();


// ===== 推薦商品：6張橫滑（建議：每類各2張 = 6張） =====
const recommendRow = document.getElementById("recommendRow");

function pickRecommend6(){
  // 每類各取2個（不足就補其他）
  const byTheme = {
    "生活用品": PRODUCTS.filter(p => p.theme==="生活用品"),
    "玩具": PRODUCTS.filter(p => p.theme==="玩具"),
    "服飾": PRODUCTS.filter(p => p.theme==="服飾")
  };
  const picked = [];
  ["生活用品","玩具","服飾"].forEach(t => {
    picked.push(...byTheme[t].slice(0,2));
  });

  // 若不足6就補前面的
  const need = 6 - picked.length;
  if(need > 0){
    const rest = PRODUCTS.filter(p => !picked.includes(p));
    picked.push(...rest.slice(0,need));
  }
  return picked.slice(0,6);
}

function renderRecommend(){
  const list = pickRecommend6();
  recommendRow.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "pcard";
    card.innerHTML = `
      <div class="img"><img src="${p.image}" alt="${p.name}"></div>
      <div class="name">${p.name}</div>
      <div class="price">$${p.price}</div>
    `;
    card.addEventListener("click", ()=> location.href = `product-detail.html?id=${p.id}`);
    recommendRow.appendChild(card);
  });
}
renderRecommend();


// ===== 最新商品區：放2張商品卡進 slot =====
function renderLatest(){
  // 先簡單：取最後兩筆（你也可以改成 newest 欄位）
  const list = [...PRODUCTS].slice(-2);

  const slot1 = document.getElementById("latestCard1");
  const slot2 = document.getElementById("latestCard2");

  function cardHTML(p){
    return `
      <article class="pcard" style="width:220px;">
        <div class="img" style="width:220px;height:180px;"><img src="${p.image}" alt="${p.name}"></div>
        <div class="name">${p.name}</div>
        <div class="price">$${p.price}</div>
      </article>
    `;
  }

  slot1.innerHTML = list[0] ? cardHTML(list[0]) : "商品";
  slot2.innerHTML = list[1] ? cardHTML(list[1]) : "商品";

  // 點擊跳詳情
  slot1.querySelector(".pcard")?.addEventListener("click", ()=> location.href = `product-detail.html?id=${list[0].id}`);
  slot2.querySelector(".pcard")?.addEventListener("click", ()=> location.href = `product-detail.html?id=${list[1].id}`);
}
renderLatest();


// ===== Top Button =====
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if(window.scrollY > 300) topBtn.classList.add("show");
  else topBtn.classList.remove("show");
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
