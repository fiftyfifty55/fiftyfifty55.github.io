(() => {
  const FAV_KEY = "MEOW5_FAVORITES";

  // ===== drawer/search 同首頁 =====
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
    if (!document.getElementById("searchPanel").classList.contains("open")) overlay.hidden = true;
    document.body.style.overflow = "";
  }
  menuBtn.addEventListener("click", openDrawer);
  closeBtn.addEventListener("click", closeDrawer);

  productToggle.setAttribute("aria-expanded", "false");
  productSubmenu.hidden = true;
  productToggle.addEventListener("click", () => {
    const expanded = productToggle.getAttribute("aria-expanded") === "true";
    productToggle.setAttribute("aria-expanded", String(!expanded));
    productSubmenu.hidden = expanded;
    const chev = productToggle.querySelector(".chev");
    if (chev) chev.textContent = expanded ? "▾" : "▴";
  });

  // search
  const searchBtn = document.getElementById("searchBtn");
  const searchPanel = document.getElementById("searchPanel");
  const searchCloseBtn = document.getElementById("searchCloseBtn");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  function openSearch() {
    searchPanel.classList.add("open");
    searchPanel.setAttribute("aria-hidden","false");
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    searchInput.value = "";
    searchResults.innerHTML = "";
    setTimeout(()=>searchInput.focus(), 0);
  }
  function closeSearch() {
    searchPanel.classList.remove("open");
    searchPanel.setAttribute("aria-hidden","true");
    if(!drawer.classList.contains("open")) overlay.hidden = true;
    document.body.style.overflow = "";
  }
  searchBtn.addEventListener("click", openSearch);
  searchCloseBtn.addEventListener("click", closeSearch);

  overlay.addEventListener("click", () => {
    if (drawer.classList.contains("open")) closeDrawer();
    if (searchPanel.classList.contains("open")) closeSearch();
  });

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
      if (drawer.classList.contains("open")) closeDrawer();
      if (searchPanel.classList.contains("open")) closeSearch();
    }
  });

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
      item.addEventListener("click", () => location.href = `product-detail.html?id=${encodeURIComponent(p.id)}`);
      searchResults.appendChild(item);
    });
  }

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    if(!q){ searchResults.innerHTML = ""; return; }
    const filtered = (window.PRODUCTS || []).filter(p => (p.name || "").toLowerCase().includes(q));
    renderSearchResults(filtered);
  });

  // ===== 收藏清單渲染 =====
  const favGrid = document.getElementById("favGrid");
  const favCount = document.getElementById("favCount");
  const emptyState = document.getElementById("emptyState");

  function readFavIds(){
    try{
      const v = JSON.parse(localStorage.getItem(FAV_KEY));
      return Array.isArray(v) ? v : [];
    }catch{
      return [];
    }
  }
  function writeFavIds(ids){
    localStorage.setItem(FAV_KEY, JSON.stringify(ids));
  }

  function getImgSrc(fileName){
    if(!fileName) return "https://placehold.co/600x450?text=Meow5";
    if(String(fileName).startsWith("http")) return fileName;
    // 你們目前是 image/ 資料夾（不是 images/）
    return `image/${fileName}`;
  }

  function render(){
    const ids = readFavIds();
    favCount.textContent = `共 ${ids.length} 件收藏`;

    if(ids.length === 0){
      favGrid.innerHTML = "";
      emptyState.hidden = false;
      return;
    }
    emptyState.hidden = true;

    // 依照收藏順序顯示（最新收藏通常會在最後：可改 reverse）
    const products = ids
      .map(id => (window.PRODUCTS || []).find(p => p.id === id))
      .filter(Boolean);

    favGrid.innerHTML = "";
    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "p-card";

      const imgName = (p.images || [])[0];
      const img = getImgSrc(imgName);

      card.innerHTML = `
        <div class="p-img"><img src="${p.img}" alt="${p.name}"></div>
        <div class="p-name">${p.name}</div>
        <div class="p-meta">
          <div class="p-price">$${Number(p.price || 0).toLocaleString()}</div>
          <button class="remove-btn" type="button" data-id="${p.id}">移除</button>
        </div>
      `;

      // 點卡片（不要點到移除按鈕）→ 進詳情
      card.addEventListener("click", (e) => {
        const btn = e.target.closest(".remove-btn");
        if(btn) return;
        location.href = `product-detail.html?id=${encodeURIComponent(p.id)}`;
      });

      // 移除
      card.querySelector(".remove-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        const id = p.id;
        const next = readFavIds().filter(x => x !== id);
        writeFavIds(next);
        render();
      });

      favGrid.appendChild(card);
    });
  }

  render();
})();

