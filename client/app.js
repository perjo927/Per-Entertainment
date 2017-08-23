import { Game } from "./game";
import { Ble } from "./ble";
import "./style.scss";

const initGame = async(spinEventName) => {
    const game = new Game("http://localhost:3000/", 1, document, spinEventName);
    let page = document.querySelector.bind(document);
    const resources = await game.getGameResources();

    game.setTitle(resources, page('h1'));
    await game.setSymbols(resources, page('.resources'));
    await game.showResult(page('.slot-grid'), [0, 0, 0], 0, true); // init game grid
    await game.setPlayButton(resources, page('button'));
}

const initBle = (spinEvent) => {
    return new Ble(spinEvent);
}

initBle("spin");
initGame("spin");