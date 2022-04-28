const chatBox = document.querySelector('#chat-box');

let messageDate;
let messageObject;
let firstGet = false;


function splitCookie(index){
    let userName = document.cookie.split("=")[1];
    return userName.split("#")[index];
}


function belowTenAddZero(num){
    if(num < 10)
    {
        return '0' + num;
    }
    else
    {
        return num;
    }
}

function dateMsqlFormat(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = belowTenAddZero(month);
    let day = date.getDate();
    day = belowTenAddZero(day);
    return year + ":" + month + ":" + day;
}

function getTime(){
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let secondes = date.getSeconds();
    hours = belowTenAddZero(hours);
    minutes = belowTenAddZero(minutes);
    secondes = belowTenAddZero(secondes);
    return `${hours}:${minutes}:${secondes}`;
}
        
function sendMessages(messageObject){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        console.log(this);
        if(this.readyState == 4 && this.status == 200)
        {
            console.log(this.response);
        }
    };

    xhr.open("POST", "/php/post_messages.php", true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
    xhr.send("message=" + JSON.stringify(messageObject));
}

document.querySelector('#send-message-btn').onclick = () => {

    let messageContent = document.querySelector('#message-content');

    if(messageContent.value != "")
    {
        let userName = splitCookie(0);
        let userID = splitCookie(1);

        let date = dateMsqlFormat();
        let time = getTime();

        let messageObject = { content: messageContent.value, id_user:userID, name_user:userName, date: date, time:time};
        sendMessages(messageObject);
    }

    messageContent.value = "";
    
};

//----------------------------------------------------------------------------------

function createSpanDate(element){
    if(messageDate != element.date)
    {
        messageDate = element.date;
        let year = element.date.split('-')[0];
        let month = element.date.split('-')[1];
        let day = element.date.split('-')[2];
        let spanDate = document.createElement('div');
        spanDate.textContent = `${day}-${month}-${year}`;
        spanDate.classList.add('date-div');
        return spanDate;
    }
}

function fillChatBoxMessages(element){
    let spanDate = createSpanDate(element);

    let messageDiv = document.createElement('div');

    if(`${element.name_user}#${element.id_user}` == document.cookie.split("=")[1])
    {
        messageDiv.classList.add('messages-send');
    }
    else
    {
        messageDiv.classList.add('messages-received');
    }
    
    let userNameSpan = document.createElement('span');
    userNameSpan.textContent = element.name_user;
    userNameSpan.classList.add('user-name-span');

    let hourSpan = document.createElement('span');
    hourSpan.innerHTML = element.time;
    hourSpan.classList.add('hour-span');

    let messageSpan = document.createElement('span');
    messageSpan.innerHTML = element.content;
    messageSpan.classList.add('messages-span');

    messageDiv.append(userNameSpan);
    messageDiv.append(hourSpan);
    messageDiv.append(messageSpan);
    if(spanDate != undefined)
    {
        chatBox.append(spanDate);
    }
    chatBox.append(messageDiv);
}

function getMessages(){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        // console.log(this);
        if(this.readyState == 4 && this.status == 200)
        {
            for (let i = 0; i < this.response.length; i++) {

                if(firstGet == false)
                {
                    fillChatBoxMessages(this.response[i]);
                    // Scroll down
                    chatBox.scrollTop = chatBox.scrollHeight;
                }

                if( i == this.response.length - 1)
                {
                    firstGet = true;
                    messageObject = this.response;
                }

                if(firstGet == true && messageObject.length != this.response.length)
                {
                    fillChatBoxMessages(this.response[this.response.length - 1]);
                    messageObject = this.response;

                    // Scroll down
                    chatBox.scrollTop = chatBox.scrollHeight;
                }
                
                
            }
            messageObject = this.response;
        }
            
};

xhr.open("GET", "/php/get_messages.php", true);
xhr.responseType = "json";
xhr.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
xhr.send();

}

getMessages();
setInterval(getMessages, 500);