// Crée le cookie si l'utilsateur n'a pas encore de cookie pour son id
if(document.cookie == "")
{
    let createUsernameBtn = document.querySelector('#create-btn');
    createUsernameBtn.onclick = () => {

        let userName = document.querySelector('#get-username').value;
        if(userName != "")
        {
            userName += "#";
            for (let i = 0; i < 4; i++) 
            {
                userName += parseInt(Math.random() * 10);    
            }
            document.cookie = `user_id=${userName}; expires=Mon, 07 Oct 2030 01:00:00 GMT path=/`;
            window.location = '/chat.html'
        }

    }
}
else
{
    window.location = '/chat.html'
}