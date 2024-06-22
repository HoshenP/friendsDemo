export default class User {
    FRO = [];
    FRI = [];
    AllFriends = [];
    constructor(id, userName, fname, lname, email, password) {
        this.id = id;
        this.userName = userName;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
    }
}

export class Post {
    constructor(id, author, title, body) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.body = body;
    }
}

//delay function!
export const delay = () => new Promise((resolve,) => setTimeout(resolve, 1500));

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

const getUsers = async () => {
    if (localStorage.getItem("users")) {
        userArr = JSON.parse((localStorage.getItem("users")));
    } else {
        let response = await sendHTTPRequest(url);
        console.log ("Executed!")
        localStorage.setItem("users", JSON.stringify(response)); 
    }
    userArr = JSON.parse((localStorage.getItem("users")));
    showUsersInHtml(userArr);
}