import { delay, Post } from "../scripts/Utils/Classes.js"
const container = document.getElementById("container");
const welcomeHeader = document.getElementById("welcomeHeader");
const modal = document.getElementById("modal");
const title = document.getElementById("title");
const body = document.getElementById("body");
if (localStorage.getItem("userSession")) {
    const user = JSON.parse(localStorage.getItem("userSession"));
    welcomeHeader.innerText = `Welcome to ${user.userName}`;
} else {
    container.innerHTML = "<h1>Sorry User Not Found!</h1>";
    delay().then(() => {
        window.location.href = "logIn.html";
    });
}

document.getElementById("newPostBtn").addEventListener("click", () => {
    modal.showModal();
});
document.getElementById("closeModal").addEventListener("click", () => {
    modal.close();
});
document.getElementById("addNewPostBtn").addEventListener("click", () => {
    if (localStorage.getItem("allPosts")) {
        let allPost = JSON.parse(localStorage.getItem("allPosts"));
        let newPost = new Post(allPost.length + 1, JSON.parse(localStorage.getItem("userSession")).userName, title.value, body.value);
        allPost.push(newPost);
        localStorage.setItem("allPosts", JSON.stringify(allPost));
    } else {
        let newPost = new Post(1, JSON.parse(localStorage.getItem("userSession")).userName, title.value, body.value);
        localStorage.setItem("allPosts", JSON.stringify([newPost]))
    }
    alert("New Post Created!");
    modal.close();
});

