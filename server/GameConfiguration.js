class GameConfiguration {

    _symbolsRange = 5;
    _columns = 3;
    _winTypes = [
            "No Win",
            "Small Win",
            "Big Win"
    ];

    constructor(id = null, resources = null) {
        if (id) {
            this._id = id;            
        } else {
            throw { name: "RequiredParameterException", message: "Must set game Id" };
        }

        if (resources) {
            this._resources = resources;            
        } else {
            throw { name: "RequiredParameterException", message: "Must provide resources" };
        }

        this._name = id;     
    }

    get columns () {
        return this._columns;
    }

    get id() {
        return this._id();
    }

    get name () {
        return this._name;
    }
    set name(name) {
        if (name) {
            this._name = name;
        }
    }

    get resources () {
        return this._resources;
    }
    
    get symbolsRange () {
        return this._symbolsRange;
    }

    get winTypes() {     
        return this._winTypes;        
    }
}

module.exports = GameConfiguration;