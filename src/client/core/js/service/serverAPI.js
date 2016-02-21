module.exports  = function($http) {

    this.worldsGetList = function(callback) {
        // TODO: Remove this after the server api is implemented
        if (callback) callback({
            world1: _debugWorld(),
            world2: _debugWorld(),
            world3: _debugWorld(),
            world4: _debugWorld(),
            world5: _debugWorld()
        });

        // TODO: Uncomment this after the server api is implemented
        //$http({
        //    method: 'GET',
        //    url:    '/api/worlds/list'
        //}).then(function (response) {
        //    if (callback) callback(null, response.data);
        //}, function (err) {
        //    if (callback) callback(err, response);
        //});
    };

    this.worldsGetDetail = function(name, callback) {
        // TODO: Remove this after the server api is implemented
        if (callback) callback(_debugWorld());

        // TODO: Uncomment this after the server api is implemented
        //$http({
        //    method: 'GET',
        //    url:    '/api/worlds/detail?name=' + name
        //}).then(function (response) {
        //    if (callback) callback(null, response.data);
        //}, function (err) {
        //    if (callback) callback(err, response);
        //});
    };

    // TODO: Remove this after the server api implementation
    var _debugCount = 0;
    function _debugWorld(){
        _debugCount++;
        return {
            name: "Debug world " + _debugCount,
            description: "A debug world hardcoded into the worlds service classes with he sole purpose of testing the worlds list view",
            continents: {
                continent1: {
                    x:0, y:0,
                    name: "A Continent",
                    description: "A debug continent long description used only fr the sole purpose of testing the client view render",
                    assets: { map: "someDir/someFile.ext" },
                    regions: {
                        region1: {
                            x:0, y:0,
                            name: "A Region",
                            description: "A debug region long description used only fr the sole purpose of testing the client view render",
                            assets: { map: "someDir/someFile.ext" },
                            areas: {
                                x:0, y:0,
                                name: "An Area",
                                description: "A debug area long description used only fr the sole purpose of testing the client view render",
                                assets: { map: "someDir/someFile.ext" },
                                rooms: {
                                    x:0, y:0,
                                    name: "A Room",
                                    description: "A debug room long description used only fr the sole purpose of testing the client view render",
                                    assets: { map: "someDir/someFile.ext" },
                                    connections: {
                                        connection: [{
                                            type: "door",
                                            name: "A door",
                                            description: "A debug door long description used only fr the sole purpose of testing the client view render",
                                            coordinates: {continentX:0, continentY:0, regionX:0, regionY:0, areaX:0, areaY:0},
                                        }]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return this;
};