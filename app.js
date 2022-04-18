let id = Date.now();
let messageObject = {id:id, message:""};

let chatBox = document.querySelector('#chatBox');
let message = document.querySelector('#message');
let sendBtn = document.querySelector('#sendBtn');

sendBtn.onclick = () => {
    console.log(message.value);
    let myMessage = document.createElement('span');
    myMessage.style.color = "blue";
    myMessage.textContent = message.value;
    chatBox.appendChild(myMessage);
    messageObject.message = message.value;
    console.log(messageObject);
    sendMessages();
    message.value = "";
};

setInterval(getMessages, 4000);

function getMessages(){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        console.log(this);
        if(this.readyState == 4 && this.status == 200)
        {
            console.log("Le message du serveur " + this.response);
            if(id != this.response.id)
            {
                let myMessage = document.createElement('span');
                myMessage.style.color = "green";
                myMessage.textContent = this.response.message;
                chatBox.appendChild(myMessage);
            }
        }
    };

    xhr.open("GET", "php/get_message.php", true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
    xhr.send();

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