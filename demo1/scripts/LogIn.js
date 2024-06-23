import { delay } from "../scripts/Utils/Classes.js"
const userName = document.getElementById('userName');
const password = document.getElementById('password');



const logInHandler = async () => {
    if (localStorage.getItem("allUsers")) {
        let arrUsers = JSON.parse(localStorage.getItem("allUsers"));
        for (let x in arrUsers) {
            let user = arrUsers[x];
            if (user.userName == userName.value) {
                if (user.password == password.value) {
                    localStorage.setItem("userSession", JSON.stringify(user));
                    // await delay();
                    window.location.href = "../pages/AllUsers.html";
                } else {
                    alert("Passsword is not Valid!")
                }
            }  
        }           
    } else {
        alert("Sorry User Not Found!")
    }
};

document.getElementById('logInBtn').addEventListener('click', logInHandler);
// localStorage.removeItem("userSession"); 