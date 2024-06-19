import { delay } from "../scripts/Utils/Classes.js"
const userName = document.getElementById('userName');
const passsword = document.getElementById('passsword');



const logInHandler = async () => {
    if (localStorage.getItem("allUsers")) {
        let arrUsers = JSON.parse(localStorage.getItem("allUsers"));
        for (let x in arrUsers) {
            let user = arrUsers[x];
            if (user.userName == userName.value) {
                if (user.passsword == passsword.value) {
                    localStorage.setItem("userSession", JSON.stringify(user));
                    await delay();
                    window.location.href = "../pages/Home.html";
                } else {
                    alert("Passsword is not Valid!")
                }
            } else {
                alert("UserName is Not Valid!")
            }
        }
    } else {
        alert("Sorry Users Not Found!")
    }
};

document.getElementById('logInBtn').addEventListener('click', logInHandler);