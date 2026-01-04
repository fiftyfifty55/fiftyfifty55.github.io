// products-page.js（完善版：商品卡可正常顯示 image/ 圖片）

function resolveImg(src){
  if(!src) return "image/no-image.png";
  const s = String(src);

  if(s.startsWith("http")) return s;
  if(s.startsWith("image/")) return s;   // 已經有 image/ 就不要再加
  return "image/" + s;                   // 沒有才補
}

function groupByTheme(list){
  return list.reduce((acc,p) => {
    if(!acc[p.theme]) acc[p.theme] = [];
    acc[p.theme].push(p);
    return acc;
  }, {});
}

// ✅ 統一拿縮圖：images[0] -> image -> fallback
function getProductThumb(p){
  if(!p) return "image/no-image.png";
  if(Array.isArray(p.images) && p.images.length > 0) return resolveImg(p.images[0]);
  if(p.image) return resolveImg(p.image);
  return "image/no-image.png";
}

function createCard(p){
  const card = document.createElement("article");
  card.className = "card";

  const imgSrc = getProductThumb(p);

  // ✅ 不要用 onerror="this.remove()"，會把圖拿掉看起來像沒顯示
  card.innerHTML = `
    <div class="thumb">
      <img src="${imgSrc}" alt="${p.name}">
    </div>
    <div class="name">${p.name}</div>
    <div class="price">$${p.price}</div>
  `;

  // ✅ 圖片載入失敗 → 換預設圖
  const imgEl = card.querySelector("img");
  imgEl.addEventListener("error", () => {
    imgEl.src = "image/no-image.png";
  });

  card.addEventListener("click", () => {
    location.href = `product-detail.html?id=${p.id}`;
  });

  return card;
}

function renderProducts(){
  const container = document.getElementById("themesContainer");
  container.innerHTML = "";

  const params = new URLSearchParams(window.location.search);
  const onlyTheme = params.get("theme"); // 生活用品 / 玩具 / 服飾 / null

  const groups = groupByTheme(PRODUCTS);

  // ✅ 若 theme 不在 THEMES 裡，就當作「全部商品」
  const themeList = (onlyTheme && THEMES.includes(onlyTheme))
    ? [onlyTheme]
    : THEMES;

  themeList.forEach(themeName => {
    const items = groups[themeName] || [];

    const section = document.createElement("section");
    section.innerHTML = `
      <div class="themeTitle">${themeName}</div>
      <div class="grid"></div>
    `;

    const grid = section.querySelector(".grid");

    if(items.length === 0){
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = "此分類目前沒有商品";
      section.appendChild(empty);
    }else{
      items.forEach(p => grid.appendChild(createCard(p)));
    }

    container.appendChild(section);
  });
}

renderProducts();
