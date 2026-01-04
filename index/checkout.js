(() => {
  const CHECKOUT_KEY = "MEOW5_CHECKOUT_ITEMS";
  const CART_KEY = "meow5_cart";
  const FREE_SHIPPING_THRESHOLD = 2000;
  const HOME_FEE = 150;

  const cartLines = document.getElementById("cartLines");
  const subtotalText = document.getElementById("subtotalText");
  const shippingText = document.getElementById("shippingText");
  const grandText = document.getElementById("grandText");

  function money(n) {
    return `$ ${Number(n || 0).toLocaleString()}`;
  }

  function loadItems() {
    try {
      const a = JSON.parse(localStorage.getItem(CHECKOUT_KEY));
      if (Array.isArray(a) && a.length) return a;

      const b = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(b) ? b : [];
    } catch {
      return [];
    }
  }

  function findProductById(id) {
    return (window.PRODUCTS || []).find(p => p.id === id);
  }

  function imageSrc(p) {
    const img = p?.images?.[0];
    if (!img) return "https://placehold.co/120x120?text=Meow5";
    return `image/${img}`;
  }

  function variantText(p, it) {
    if (!it.variantType || !it.variantValue) return "";
    if (it.variantType === "size") return `尺寸：${it.variantValue}`;
    if (it.variantType === "color") {
      const label = p?.colors?.find(c => c.code === it.variantValue)?.label;
      return `顏色：${label || it.variantValue}`;
    }
    return "";
  }

  function render() {
    const items = loadItems();
    cartLines.innerHTML = "";

    if (!items.length) {
      cartLines.innerHTML = `<div class="empty">目前沒有要結帳的商品</div>`;
      subtotalText.textContent = money(0);
      shippingText.textContent = money(0);
      grandText.textContent = money(0);
      return;
    }

    let subtotal = 0;

    items.forEach(it => {
      const p = findProductById(it.id);
      const price = p ? Number(p.price) : 0;
      const qty = Math.max(1, parseInt(it.qty ?? 1, 10));
      subtotal += price * qty;

      const row = document.createElement("div");
      row.className = "cart-line";
      row.innerHTML = `
        <div class="thumb" style="background-image:url('${imageSrc(p)}')"></div>
        <div class="info">
          <div class="name">${p ? p.name : it.id}</div>
          <div class="meta">
            數量：${qty}
            ${variantText(p, it) ? `｜${variantText(p, it)}` : ""}
          </div>
        </div>
        <div class="price">${money(price * qty)}</div>
      `;
      cartLines.appendChild(row);
    });

    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : HOME_FEE;

    subtotalText.textContent = money(subtotal);
    shippingText.textContent = shipping === 0 ? "免運✨" : money(shipping);
    grandText.textContent = money(subtotal + shipping);
  }

  render();
})();
