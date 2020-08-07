const socket = io('http://localhost:3000');
const chatContainer = document.querySelector('.chat-container__message-container');
const chatContainerCompl = document.querySelector('.chat-container');
const messageForm = document.querySelector('.send-container');
const messageInput = document.querySelector('.send-container__input');
const hideChatBtn = document.querySelector('.chat-container__hide');
let hideChatBtnFlag = false;
let name = "";
let archive = [];


// ten route w fetchu obsługiwany jest przez serwer CRMa

fetch(`${window.location}/get-chat-name`)
    .then(response => response.json())
    .then(data => {
        name = data.userName;
        archive = data.archiveMessages

    })

    .then(() => insertArchive())
    .then(() => scrollToBottom(chatContainer));


hideChatBtn.addEventListener('click', () => {
    if (hideChatBtnFlag) {
        hideChatBtn.innerText = "Chat";
        hideChatBtn.style.top = '-55px';
        chatContainerCompl.style.bottom = "-250px";
        hideChatBtnFlag = false;
    } else {
        hideChatBtn.innerText = "Ukryj";
        hideChatBtn.style.top = '-25px';
        chatContainerCompl.style.bottom = "0px";
        hideChatBtnFlag = true;
    }

})

socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    const messageToDb = {
        date: createDate(),
        name: name,
        message: message
    };
    appendMessage(`${name}: ${message}`);
    socket.emit('send-chat-message', message);
    socket.emit('send-chat-message-to-db', messageToDb);
    messageInput.value = '';
});

function appendMessage(message, flag = false, nameArch = '') {
    const messageEl = document.createElement('div');
    if (flag) {
        messageEl.setAttribute('class', `chat-container__message--${nameArch}`);
        messageEl.innerText = message;
    } else {
        messageEl.setAttribute('class', `chat-container__message--${name}`);
        messageEl.innerText = `${createDate()} ${message}`;
    }

    chatContainer.append(messageEl);
    scrollToBottom(chatContainer);
};

function createDate() {
    const date = new Date;

    const dateInCalendar = '';
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const fullDate = `${dateInCalendar} ${hour < 10 ? 0 + hour.toString() : hour}:${minutes < 10 ? 0 + minutes.toString() : minutes}:${seconds < 10 ? 0 + seconds.toString() : seconds}`;
    return fullDate;
};

function insertArchive() {
    archive.forEach(message => {
        const messageToShow = `${message.date} ${message.name}: ${message.message}`;
        appendMessage(messageToShow, true, message.name);
    })
}

function scrollToBottom(chatContainer) {
    var div = chatContainer;
    div.scrollTop = div.scrollHeight - div.clientHeight;
}