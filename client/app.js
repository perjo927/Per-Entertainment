import { foo } from "./module";

console.log("foo", foo)

let myImage = document.querySelector('img');

let options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};

fetch('http://localhost:3000/game/1', options)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (json) {
        console.log(json)
    });


fetch('http://localhost:3000/game/1/newround', options)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (json) {
        console.log(json)
    });


fetch('http://localhost:3000/images/0.jpg', options)
    .then(function (response) {
        console.log(response)
        return response.blob();
    })
    .then(function (myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        myImage.src = objectURL;
    });
