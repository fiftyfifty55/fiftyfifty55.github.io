document.getElementById('signInForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    const passwordInput = this.querySelector('input[type="password"]');
    
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;

    if (emailValue === "") {
        alert("請輸入您的電子郵件");
        return;
    }
    if (passwordValue === "") {
        alert("請輸入您的密碼");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
        alert("非電子郵件");
        return;
    }

    const pwdPattern = /^[a-zA-Z0-9]+$/;
    if (!pwdPattern.test(passwordValue)) {
        alert("密碼僅包含英文大小寫和數字");
        return;
    }

    console.log("驗證通過，準備跳轉...");
    window.location.href = "../index.html";; 
});
