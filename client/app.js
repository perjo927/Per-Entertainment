import { foo } from "./module";
import "./style.scss";

console.log(foo);

const host = "http://localhost:3000/"
const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};

// GET resources
fetch('http://localhost:3000/game/1', options)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        return {
            symbols: json.resources.symbols,
            button: json.resources.button,
            name: json.name
        }
    }).then((resources) => {

        let h1 = document.querySelector('h1');
        h1.textContent = resources.name;

        let resourceContainer = document.querySelector('.resources');

        for (let resource of resources.symbols) {
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
        fetch(`${host}${resources.button}`, options)
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



