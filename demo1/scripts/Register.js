import User from "../scripts/Utils/Classes.js"
const userName = document.getElementById('userName');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const password = document.getElementById('password');
const email = document.getElementById('email');

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