import { foo } from "./module";
import "./style.scss";

console.log(foo);

const host = "http://localhost:3000/"
const gameId = 1;
const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};

const getGameResources = async () => {
    let response = await fetch(`${host}game/${gameId}`, options);
    let json = await response.json();

    return {
        symbols: json.resources.symbols,
        button: json.resources.button,
        name: json.name
    };
}

const getNewGameRound = async () => {
    let response = await fetch(`${host}game/1/newround`, options)
    return await response.json();
}

const getImgBlob = async (resource) => {
    let response = await fetch(`${host}${resource}`, options)
    return await response.blob();
}

const getSymbols = async (resources, container) => {
    let imgBlob, objectURL, img, response;
    let objectURLs = [];

    for (let resource of resources.symbols) {
        const imgBlob = await getImgBlob(resource);

        // objectURLs.push(URL.createObjectURL(imgBlob));

        objectURL = URL.createObjectURL(imgBlob);
        img = document.createElement("img");
        img.src = objectURL;
        container.appendChild(img);
    }
}

const handleButtonClick = async () => {
    const gameRoundData = await getNewGameRound();

    const { bonus, outcome, winType } = gameRoundData;

    if (bonus) {
        console.log("FREE SPIN")
    }
    console.log(outcome);
    console.log(winType);
}

const getButton = async (resources, button) => {
    let imgBlob, objectURL, img, response;
    imgBlob = await getImgBlob(resources.button);

    objectURL = URL.createObjectURL(imgBlob);
    img = document.createElement("img");
    img.src = objectURL;
    button.appendChild(img);

    button.onclick = handleButtonClick;
}

const initGameResources = async () => {
    let response, json;

    const resources = await getGameResources();

    let h1 = document.querySelector('h1');
    h1.textContent = resources.name;
    let resourceContainer = document.querySelector('.resources');
    let button = document.querySelector('button');

    await getSymbols(resources, resourceContainer);
    await getButton(resources, button);
}
initGameResources();
// GET resources
// TODO: handlers







