/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return foo; });
const foo = "fooo";



/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_scss__);



console.log(__WEBPACK_IMPORTED_MODULE_0__module__["a" /* foo */]);

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





/***/ })
/******/ ]);