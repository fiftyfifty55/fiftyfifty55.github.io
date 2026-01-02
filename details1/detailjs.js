const pa = new URLSearchParams(window.location.search);
const ids = pa.get("id");
fetch("./ex.json")
    .then(res => res.json())
    .then(pr => {
        const pro = pr.find(p => p.id == ids);
        if (!pro) {
            alert("查無商品，請再試一次");
            window.location.href = "/";
            return;
        }
        document.getElementById("prodName").textContent = pro.name;
        document.getElementById("prodPrice").textContent = pro.price;
        const specselect = document.getElementById("prodSpec");
        pro.spec.forEach(spec => {
            const opt = document.createElement("option");
            opt.textContent = spec;
            opt.value = spec;
            specselect.appendChild(opt);
        });
    });

//commnet system start from line26
function renderComments() {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    const commentArea = document.getElementById("commentArea");
    commentArea.innerHTML = "";
    comments.forEach(c => {
        if (c.id === ids) {
            commentArea.innerHTML += `
      <div class="comment">
        <p class="user">${c.user}</p>
        <p class="comment">${c.content}</p>
      </div>
    `;
        }
    });
}
const textarea = document.getElementById("commentInput");
const button = document.getElementById("submitBtn");
const commentArea = document.getElementById("commentArea");
const oldComments = JSON.parse(localStorage.getItem("comments")) || [];
if (oldComments.length === 0) {
    oldComments.push(
        { user: "小明", content: "好讚", id: "123456", time: Date.now() },
        { user: "小王", content: "已回購，小孩愛用", id: "456789", time: Date.now() },
        { user: "小李", content: "我來教大家怎麼做咖哩飯", id: "456789", time: Date.now() }
    );
    localStorage.setItem("comments", JSON.stringify(oldComments));
}
button.addEventListener("click", () => {
    const newComment = textarea.value.trim();
    if (newComment === "") {
        alert("評論不得為空！");
        return;
    }
    oldComments.push({
        user: "您",
        content: newComment,
        id: ids,
        time: Date.now()
    });
    localStorage.setItem("comments", JSON.stringify(oldComments));
    commentArea.innerHTML += `<p>您</p><p>${newComment}</p>`;
    textarea.value = "";
});
