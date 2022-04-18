let body = document.querySelector('body');

let inputTextName = document.querySelector('#login-box input');
let userName = null;

let id_user = Math.round((Date.now() * (Math.random() * 10))/1000000);
color = "rgb(" + randomColor()[0] + "," + randomColor()[1] + "," + randomColor()[2] + ")";
let messageObject = {id_user:id_user, color:color, id_message: null, message:""};

lastMessageID = null;


let chatBox = document.querySelector('#chat-box');
let message = document.querySelector('#message');
let sendBtn = document.querySelector('#send-btn');

sendBtn.onclick = () => {
    send();
};

body.onkeydown = (event) =>{
    if(event.key == "Enter")
    {
        if(userName == null)
        {
            if(inputTextName.value != "")
            {
                userName = inputTextName.value;
                messageObject.userName = userName;
                document.querySelector('#chat-box').style.visibility = "visible";
                document.querySelector('#chat-box + div').style.visibility = "visible";
                document.querySelector('#login-box').style.visibility = "hidden";
                document.querySelector('#login-box').style.height = "0px";
            }  
        }
        else
        {
            send();
        }
    }
}

function randomColor(){
    let colorSenquence = [];
    for (let i = 0; i < 3; i++) {
        colorSenquence.push(Math.round(Math.random() * 200))
    }
    return colorSenquence;
}

function send(){
    if(message.value != "")
    {
        let textBoxLeft = document.createElement('div');
        textBoxLeft.classList.add('text-box-left');

        let userNameText = document.createElement('span');
        userNameText.classList.add('username-properties');
        userNameText.textContent = messageObject.userName;

        let messageDisplay = document.createElement('span');
        messageDisplay.classList.add('message-properties');
        messageDisplay.style.backgroundColor = messageObject.color;
        messageDisplay.textContent = message.value;

        textBoxLeft.appendChild(userNameText);
        textBoxLeft.appendChild(messageDisplay);
        chatBox.appendChild(textBoxLeft);
        messageObject.message = message.value;
        messageObject.id_message = Date.now();
        sendMessages();
        message.value = "";
    }
}

function sendMessages(){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        console.log(this);
        if(this.readyState == 4 && this.status == 200)
        {
            console.log(this.response);
        }
    };

    xhr.open("POST", "php/send_message.php", true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
    xhr.send("message=" +  JSON.stringify(messageObject));
}

function getMessages(){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        console.log(this);
        if(this.readyState == 4 && this.status == 200)
        {
            if(id_user != this.response.id_user && this.response.id_message != lastMessageID)
            {
                lastMessageID = this.response.id_message;

                let textBoxRight = document.createElement('div');
                textBoxRight.classList.add('text-box-right');

                let userNameText = document.createElement('span');
                userNameText.classList.add('username-properties');
                userNameText.textContent = this.response.userName;

                let messageDisplay = document.createElement('span');
                messageDisplay.classList.add('message-properties');
                messageDisplay.style.backgroundColor = this.response.color;
                messageDisplay.textContent = this.response.message;

                textBoxRight.appendChild(userNameText);
                textBoxRight.appendChild(messageDisplay);
                chatBox.appendChild(textBoxRight);
            }
            
        }
    };

    xhr.open("GET", "php/get_message.php", true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
    xhr.send();

}

setInterval(getMessages, 1500);

console.log(messageObject);