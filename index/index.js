// ===== Utils =====
function resolveImg(name){
  if(!name) return "image/no-image.png";
  if(name.startsWith("http")) return name;
  if(name.startsWith("image/") || name.startsWith("images/")) return name;
  return "image/" + name;   // ✅ 關鍵：把檔名補成 image/xxx
}


function getProductThumb(p){
  return p?.image ? resolveImg(p.image) : "image/no-image.png";
}

// ===== Drawer =====
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

const productToggle = document.getElementById("productToggle");
const productSubmenu = document.getElementById("productSubmenu");

function openDrawer() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  overlay.hidden = false;
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  menuBtn.setAttribute("aria-expanded", "false");
  if(!searchPanel.classList.contains("open")) overlay.hidden = true;
  document.body.style.overflow = "";
}

menuBtn.addEventListener("click", openDrawer);
closeBtn.addEventListener("click", closeDrawer);

(function initProductSubmenu() {
  productToggle.setAttribute("aria-expanded", "false");
  productSubmenu.hidden = true;
  const chev = productToggle.querySelector(".chev");
  if (chev) chev.textContent = "▾";

  productToggle.addEventListener("click", () => {
    const expanded = productToggle.getAttribute("aria-expanded") === "true";
    productToggle.setAttribute("aria-expanded", String(!expanded));
    productSubmenu.hidden = expanded;
    const c = productToggle.querySelector(".chev");
    if (c) c.textContent = expanded ? "▾" : "▴";
  });
})();

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
const HERO_SLIDES = [
  {
    image: "image/top1.png",
    // 第一張不指定跳轉（只做熱點商品）
    link: "products.html",
    hotspots: [
      // ✅ 綠色衣服（貓身上）
      { productId: "C001", x: 20, y: 56 },
      // ✅ 碗
      { productId: "L007", x: 18, y: 82 },
      // ✅ 貓爬架
      { productId: "T004", x: 60, y: 58 },
      // ✅ 貓砂盆
      { productId: "L004", x: 83, y: 44 },
      // ✅ 藍色外出包
      { productId: "L010", x: 90, y: 74 }
    ]
  },
  {
    image: "image/hero2.jpg",
    link: "cart.html",
    hotspots: []
  },
  {
    image: "image/hero3.jpg",
    link: "about.html",
    hotspots: []
  }
];

const heroStage = document.getElementById("heroStage");
const heroDots = document.getElementById("heroDots");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");

let heroIndex = 0;
let heroTimer = null;
const HERO_INTERVAL = 6000;

function clearNode(node){
  while(node.firstChild) node.removeChild(node.firstChild);
}

function restartHeroAuto(){
  if(heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    nextHero();
  }, HERO_INTERVAL);
}

function renderHero(idx){
  const slide = HERO_SLIDES[idx];
  clearNode(heroStage);

  // 讓整張廣告可以點擊跳轉
  heroStage.dataset.link = slide.link || "";
  heroStage.style.cursor = slide.link ? "pointer" : "default";

  const img = document.createElement("img");
  img.className = "hero-img";
  img.src = resolveImg(slide.image);
  img.alt = "Hero Banner";
  img.onerror = () => {
    img.remove();
    const ph = document.createElement("div");
    ph.className = "hero-placeholder";
    ph.textContent = "Hero Banner（之後換成圖片）";
    heroStage.appendChild(ph);
  };
  heroStage.appendChild(img);

  // Hotspots
  (slide.hotspots || []).forEach(h => {
    const dot = document.createElement("div");
    dot.className = "hotspot";
    dot.style.left = h.x + "%";
    dot.style.top = h.y + "%";

    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      showProductPop(h);
    });

    heroStage.appendChild(dot);
  });

  // dots active
  [...heroDots.children].forEach((d, i) => d.classList.toggle("active", i === idx));
}

function showProductPop(hotspot){
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

  pop.addEventListener("click", (e) => {
    e.stopPropagation();
    location.href = `product-detail.html?id=${p.id}`;
  });

  heroStage.appendChild(pop);
}

// 點 hero 空白處：若有熱點彈窗就關閉；否則依照 link 進入指定頁
heroStage.addEventListener("click", () => {
  const pop = heroStage.querySelector(".product-pop");
  if(pop){
    pop.remove();
    return;
  }
  const link = heroStage.dataset.link;
  if(link){
    location.href = link;
  }
});

function prevHero(){
  heroIndex = (heroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
  renderHero(heroIndex);
  restartHeroAuto();
}
function nextHero(){
  heroIndex = (heroIndex + 1) % HERO_SLIDES.length;
  renderHero(heroIndex);
  restartHeroAuto();
}

function initHero(){
  heroDots.innerHTML = "";
  HERO_SLIDES.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "hero-dot" + (i===0 ? " active":"");
    d.addEventListener("click", (e) => {
      e.stopPropagation();
      heroIndex = i;
      renderHero(heroIndex);
      restartHeroAuto();
    });
    heroDots.appendChild(d);
  });

  if(heroPrev){
    heroPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      prevHero();
    });
  }
  if(heroNext){
    heroNext.addEventListener("click", (e) => {
      e.stopPropagation();
      nextHero();
    });
  }

  renderHero(0);
  restartHeroAuto();
}

initHero();


// ===== Category Frames: 每60秒換圖 =====
const CATEGORY_IMAGES = {
  "生活用品": ["1-011.png","1-021.png","1-031.png","1-041.png","1-051.png","1-061.png","1-071.png","1-081.png","1-091.png","1-101.png","1-111.png","1-121.png"].map(resolveImg),
  "玩具": ["2-011.jpg","2-021.jpg","2-031.jpg","2-041.png","2-051.png","2-061.png"].map(resolveImg),
  "服飾": ["3-011.png","3-021.png","3-031.png","3-041.png","3-051.png","3-061.png"].map(resolveImg)
};

function initCategoryRotator(){
  document.querySelectorAll("[data-rotator]").forEach(imgEl => {
    const theme = imgEl.dataset.rotator;
    const list = CATEGORY_IMAGES[theme] || [];
    let idx = 0;

    function setImg(){
      if(list.length === 0) return;
      imgEl.src = list[idx % list.length];
      imgEl.onerror = () => { imgEl.src = "image/no-image.png"; };
    }

    setImg();
    setInterval(() => {
      idx++;
      setImg();
    }, 60000);
  });
}
initCategoryRotator();


// ===== 推薦商品：6張橫滑 =====
const recommendRow = document.getElementById("recommendRow");

function pickRecommend6(){
  const byTheme = {
    "生活用品": PRODUCTS.filter(p => p.theme==="生活用品"),
    "玩具": PRODUCTS.filter(p => p.theme==="玩具"),
    "服飾": PRODUCTS.filter(p => p.theme==="服飾")
  };
  const picked = [];
  ["生活用品","玩具","服飾"].forEach(t => picked.push(...byTheme[t].slice(0,2)));

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
    const a = document.createElement("a");
    a.className = "p-card";
    a.href = `product-detail.html?id=${p.id}`;

    a.innerHTML = `
      <div class="p-img" style="background-image:url('${getProductThumb(p)}')"></div>
      <div class="p-body">
        <div class="p-name">${p.name}</div>
        <div class="p-price">$${p.price}</div>
      </div>
    `;
    recommendRow.appendChild(a);
  });
}
renderRecommend();


// ===== 最新商品區：2張商品卡 + 2個照片區 =====
function renderLatest(){
  const list = [...PRODUCTS].slice(-2);

  const slot1 = document.getElementById("latestCard1");
  const slot2 = document.getElementById("latestCard2");

  const latestHeroImg = document.getElementById("latestHeroImg");
  const latestWideImg = document.getElementById("latestWideImg");

  if(latestHeroImg){
    latestHeroImg.src = list[0] ? getProductThumb(list[0]) : "image/no-image.png";
    latestHeroImg.onerror = () => latestHeroImg.src = "image/no-image.png";
  }
  if(latestWideImg){
    latestWideImg.src = list[1] ? getProductThumb(list[1]) : "image/no-image.png";
    latestWideImg.onerror = () => latestWideImg.src = "image/no-image.png";
  }

  function makeCard(p){
    if(!p) return `<div style="padding:18px;color:rgba(0,0,0,.55);font-weight:900;">商品</div>`;
    return `
      <a class="p-card" href="product-detail.html?id=${p.id}" style="width:100%;">
        <div class="p-img" style="height:190px;background-image:url('${getProductThumb(p)}')"></div>
        <div class="p-body">
          <div class="p-name">${p.name}</div>
          <div class="p-price">$${p.price}</div>
        </div>
      </a>
    `;
  }

  slot1.innerHTML = makeCard(list[0]);
  slot2.innerHTML = makeCard(list[1]);
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
