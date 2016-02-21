module.exports  = function(serverAPI) {
    var _list = {};
    Object.defineProperty(this, 'list', {get: function() {return _list; }});

    var _selected = null;
    Object.defineProperty(this, 'selected', {get: function() {return _selected; }});

    this.listWorlds = function(callback, overrideUpdate) {
        serverAPI.worldsGetList(function(err, data){
            console.log("", data);
            _parseListData(data);
        });
    };

    this.getWorld = function(name, callback) {
        serverAPI.worldsGetDetail(name, function(err, data){
            _world = data;
        });
    };

    function _parseListData(worldsData) {
        _addWorlds(worldsData);
        _cleaRemovedWorlds(worldsData);
    }

    function _addWorlds(worldsData) {
        for (var name in worldsData) _list[name] = worldsData[name];
    }

    function _cleaRemovedWorlds(worldsData) {
        for (var name in _list) if (!worldsData[name]) delete _list[name];
    }

    this.listWorlds();
    return this;
};