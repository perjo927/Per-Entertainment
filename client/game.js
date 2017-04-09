
export class Game {

    constructor(host, id, document) {

        this._document = document;
        this._fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };
        this._host = host;
        this._id = id;
        this._symbols = [];
    }

    async delay (ms) { 
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
        const container = this._document.querySelector('.slot-grid');
        this._clearGrid(container);
        await this.showResult(container, outcome);

        if (bonus) {
            // TODO: show to user
            console.log("FREE SPIN")
            await this.delay(300);            
            await this.handlePlayClick();
        }
    }

    _clearGrid(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    async showResult(container, outcome, timeout = 300) {
        let url, img;

        for (let symbol of outcome) {
            url = this._symbols[symbol];
            img = this._document.createElement("img");
            img.src = url;            
            container.appendChild(img);
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