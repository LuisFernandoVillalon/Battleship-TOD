import loadPage from './loadPage.js';
import {setBoats} from './setBoats.js';

function loadStart() {
    loadPage();
    const start = document.getElementById("gridsContainer");
    start.classList.add("startPage");

    const formContainer = document.createElement("div");
    formContainer.classList.add("formContainer");

    const inputName = document.createElement("input");
    inputName.classList.add("inputName");
    inputName.id = "playerName";
    inputName.setAttribute("type", "text");
    inputName.setAttribute("name", "playerName");
    inputName.setAttribute("placeholder", "Enter player's name here");
    formContainer.appendChild(inputName);

    const button = document.createElement("button");
    button.classList.add("btn");
    button.id = "startBtn"
    button.setAttribute("value", "start");
    button.innerHTML = "Start Game!";
    button.addEventListener("click", () => {
        if (inputName.value !== "") {
            formContainer.classList.add("hide");
            start.classList.remove("startPage");
            setBoats();
        } else {
            alert("A name is needed!")
        }
    })
    formContainer.appendChild(button);

    start.appendChild(formContainer);
    return start;
}

function startPage() {
    loadStart();
}

export default startPage;