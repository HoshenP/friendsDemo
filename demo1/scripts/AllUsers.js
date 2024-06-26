
let arrUsers = [];
let currUser = JSON.parse(localStorage.getItem("userSession"));
let frSection = document.getElementById("frSection");
let approveBtn = document.getElementById("approveBtn");
let declineBtn = document.getElementById("declineBtn");

function showUsers(arr){
    // debugger;
    $("#userContainer").text("");
    let index = arr.findIndex((user) => user.id == currUser.id);
    
    // frSelect.innerHTML = ""; 

    for(let i in arr){
        if(i!=index){
            let userCard = document.createElement("ul");
            let username = document.createElement("li");
            let fname = document.createElement("li");
            let lname = document.createElement("li");
            let email = document.createElement("li");
            let frBTN = document.createElement("button");

            username.innerHTML = `<span class="hint">Username: </span>${arr[i].userName}`;
            fname.innerHTML = `<span class="hint">First Name: </span>${arr[i].fname}`;
            lname.innerHTML = `<span class="hint">Last Name: </span>${arr[i].lname}`;
            email.innerHTML = `<span class="hint">Email: </span>${arr[i].email}`;
            frBTN.innerHTML = "Add Friend";
            userCard.appendChild(username);
            userCard.appendChild(fname);
            userCard.appendChild(lname);
            userCard.appendChild(email);
            
            if (currUser.id != arr[i].id){
                userCard.append(frBTN);
                if ((arr[i].FRI.findIndex(fro => fro == currUser.id)) != -1){
                    // frBTN.disabled = "true"
                    // frBTN.innerHTML = "Friend Request Sent";
                    frBTN.style.display = "none";
                    let friendsIcon = document.createElement("i");
                    friendsIcon.className = "fa-solid fa-hand-holding-heart friendsIcon";
                    userCard.appendChild(friendsIcon);

                } else if ((arr[i].AllFriends.findIndex(fro => fro == currUser.id)) != -1) {
                    // frBTN.disabled = "true"
                    // frBTN.innerHTML = "Already Friends";
                    frBTN.style.display = "none";
                    let friendsIcon = document.createElement("i");
                    friendsIcon.className = "fa-solid fa-user-group friendsIcon";
                    userCard.appendChild(friendsIcon);


                } else if ((arr[i].FRO.findIndex(fro => fro == currUser.id)) != -1) {
                    // frBTN.disabled = "true"
                    // frBTN.innerHTML = "Request received";
                    frBTN.style.display = "none";
                    let friendsIcon = document.createElement("i");
                    friendsIcon.className = "fa-solid fa-handshake friendsIcon";
                    userCard.appendChild(friendsIcon);
                } else {
                    frBTN.addEventListener("click", () => {
                        sendFR(i, frBTN)
                    });
                }
            }

            $("#userContainer").append(userCard);
        }
    }


    if (currUser.FRI.length == 0) {
        document.getElementById("frSection").style.display = "none";
    }
    showFR()
}

function sendFR(i, frBTN){
    // debugger;
    frBTN.innerHTML = "Friend Request Sent";
    frBTN.disabled = "true"
    let sndvUserIndex = arrUsers.findIndex(user => user.id == currUser.id);
    arrUsers[sndvUserIndex].FRO.push(arrUsers[i].id);
    arrUsers[i].FRI.push(currUser.id);
    updateLocalStorage();
}

function showFR(){
    // debugger;
    frSelect.innerHTML = "";
    if(currUser.FRI.length > 0){
        frSection.style.display = "block";
        for (let i in currUser.FRI){
            let frOption = document.createElement("option");
            frOption.text = currUser.FRI[i];
            frSelect.options.add(frOption);
        }
    } 
}

function frReply (reply){
    // debugger;
    let frSelect = document.getElementById("frSelect");
    // let fro = frSelect.value;
    let fro = frSelect.options[frSelect.selectedIndex].value;
    // console.log(fro);
    let sndUserIndex = arrUsers.findIndex(user => user.id == fro);
    let rcvUserIndex = arrUsers.findIndex(user => user.id == currUser.id);
    let froIndex = arrUsers[sndUserIndex].FRO.findIndex((element) => element == currUser.id)
    let friIndex = arrUsers[rcvUserIndex].FRI.findIndex((element) => element == fro)
    arrUsers[sndUserIndex].FRO.splice(froIndex ,1);
    arrUsers[rcvUserIndex].FRI.splice(friIndex ,1);   
    
    if (reply =="approve"){
        arrUsers[sndUserIndex].AllFriends.push(+currUser.id);
        arrUsers[rcvUserIndex].AllFriends.push(+fro);
    }
    // debugger;
    updateLocalStorage();

}


function updateLocalStorage(){
    localStorage.setItem("allUsers", JSON.stringify(arrUsers));
    currUser = arrUsers[arrUsers.findIndex(user => user.id == currUser.id)];
    localStorage.setItem("userSession", JSON.stringify(currUser));
    showUsers(arrUsers);
}
    
$(document).ready(function(){
    if (localStorage.getItem("userSession")) {        
        arrUsers = JSON.parse(localStorage.getItem("allUsers"));
        $("#userName").text(currUser.userName);
        $("#fname").text(currUser.fname);
        $("#lname").text(currUser.lname);
        $("#email").text(currUser.email);
        $("#showAll").click(function(){
            showUsers(arrUsers);
        });
        $("#showFriends").click(function(){
            let tempArr = [];
            
            for (let i in arrUsers){
                if ((arrUsers[i].AllFriends.findIndex(af => af == currUser.id)) != -1){
                    tempArr.push(arrUsers[i]);
                }
            }
            tempArr.push(currUser);
            showUsers(tempArr);
            // debugger;
        });
        showUsers(arrUsers);
    } else {
        container.innerHTML = "<h1>Sorry User Not Found!</h1>";
        // delay().then(() => {
        //     window.location.href = "logIn.html";
        // });
    }    
});
approveBtn.addEventListener("click", function () {frReply("approve")});
declineBtn.addEventListener("click", function () {frReply("decline")});