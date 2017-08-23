import { logger } from "./logger";

export class Ble {

    constructor(remoteEventType) {
        this.characteristic = undefined;
        this._init();
        this._eventType = 'characteristicvaluechanged';
        console.log(remoteEventType)
        this._remoteEventType = remoteEventType;
        console.log(this._remoteEventType)
    }

    _init() {
        document.querySelector('#start').addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            if (Ble.isWebBluetoothEnabled()) {
                this._start();
            }
        });
        document.querySelector('#stop').addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            if (Ble.isWebBluetoothEnabled()) {
                this._stop();
            }
        });
    }

    get eventType() {
        return this._eventType;
    }

    static isWebBluetoothEnabled() {
        if (navigator.bluetooth) {
            return true;
        } else {
            logger('Web Bluetooth API is not available.\n' +
                'Please make sure the "Experimental Web Platform features" flag is enabled.');
            return false;
        }
    }

    async _start() {

        const serviceUuid = "immediate_alert";
        const characteristicUuid = "alert_level";

        try {
            let options = {};
            options.filters = [{ services: [serviceUuid] }];

            const device = await navigator.bluetooth.requestDevice(options);
            const server = await device.gatt.connect();
            const service = await server.getPrimaryService(serviceUuid);
            this.characteristic = await service.getCharacteristic(characteristicUuid);
            await this.characteristic.startNotifications();

            logger('Notifications enabled');
            this.characteristic.addEventListener(this.eventType, this._handleNotifications);

        } catch (error) {
            logger(error);
        }
    }

    async _stop() {
        if (this.characteristic) {
            try {
                await this.characteristic.stopNotifications();
                logger('Notifications disabled');
                this.characteristic.removeEventListener(this.eventType, this._handleNotifications);
            } catch (error) {
                logger(error);
            }
        }
    }

    _handleNotifications(event) {
        const value = event.target.value;
        const uint8 = value.getUint8();
        logger(uint8);
        console.log(this._remoteEventType)
        document.dispatchEvent(new CustomEvent(this._remoteEventType, { "detail": "web bluetooth alert" }));
    }
}