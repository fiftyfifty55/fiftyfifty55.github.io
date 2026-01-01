function groupByTheme(list){
  return list.reduce((acc,p) => {
    if(!acc[p.theme]) acc[p.theme] = [];
    acc[p.theme].push(p);
    return acc;
  }, {});
}

function createCard(p){
  const card = document.createElement("article");
  card.className = "card";

  // 你的資料是 images: ["l001-1.jpg", ...]
  const firstImg = (p.images && p.images.length > 0) ? p.images[0] : null;
  const imgHTML = firstImg
    ? `<img src="images/${firstImg}" alt="${p.name}" onerror="this.remove()">`
    : `商品照片`;

  card.innerHTML = `
    <div class="thumb">${imgHTML}</div>
    <div class="name">${p.name}</div>
    <div class="price">$${p.price}</div>
  `;

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
