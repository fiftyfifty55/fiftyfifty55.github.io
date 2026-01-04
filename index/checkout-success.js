(() => {
  const CART_KEY = "meow5_cart";
  const CHECKOUT_KEY = "MEOW5_CHECKOUT_ITEMS";
  const PURCHASE_KEY = "MEOW5_PURCHASED_PRODUCTS";
  const ORDERS_KEY = "MEOW5_ORDERS";
  const AUTH_USER_KEY = "MEOW5_AUTH_USER";

  const recGrid = document.getElementById("recGrid");

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
  function readObj(key, fallback) {
    try {
      const v = JSON.parse(localStorage.getItem(key));
      return (v && typeof v === "object") ? v : fallback;
    } catch {
      return fallback;
    }
  }

  function getProductById(id) {
    return (window.PRODUCTS || []).find(p => p.id === id);
  }

  // 自動吃 image/ images/ 已帶資料夾 外連結
  function resolveImgPath(file) {
    if (!file) return "https://placehold.co/300x300?text=Meow5";
    const s = String(file);

    // 外連
    if (s.startsWith("http")) return s;

    // 已含資料夾
    if (s.startsWith("image/") || s.startsWith("images/")) return s;

    // 預設先猜 image/
    return `image/${s}`;
  }

  // 背景圖載入失敗 → fallback
  function setBgWithFallback(el, file) {
    const tryList = [];
    const s = String(file || "");

    if (!s) {
      el.style.backgroundImage = `url('https://placehold.co/300x300?text=Meow5')`;
      return;
    }

    // 外連或已帶資料夾
    if (s.startsWith("http") || s.startsWith("image/") || s.startsWith("images/")) {
      tryList.push(s);
    } else {
      // 都試：image/xxx、images/xxx、xxx
      tryList.push(`image/${s}`, `images/${s}`, s);
    }

    // 最後一定有 placeholder
    tryList.push("https://placehold.co/300x300?text=Meow5");

    let idx = 0;
    const img = new Image();
    const loadNext = () => {
      img.onload = () => {
        el.style.backgroundImage = `url('${tryList[idx]}')`;
      };
      img.onerror = () => {
        idx += 1;
        if (idx < tryList.length) {
          img.src = tryList[idx];
        }
      };
      img.src = tryList[idx];
    };
    loadNext();
  }

  function makeOrderNo() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const rand = Math.random().toString(16).slice(2, 6).toUpperCase();
    return `M${y}${m}${day}-${rand}`;
  }

  // ===== 1) 取得本次結帳商品 =====
  const checkoutItems = safeJSON(CHECKOUT_KEY);
  const auth = readObj(AUTH_USER_KEY, null);

  // ===== 2) 建立訂單（如果有結帳商品）=====
  if (checkoutItems.length) {
    const orderItems = checkoutItems.map(it => {
      const p = getProductById(it.id);
      const qty = Math.max(1, parseInt(it.qty || 1, 10));
      const price = Number(p?.price || 0);
      return { productId: it.id, qty, price, lineTotal: qty * price };
    });

    const subtotal = orderItems.reduce((sum, x) => sum + x.lineTotal, 0);

    const orders = safeJSON(ORDERS_KEY);
    const order = {
      orderNo: makeOrderNo(),
      userId: auth?.id || "guest",
      createdAt: Date.now(),
      status: "待出貨",
      items: orderItems,
      subtotal
    };
    orders.push(order);
    saveJSON(ORDERS_KEY, orders);

    // 舊的 PURCHASE_KEY（可留）
    const purchased = safeJSON(PURCHASE_KEY);
    checkoutItems.forEach(it => {
      purchased.push({
        productId: it.id,
        time: Date.now(),
        userId: auth?.id || "guest",
        orderNo: order.orderNo
      });
    });
    saveJSON(PURCHASE_KEY, purchased);

    // 清空
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(CHECKOUT_KEY);
  }

  // ===== 3) 推薦商品 =====
  if (!recGrid) return;

  // 確保 products-data.js 有載到
  const all = (window.PRODUCTS || []);
  if (!all.length) {
    recGrid.innerHTML = `<div style="color:#777;font-weight:800;">找不到商品資料（PRODUCTS 未載入）</div>`;
    return;
  }

  const picks = [...all].sort(() => 0.5 - Math.random()).slice(0, 3);
  recGrid.innerHTML = "";

  picks.forEach(p => {
    const card = document.createElement("a");
    card.href = `product-detail.html?id=${encodeURIComponent(p.id)}`;
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

    const imgBox = document.createElement("div");
    imgBox.style.cssText = `
      width:100%;
      aspect-ratio:1/1;
      border-radius:12px;
      background:#fff center/cover no-repeat;
    `;

    // ✅ 這裡會自動嘗試 image/ images/ 原始檔名
    setBgWithFallback(imgBox, (p.images || [])[0]);

    card.appendChild(imgBox);

    card.insertAdjacentHTML("beforeend", `
      <div style="font-weight:900; font-size:14px;">${p.name}</div>
      <div style="color:#b0714d; font-weight:900;">$${Number(p.price || 0).toLocaleString()}</div>
    `);

    recGrid.appendChild(card);
  });
})();
