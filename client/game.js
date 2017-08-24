export class Game {

    constructor(host, id, document, spinEvent) {
        this._document = document;
        this._gameGrid = null;
        this._playButton = null;
        this._fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };
        this._host = host;
        this._id = id;
        this._symbols = [];
        this._initRemoteSpin(spinEvent);
    }

    async _delay(ms) {
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

    async _getNewGameRound() {
        let response = await fetch(`${this._host}game/1/newround`, this._fetchOptions)
        return await response.json();
    }

    async _getImgBlob(resource) {
        let response = await fetch(`${this._host}${resource}`, this._fetchOptions)
        return await response.blob();
    }

    async setSymbols(resources, container) {
        let objectURLs = [];

        for (let resource of resources.symbols) {
            const imgBlob = await this._getImgBlob(resource);
            objectURLs.push(URL.createObjectURL(imgBlob));
        }
        this._symbols = objectURLs;
    }

    async _showAlert(container, message) {
        container.textContent = message;
        container.classList.remove("hide");
        container.classList.add("show");
        await this._delay(1000);
        container.classList.add("hide");
        container.classList.remove("show");
    }

    async _handlePlayClick(event) {
        const gameRoundData = await this._getNewGameRound();
        const { bonus, outcome, winType } = gameRoundData;
        const freespinElement = this._document.querySelector('.free-spin');
        const winElement = this._document.querySelector('.win');

        this._playButton.disabled = true;
        this._clearGrid(this._gameGrid);
        await this.showResult(this._gameGrid, outcome);
        await this._showAlert(winElement, winType);

        if (bonus) {
            await this._showAlert(freespinElement, "Free Spin!");
            await this._handlePlayClick(event);
        }
        this._playButton.disabled = false;
    }

    _clearGrid(container) {
        for (let child of container.childNodes) {
            child.src = "";
            child.classList.remove("slide");
        }
    }

    async showResult(container, outcome, timeout = 300, init = false) {
        let url, img;

        if (init) {
            this._gameGrid = container;
        }

        for (let [index, symbol] of outcome.entries()) {
            url = this._symbols[symbol];

            if (init) {
                img = this._document.createElement("img");
                img.src = url;
                container.appendChild(img);
            } else {
                img = container.childNodes[index];
                img.src = url;
                img.classList.add("slide");
                await this._delay(timeout);
            }

        }
    }

    _initRemoteSpin(spinEvent) {
        document.addEventListener(spinEvent, (e) => {
            // this._handlePlayClick();
            this._playButton.click();
        });
    }

    async setPlayButton(resources, button) {
        this._playButton = button;

        const imgBlob = await this._getImgBlob(resources.button);
        let img = this._document.createElement("img");
        img.src = URL.createObjectURL(imgBlob);
        this._playButton.appendChild(img);
        this._playButton.onclick = this._handlePlayClick.bind(this);
    }

    setTitle(resources, element) {
        element.textContent = resources.name;
    }
}