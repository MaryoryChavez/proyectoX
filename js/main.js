//Version 1.0
var historyOut = [];
var historyIn = [];
var listContact = [
    new contact("chat 1", 'image/logocodeacademy.png'),
	new contact("chat 2", 'image/logocodeacademy.png'),
];

function contact(_nombre, _img) {
    this.nombre = _nombre;
    this.imgUrl = _img;
    this.lastMsg = "";
    this.clockLastMsg = clock();
}


function messageInput(evt) {
    var msg = document.getElementById("mensajes");
    var user = document.getElementById("user");
    var msgOut = {
        user: user.textContent,
        text: msg.value,
        clock: clock(),
    };

    if (evt.keyCode == 13) {
        historyOut.push(msgOut);
        printMsg(msgOut.text, msgOut.clock);
        createContact(msgOut.text, msgOut.clock);
        msg.value = '';
    };
};

function clock() {
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();
    if (hour < 10) {
        hour = "0" + new Date().getHours();
    };
    if (minutes < 10) {
        minutes = "0" + new Date().getMinutes();
    };
    return (hour + ":" + minutes);
}

function printMsg(_text, _clock) {
    var chat = document.getElementById("chat");
    var newmsg = '<div class = "w-message w-message-out">' +
        '<div class = "w-message-text">' +
        '<p>' + _text + '</p>' +
        '<div class = "time">' + _clock + '</div>' +
        '</div>' +
        '</div>';
    chat.innerHTML += newmsg;
}

function createContact(_msg, _clock) {
    var ulContacts = document.getElementsByClassName("w-recent-chats")[0];
    var li = document.createElement("li");
    var contact = '<div class="avatar">' +
        '<img src="image/logocodeacademy.png" alt="" class="wh-44">' +
        '<h4 class="w-contact-name">Laboratoria Perú</h4>' +
        '<p class="w-last-message" id="mensaje">' + _msg + '</p>' +
        '</div>' +
        '<div class="time" id="hora">' + _clock + '</div>';
    li.innerHTML = contact;
    //console.log(ulContacts.childNodes[0]);
    ulContacts.replaceChild(li, ulContacts.childNodes[0]);
}

function init() {
    initChatList();
}

function initChatList() {
    var chatList = document.getElementById("lista-chats");
    for (var i in listContact) {
        var htmlChatItem = '<li><div class="avatar">' +
            '<img src="' + listContact[i].imgUrl + '" alt="" class="wh-44">' +
            '<h4 class="w-contact-name">' + listContact[i].nombre + '</h4>' +
            '<p class="w-last-message" id="mensaje">' + listContact[i].lastMsg + '</p>' +
            '</div>' +
            '<div class="time" id="hora">' + listContact[i].clockLastMsg + '</div></li>';
        //listContact[i].borrarMensajes();
        chatList.innerHTML += htmlChatItem;
    }
    setEventsChatList(chatList);
}

function setEventsChatList(_chatList) {
    var arrListItems = _chatList.getElementsByTagName('li');
    for (var i = 0; i < arrListItems.length; i++) {
        arrListItems[i].addEventListener('click', onChatItemClick);
    }
}

function onChatItemClick(evt) {
    //console.log(evt.currentTarget.getElementsByClassName('w-contact-name')[0].textContent);
    var contactName = evt.currentTarget.getElementsByClassName('w-contact-name')[0].textContent;
    var imgURL = evt.currentTarget.getElementsByClassName('wh-44')[0].src;
    //console.log('click');
    updateHeadChat(contactName, imgURL, "Conectado");
    erased();
}

function updateHeadChat(_contactName, _imageURL, _estado) {
    var chatHeader = document.getElementById("chat-header");
    chatHeader.getElementsByClassName('w-contact-name')[0].innerHTML = _contactName;
    chatHeader.getElementsByClassName('w-users-messages')[0].innerHTML = _estado;
    chatHeader.getElementsByTagName('img')[0].src = _imageURL;
}

function erased() {
    var historyChat = document.getElementById("chat");
    console.log(historyChat);
    while (historyChat.firstChild) {
        historyChat.removeChild(historyChat.firstChild);
    }
}

function searchList(evt) {
    var listaContacto = document.getElementById("lista-chats");
    var contacto = listaContacto.getElementsByClassName("w-contact-name");
    var forEach = Array.prototype.forEach;
    var letter = document.getElementById("search").value;

    console.log(letter);
    forEach.call(contacto, function (forEach) {
        if(forEach.innerHTML.toLowerCase().search(letter.toLowerCase()) == -1){
            forEach.parentNode.parentNode.style.display = "none";
        }else{
            forEach.parentNode.parentNode.style.display = "block";
        }
    });
}
    
    
/*
function msgOut(_user, _text){
    this.person = _user;
    this.text = _text;
    this.clock = clock();
}

msg.onkeyup = function (evt) {
var user = document.getElementById("user");
    if(evt.keyCode == 13){
        historyOut.push(new msgOut(user.textContent,msg.value));
        console.log(new msgOut(user.textContent,msg.value).text);
        printMsg(new msgOut(user.textContent,msg.value).text,new msgOut(user.textContent,msg.value).clock);
    }
};
*/


/*
var msg = document.getElementById("mensajes");
var chat = document.getElementById("chat");
var search = document.getElementsByClassName("w-search-contacts")[0];

var li = null;

msg.onkeyup = function (evt) {
    var msgOut = {
        text: msg.value,
        clock: correctHour(),
    };

    if (evt.keyCode == 13) {
        historyOut.push(msgOut);
        createMsgOut(msgOut.text, msgOut.clock);
        createContact(msgOut.text, msgOut.clock);
        msg.value = '';
    };
};

function correctHour() {
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();
    if (hour < 10) {
        hour = "0" + new Date().getHours();
    };
    if (minutes < 10) {
        minutes = "0" + new Date().getMinutes();
    };
    return (hour + ":" + minutes);
}

function createMsgOut(_msg, _clock) {
    var msgout = '<div class = "w-message w-message-out">' +
        '<div class = "w-message-text">' +
        '<p>' + _msg + '</p>' +
        '<div class = "time">' + _clock + '</div>' +
        '</div>' +
        '</div>';
    chat.innerHTML += msgout;
}

function createContact(_msg, _clock) {
    var ulContacts = document.getElementsByClassName("w-recent-chats")[0];
        li = document.createElement("li");
    var contact = '<div class="avatar">' +
        '<img src="image/logocodeacademy.png" alt="" class="wh-44">' +
        '<h4 class="w-contact-name">Laboratoria Perú</h4>' +
        '<p class="w-last-message" id="mensaje">' + _msg + '</p>' +
        '</div>' +
        '<div class="time" id="hora">' + _clock + '</div>';
    li.innerHTML = contact;
        //ulContacts.insertBefore(li,ulContacts.childNodes[0]);
        console.log(ulContacts.childNodes[0]);
        ulContacts.replaceChild(li,ulContacts.childNodes[0]);
}

function init(){
    initChatList();
}

function initChatList(){
    
}
*/
