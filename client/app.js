import { Game } from "./game";
import "./style.scss";

const game = new Game("http://localhost:3000/", 1, document);

const initGame = async () => {
    let page = document.querySelector.bind(document);
    const resources = await game.getGameResources();

    game.setTitle(resources, page('h1'));
    await game.setSymbols(resources, page('.resources'));
    await game.showResult(page('.slot-grid'), [0, 0, 0], 0, true); // init game grid
    await game.setPlayButton(resources, page('button'));
}

initGame();




