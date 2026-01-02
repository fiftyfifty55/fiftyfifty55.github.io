(function(){
  const grid = document.getElementById("recGrid");
  if(!grid) return;

  const list = (window.PRODUCTS || []).slice(0, 6); // 你要幾張自己調

  grid.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "rec-card";

    // 你們資料是 images: ["xxx.jpg"]，這裡取第一張
    const imgSrc = (p.images && p.images[0]) ? `images/${p.images[0]}` : "";

    card.innerHTML = `
      <div class="rec-thumb">
        ${imgSrc ? `<img src="${imgSrc}" alt="${p.name}">` : "商品"}
      </div>
      <div class="rec-name">${p.name}</div>
      <div class="rec-price">$${Number(p.price).toLocaleString("zh-Hant")}</div>
    `;

    card.addEventListener("click", () => {
      location.href = `./product-detail.html?id=${p.id}`;
    });

    grid.appendChild(card);
  });
})();
