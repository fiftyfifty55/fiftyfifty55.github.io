document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const emailValue = document.getElementById('up-email').value.trim();
    const passwordValue = document.getElementById('up-password').value;
    const nameValue = document.getElementById('up-name').value.trim();

    // 1. 檢查是否為空
    if (emailValue === "") {
        alert("請輸入您的電子郵件");
        return;
    }
    if (passwordValue === "") {
        alert("請輸入您的密碼");
        return;
    }
    if (nameValue === "") {
        alert("請輸入您的姓名");
        return;
    }

    // 2. 檢查電子郵件格式
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
        alert("非電子郵件");
        return;
    }

    // 3. 檢查密碼格式 (僅限英文大小寫和數字)
    const pwdPattern = /^[a-zA-Z0-9]+$/;
    if (!pwdPattern.test(passwordValue)) {
        alert("密碼僅包含英文大小寫和數字");
        return;
    }

    // 4. 驗證成功，跳轉到會員中心
    alert("註冊成功！將為您跳轉至會員中心");
    window.location.href = "../index.html";
});
