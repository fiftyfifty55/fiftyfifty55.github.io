function submitFeedback() {
    const feedbackField = document.getElementById('feedbackText');
    const content = feedbackField.value.trim();

    if (content === "") {
        alert("請先輸入意見內容再送出喔！");
        return;
    }

    alert("感謝您的寶貴意見！我們會努力做得更好。");
    
    // 清空輸入框
    feedbackField.value = "";
}

function logout() {
    if (confirm("您確定要登出嗎？")) {
        localStorage.removeItem('isLoggedIn'); // 清除登入狀態
        window.location.href = "sign_in/index.html";
    }
}