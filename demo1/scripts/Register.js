import User from "../scripts/Utils/Classes.js"
const userName = document.getElementById('userName');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const password = document.getElementById('password');
const email = document.getElementById('email');

export function sendHTTPRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onprogress = function () {
            console.log("Loading...");
        };
        xhr.onload = function () {
            if (this.status != 200) {
                console.log("Error" + this.status);
            }
            else {
                let response = JSON.parse(this.responseText);
                resolve(response);
            }
        };
        xhr.onerror = function () {
            reject("Error");
        };
        xhr.send();
    });
}

const importUsers = async () => {
    
    let response = await sendHTTPRequest("../data/users.json");
    // console.log ("Executed!")
    localStorage.setItem("allUsers", JSON.stringify(response));
    localStorage.removeItem("userSession"); 
}

const registerHandler = () => {
    if (localStorage.getItem("allUsers")) {
        let usersArr = JSON.parse(localStorage.getItem("allUsers"));
        let newUser = new User(usersArr.length + 1, userName.value,
            fname.value, lname.value, email.value, password.value);
        console.log("New User Created! , ", newUser);
        usersArr.push(newUser);
        localStorage.setItem("allUsers", JSON.stringify(usersArr));
    } else {
        let newUser = new User(1, userName.value,
            fname.value, lname.value, email.value, password.value);
        localStorage.setItem("allUsers", JSON.stringify([newUser]));
    }
}

document.getElementById("registerBtn").addEventListener("click", registerHandler);
document.getElementById("importBtn").addEventListener("click", importUsers);


