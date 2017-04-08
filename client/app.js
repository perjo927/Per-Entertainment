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

// Symbols
const handleSymbols = async (resources, container) => {
    let imgBlob, objectURL, img, response;
    let objectURLs = [];

    for (let resource of resources.symbols) {
        response = await fetch(`${host}${resource}`, options)
        imgBlob = await response.blob();

        objectURLs.push(URL.createObjectURL(imgBlob));

        objectURL = URL.createObjectURL(imgBlob);
        img = document.createElement("img");
        img.src = objectURL;
        container.appendChild(img);
    }
}

let handleButton = async (resources, button) => {
    let imgBlob, objectURL, img, response;

    // Button
    response = await fetch(`${host}${resources.button}`, options)
    imgBlob = await response.blob();

    objectURL = URL.createObjectURL(imgBlob);
    img = document.createElement("img");
    img.src = objectURL;

    button.appendChild(img);

    button.onclick = async () => {
        let r = await fetch(`${host}game/1/newround`, options)
        let j = await r.json();

        const { bonus, outcome, winType } = j;

        if (bonus) {
            console.log("FREE SPIN")
        }
        console.log(outcome);
        console.log(winType);
    }
}

const initGameResources = async () => {
    let response, json;

    const resources = await getGameResources();

    let h1 = document.querySelector('h1');
    h1.textContent = resources.name;
    let resourceContainer = document.querySelector('.resources');
    let button = document.querySelector('button');

    await handleSymbols(resources, resourceContainer);   
    await handleButton(resources, button);
}
initGameResources();
// GET resources
// TODO: handlers







