(() => {
  // ===== 全站統一 Key =====
  const CART_KEY = "meow5_cart";
  const CHECKOUT_KEY = "MEOW5_CHECKOUT_ITEMS";
  const PURCHASE_KEY = "MEOW5_PURCHASED_PRODUCTS";

  // ===== DOM =====
  const recGrid = document.getElementById("recGrid");

  // ===== 工具 =====
  function safeJSON(key) {
    try {
      const v = JSON.parse(localStorage.getItem(key));
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  }

  function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getProductById(id) {
    return (window.PRODUCTS || []).find(p => p.id === id);
  }

  function imgSrc(p) {
  const first = p?.images?.[0];
  if (!first) return "https://placehold.co/300x300?text=Meow5";

  const s = String(first);

  // 1) 外部連結
  if (s.startsWith("http")) return s;

  // 2) 已經帶資料夾就原樣回傳（避免 image/image）
  if (s.startsWith("image/") || s.startsWith("images/")) return s;

  // 3) 否則預設放在 image/
  return `image/${s}`;
}


  // ===== 1. 取得本次結帳商品 =====
  const checkoutItems = safeJSON(CHECKOUT_KEY);

  // ===== 2. 紀錄「已購買商品」=====
  const purchased = safeJSON(PURCHASE_KEY);

  checkoutItems.forEach(it => {
    if (!purchased.find(p => p.productId === it.id)) {
      purchased.push({
        productId: it.id,
        time: Date.now()
      });
    }
  });

  saveJSON(PURCHASE_KEY, purchased);

  // ===== 3. 清空購物車 =====
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(CHECKOUT_KEY);

  // ===== 4. 其他人也買了（隨機 4 個）=====
  if (!recGrid) return;

  const shuffled = [...(window.PRODUCTS || [])].sort(() => 0.5 - Math.random());
  const picks = shuffled.slice(0, 3);

  recGrid.innerHTML = "";

  picks.forEach(p => {
    const card = document.createElement("a");
    card.href = `product-detail.html?id=${p.id}`;
    card.style.cssText = `
      text-decoration:none;
      color:#222;
      background:#efe4e0;
      border-radius:16px;
      padding:14px;
      display:flex;
      flex-direction:column;
      gap:10px;
    `;

    card.innerHTML = `
      <div style="
        width:100%;
        aspect-ratio:1/1;
        border-radius:12px;
        background:#fff url('${imgSrc(p)}') center/cover no-repeat;
      "></div>

      <div style="font-weight:900; font-size:14px;">
        ${p.name}
      </div>

      <div style="color:#b0714d; font-weight:900;">
        $${p.price.toLocaleString()}
      </div>
    `;

    recGrid.appendChild(card);
  });
})();
