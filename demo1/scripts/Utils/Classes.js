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