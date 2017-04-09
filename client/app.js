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

let symbols = [];

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
    let objectURLs = [];

    for (let resource of resources.symbols) {
        const imgBlob = await getImgBlob(resource);
        objectURLs.push(URL.createObjectURL(imgBlob));
    }
    return objectURLs;
}

const handleButtonClick = async () => {
    const gameRoundData = await getNewGameRound();
    const { bonus, outcome, winType } = gameRoundData;

    // TODO
    console.log(winType);

    let objectURL, img;
    const container = document.querySelector('.slot-grid');
    // Clear grid, if anything in the grid        
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // TODO setSymbols(container)
    for (let symbol of outcome) {        
        let url = this.symbols[symbol];
        console.log(symbol, url)
        img = document.createElement("img");
        img.src = url;
        container.appendChild(img);
    }

    if (bonus) {
        // TODO
        console.log("FREE SPIN")
        await handleButtonClick();
    }
}

const getButton = async (resources, button) => {
    const imgBlob = await getImgBlob(resources.button);
    const objectURL = URL.createObjectURL(imgBlob);
    let img = document.createElement("img");
    img.src = objectURL;
    button.appendChild(img);
    button.onclick = handleButtonClick;
}

const setTitle = (resources, element) => {
    element.textContent = resources.name;
}

const initGameResources = async () => {
    let page = document.querySelector.bind(document);
    const resources = await getGameResources();

    setTitle(resources, page('h1'));
    this.symbols = await getSymbols(resources, page('.resources'));
    await getButton(resources, page('button'));
}

initGameResources();








