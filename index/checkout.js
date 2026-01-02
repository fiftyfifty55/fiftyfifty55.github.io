/**
 * checkout.js
 * 你們購物車頁面按「購買」之前，請把要結帳的商品存到 localStorage：
 * localStorage.setItem("MEOW5_CHECKOUT_ITEMS", JSON.stringify(items));
 *
 * items 格式建議：
 * [
 *   { id:"T001", qty:2, variantType:"color", variant:"beige" },
 *   { id:"L001", qty:1, variantType:"size",  variant:"M" }
 * ]
 */

(function(){
  const LS_KEY = "MEOW5_CHECKOUT_ITEMS";

  const cartLines = document.getElementById("cartLines");
  const shipHint = document.getElementById("shipHint");

  const subtotalText = document.getElementById("subtotalText");
  const shippingText = document.getElementById("shippingText");
  const grandText = document.getElementById("grandText");
  const buyBtn = document.getElementById("buyBtn");

  function money(n){
    const v = Math.max(0, Number(n) || 0);
    return "$ " + v.toLocaleString("zh-Hant");
  }

  function readCheckoutItems(){
    try{
      const raw = localStorage.getItem(LS_KEY);
      if(!raw) return [];
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    }catch(e){
      return [];
    }
  }

  function getProduct(id){
    return (window.PRODUCTS || []).find(p => p.id === id);
  }

  function variantLabel(item, p){
    if(!item || !p) return "";

    if(item.variantType === "size"){
      // item.variant = "S"|"M"|"L"
      return item.variant ? `尺寸：${item.variant}` : "";
    }

    if(item.variantType === "color"){
      // item.variant = color.code，例如 "beige"
      const c = (p.colors || []).find(x => x.code === item.variant);
      return c ? `顏色：${c.label}` : (item.variant ? `顏色：${item.variant}` : "");
    }

    return "";
  }

  function calcSubtotal(items){
    let sum = 0;
    items.forEach(it => {
      const p = getProduct(it.id);
      if(!p) return;
      const qty = Math.max(1, parseInt(it.qty || 1, 10));
      sum += (Number(p.price) || 0) * qty;
    });
    return sum;
  }

  function getShippingCost(subtotal, ship){
    // 免運：滿 2000
    if(subtotal >= 2000) return 0;

    if(ship === "home") return 150;
    if(ship === "711" || ship === "family") return 60;

    return 0;
  }

  function hasOversizeItem(items){
    // 你說「商品太大只能宅配」：這要等你們商品資料補齊才好判斷
    // 先留鉤子：若未來 products-data.js 加上 p.oversize = true
    return items.some(it => {
      const p = getProduct(it.id);
      return !!(p && p.oversize === true);
    });
  }

  function renderCartLines(items){
    cartLines.innerHTML = "";

    if(items.length === 0){
      cartLines.innerHTML = `<div class="empty">目前沒有要結帳的商品（請從購物車頁面點「購買」進來）</div>`;
      buyBtn.disabled = true;
      return;
    }

    buyBtn.disabled = false;

    items.forEach(it => {
      const p = getProduct(it.id);
      const qty = Math.max(1, parseInt(it.qty || 1, 10));
      const name = p ? p.name : it.id;
      const price = p ? Number(p.price) || 0 : 0;

      const meta = [
        variantLabel(it, p),
        `數量：${qty}`,
        `單價：${money(price)}`
      ].filter(Boolean).join("｜");

      const row = document.createElement("div");
      row.className = "cart-line";
      row.innerHTML = `
        <div class="cart-left">
          <div class="cart-name">${name}</div>
          <div class="cart-meta">${meta}</div>
        </div>
        <div class="cart-right">${money(price * qty)}</div>
      `;

      cartLines.appendChild(row);
    });
  }

  function updatePrices(items){
    const ship = document.querySelector('input[name="ship"]:checked')?.value || "home";
    const subtotal = calcSubtotal(items);

    // 商品太大 → 限制宅配（先用 p.oversize 作為判斷）
    const oversize = hasOversizeItem(items);
    const storeShipInputs = [
      document.querySelector('input[name="ship"][value="711"]'),
      document.querySelector('input[name="ship"][value="family"]')
    ];

    if(oversize){
      storeShipInputs.forEach(i => { if(i){ i.disabled = true; i.closest("label")?.classList.add("disabled"); } });
      // 若目前選到超商，強制切回宅配
      const chosen = document.querySelector('input[name="ship"]:checked')?.value;
      if(chosen === "711" || chosen === "family"){
        const home = document.querySelector('input[name="ship"][value="home"]');
        if(home) home.checked = true;
      }
      shipHint.textContent = "部分商品體積較大，僅提供宅配到府。";
    }else{
      storeShipInputs.forEach(i => { if(i){ i.disabled = false; i.closest("label")?.classList.remove("disabled"); } });
      shipHint.textContent = "";
    }

    const finalShip = document.querySelector('input[name="ship"]:checked')?.value || "home";
    const shipping = getShippingCost(subtotal, finalShip);
    const grand = subtotal + shipping;

    subtotalText.textContent = money(subtotal);
    shippingText.textContent = money(shipping);
    grandText.textContent = money(grand);
  }

  function bind(){
    const items = readCheckoutItems();
    renderCartLines(items);
    updatePrices(items);

    document.querySelectorAll('input[name="ship"]').forEach(r => {
      r.addEventListener("change", () => updatePrices(items));
    });

    buyBtn.addEventListener("click", () => {
      // 你也可以在這裡把：取貨方式/付款方式/金額存起來，成功頁要顯示也行
      const pay = document.querySelector('input[name="pay"]:checked')?.value || "cod";
      const ship = document.querySelector('input[name="ship"]:checked')?.value || "home";

      localStorage.setItem("MEOW5_LAST_ORDER", JSON.stringify({
        items,
        pay,
        ship,
        createdAt: Date.now()
      }));

      location.href = "./checkout-success.html";
    });
  }

  bind();
})();
