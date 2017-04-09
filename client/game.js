
export class Game {

    constructor(host, id, document) {

        this._document = document;
        this.gameGrid = null;
        this._fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };
        this._host = host;
        this._id = id;
        this._symbols = [];
    }

    async delay(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    async getGameResources() {
        let response = await fetch(`${this._host}game/${this._id}`, this._fetchOptions);
        let json = await response.json();

        return {
            symbols: json.resources.symbols,
            button: json.resources.button,
            name: json.name
        };
    }

    async getNewGameRound() {
        let response = await fetch(`${this._host}game/1/newround`, this._fetchOptions)
        return await response.json();
    }

    async getImgBlob(resource) {
        let response = await fetch(`${this._host}${resource}`, this._fetchOptions)
        return await response.blob();
    }

    async setSymbols(resources, container) {
        let objectURLs = [];

        for (let resource of resources.symbols) {
            const imgBlob = await this.getImgBlob(resource);
            objectURLs.push(URL.createObjectURL(imgBlob));
        }
        this._symbols = objectURLs;
    }

    async handlePlayClick() {
        const gameRoundData = await this.getNewGameRound();
        const { bonus, outcome, winType } = gameRoundData;

        // TODO: show to user
        console.log(winType);

        // TODO: pass in container to handlePlayClick
        // const container = this._document.querySelector('.slot-grid');
        this._clearGrid(this.gameGrid);
        await this.showResult(this.gameGrid, outcome);

        if (bonus) {
            // TODO: show to user
            console.log("FREE SPIN")
            await this.delay(300);
            await this.handlePlayClick();
        }
    }

    _clearGrid(container) {
        for (let child of container.childNodes) {
            child.src = "";
        }
        // while (container.firstChild) {
        // console.log(container.firstChild)
        // container.removeChild(container.firstChild);            
        // }
    }

    async showResult(container, outcome, timeout = 300, init = false) {
        let url, img;
        if (init) {
            this.gameGrid = container;
        }

        console.log(container.childNodes)

        for (let [index, symbol] of outcome.entries()) {
            url = this._symbols[symbol];

            if (init) {
                img = this._document.createElement("img");
                img.src = url;
                container.appendChild(img);
            } else {
                console.log(container.childNodes[index], index)
                container.childNodes[index].src = url;
            }

            await this.delay(timeout);
        }
    }

    async setPlayButton(resources, button) {
        const imgBlob = await this.getImgBlob(resources.button);
        let img = this._document.createElement("img");
        img.src = URL.createObjectURL(imgBlob);
        button.appendChild(img);
        button.onclick = this.handlePlayClick.bind(this);
    }

    setTitle(resources, element) {
        element.textContent = resources.name;
    }
}