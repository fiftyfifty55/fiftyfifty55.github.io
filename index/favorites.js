let fav = JSON.parse(localStorage.getItem("fav_mock"))||[];
function showfav() {
    const flist = document.querySelector("#favlist");
    flist.innerHTML = "";

    if (fav.length === 0) {
        flist.innerHTML = `<p>您尚未收藏任何商品，<a href="/">點此繼續購物</a></p>`;
        return ;
    }
    fav.forEach((p) => {
        flist.innerHTML += `
            <div class="container" style="border:1px solid #ddd; padding:12px; margin:10px 0;">
            <img src="${p.img}">
            <h2>${p.name}</h2>
            <p>價格：$ ${p.price}</p>
            <a href="./product-detail.html?id=${p.id}">查看詳情</a>
            </div>
        `
    });
}
showfav();