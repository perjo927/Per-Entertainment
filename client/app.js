import { foo } from "./module";

console.log(foo);

let images = {
    symbols: [],
    button: ""
};

let resourceContainer = document.querySelector('.resources');

const host = "http://localhost:3000/"
const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};

fetch('http://localhost:3000/game/1', options)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        images.symbols = json.resources.symbols;
        images.button = json.resources.button;
    }).then(() => {
        for (let resource of images.symbols) {
            fetch(`${host}${resource}`, options)
                .then(function (response) {
                    return response.blob();
                })
                .then(function (imgBlob) {
                    const objectURL = URL.createObjectURL(imgBlob);
                    let img = document.createElement("img");
                    img.src = objectURL;
                    resourceContainer.appendChild(img);
                });
        }
        fetch(`${host}${images.button}`, options)
            .then(function (response) {
                return response.blob();
            })
            .then(function (imgBlob) {
                const objectURL = URL.createObjectURL(imgBlob);
                let img = document.createElement("img");
                img.src = objectURL;
                resourceContainer.appendChild(img);
            });

    });



fetch('http://localhost:3000/game/1/newround', options)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        console.log(json)
    });



