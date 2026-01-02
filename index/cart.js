document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".cart-card");
  const subtotalEl = document.getElementById("subtotal");
  const grandTotalEl = document.getElementById("grand-total");

  function updateTotals() {
    let subtotal = 0;
    document.querySelectorAll(".cart-card").forEach((card) => {
      const price = parseInt(card.dataset.price);
      const qty = parseInt(card.querySelector("input").value);
      subtotal += price * qty;
    });

    subtotalEl.innerText = `NT$ ${subtotal.toLocaleString()}`;
    grandTotalEl.innerText = `NT$ ${(subtotal + 60).toLocaleString()}`;
  }

  cards.forEach((card) => {
    const plusBtn = card.querySelector(".plus");
    const minusBtn = card.querySelector(".minus");
    const input = card.querySelector("input");
    const removeBtn = card.querySelector(".remove-btn");

    plusBtn.addEventListener("click", () => {
      input.value = parseInt(input.value) + 1;
      updateTotals();
    });

    minusBtn.addEventListener("click", () => {
      if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
        updateTotals();
      }
    });

    removeBtn.addEventListener("click", () => {
      if (confirm("確定要移除此商品嗎？")) {
        card.remove();
        updateTotals();
      }
    });
  });
});