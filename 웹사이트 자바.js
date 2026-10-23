// 1. HTML 요소 가져오기
const chatForm = document.getElementById('chatForm');       // 입력 폼 (<form>)
const userInput = document.getElementById('userInput');     // 텍스트 입력창 (<input>)
const chatContainer = document.getElementById('chatContainer'); // 대화 상자 (<main>)

// 2. 폼 전송(submit) 이벤트 리스너 등록 (전송 버튼 클릭 또는 Enter 키 입력)
chatForm.addEventListener('submit', function (event) {
    // 폼 제출 시 페이지가 새로고침되는 기본 동작 방지
    event.preventDefault();

    // 입력된 텍스트 가져오기 (양쪽 공백 제거)
    const messageText = userInput.value.trim();

    // 입력값이 비어있지 않은 경우에만 실행
    if (messageText !== "") {
        // 사용자 질문 말풍선 생성 및 화면에 추가
        addUserMessage(messageText);

        // 입력창 비우기
        userInput.value = '';

        // 스크롤을 최하단으로 이동시켜 최신 메시지 표시
        scrollToBottom();
    }
});

// 3. 사용자 메시지 말풍선을 생성하여 화면에 추가하는 함수
function addUserMessage(text) {
    // 새로운 div 요소 생성 (<div class="message user-message">)
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';

    // 말풍선 내부 HTML 구조 생성
    userMessageDiv.innerHTML = `
        <div class="sender-name">나</div>
        <div class="message-bubble">${escapeHTML(text)}</div>
    `;

    // chatContainer 상자 안에 생성한 말풍선 붙이기
    chatContainer.appendChild(userMessageDiv);
}

// 4. 스크롤을 대화 상자의 맨 아래로 내려주는 함수
function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 5. 보안용: HTML 특수문자 변환 함수 (XSS 공격 방지)
function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}