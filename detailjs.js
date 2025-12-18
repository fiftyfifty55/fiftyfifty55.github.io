const pa = new URLSearchParams(window.location.search);
const id = pa.get("id");
fetch("../ex.json")
    .then(res => res.json())
    .then(pr => {
        const pro = pr.find(p => p.id == id);
        if (!pro) {
            alert("查無商品，請再試一次");
            window.location.href = "/";
            return;
        }
        document.getElementById("prodName").textContent = pro.name;
        document.getElementById("prodPrice").textContent = pro.price;
        const specselect = document.getElementById("optionsArea");
        pro.spec.forEach(spec => {
            const op = document.createElement("option");
            opt.textContent = spec;
            opt.value = spec;
            specselect.appendChild(opt);
        });
    });