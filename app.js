let id_user = Math.round((Date.now() * (Math.random() * 10))/1000000);
let messageObject = {id_user:id_user, id_message: null, message:""};

lastMessageID = null;

let chatBox = document.querySelector('#chatBox');
let message = document.querySelector('#message');
let sendBtn = document.querySelector('#sendBtn');

sendBtn.onclick = () => {
    let textBoxLeft = document.createElement('div');
    textBoxLeft.classList.add('text_box_left');
    let messageDisplay = document.createElement('span');
    messageDisplay.classList.add('my_message');
    messageDisplay.textContent = message.value;
    textBoxLeft.appendChild(messageDisplay);
    chatBox.appendChild(textBoxLeft);
    messageObject.message = message.value;
    messageObject.id_message = Date.now();
    sendMessages();
    message.value = "";
};

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
            console.log("Le message du serveur " + this.response);
            if(id_user != this.response.id_user && this.response.id_message != lastMessageID)
            {
                lastMessageID = this.response.id_message;

                let textBoxRight = document.createElement('div');
                textBoxRight.classList.add('text_box_right');
                let messageDisplay = document.createElement('span');
                messageDisplay.classList.add('other_message');
                messageDisplay.textContent = this.response.message;
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

setInterval(getMessages, 3000);