

let input = document.getElementById('inputfield');
let submit = document.getElementById('sendmsg')
let msgcontainer = document.getElementsByClassName('maincontainer')[0];
let userss=document.getElementById('no')


var socket = io()
let userName;

do {
  userName = prompt("Please enter your name:");
} while (!userName);
socket.emit('name',userName)

socket.on('name_br',function(value){
    let joined_block=document.createElement('div');
    joined_block.classList.add('msg3');
    joined_block.innerHTML=value+" connected";
    msgcontainer.appendChild(joined_block);
})

socket.on('disc',function(value){
    let joined_block=document.createElement('div');
    joined_block.classList.add('msg3');
    joined_block.innerHTML=value+" disconnected";
    msgcontainer.appendChild(joined_block);
})

socket.on('no_of_users',function(value){
    userss.innerHTML=`${value}`;
})


function sendMessage(){
    let date = new Date();
    let hour = date.getHours();
    let minutes=date.getMinutes();
    let newelement = document.createElement('div');
    newelement.classList.add("msgs");
    let suraj=input.value;
    newelement.innerHTML=`<p class='name-of-user'>${userName}</p>${suraj}<p class='time'>${hour}:${minutes}</p>`;
    input.value="";
    socket.emit("user_name",`<p class='name-of-user'>${userName}</p>${suraj}<p class='time'>${hour}:${minutes}</p>`);
    msgcontainer.appendChild(newelement)
    

}


submit.addEventListener('click', sendMessage);

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


socket.on('broadcast',function(value){
    let broadelement = document.createElement('div');
    broadelement.classList.add("msgs2");
    broadelement.innerHTML=value;
    msgcontainer.appendChild(broadelement)
})