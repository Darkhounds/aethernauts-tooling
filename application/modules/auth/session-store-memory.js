var util            = require('util');
var Store           = require("express-session").Store
//
function Contructor(){
    Store.call(this);
    //
    var _sessions   = {};
    var _self       = this;
    //
    this.all        = function(callback)                                                                                {
        var sessions = [];
        //
        for (var i in _sessions) sessions.push(_sessions[i].data);
        //
        callback(null, _sessions);
    };
    //
    this.destroy    = function(sid, callback)                                                                           {
        _sessions[i] = undefined;
        delete _sessions[i];
        //
        callback(null);
    };
    //
    this.clear      = function(callback)                                                                                {
        for (var i in _sessions)                                                                                        {
            _sessions[i] = undefined;
            delete _sessions[i];
        }
        //
        callback(null)
    };
    //
    this.length     = function(callback)                                                                                {
        var length = 0;
        //
        for (var i in _sessions) length++;
        //
        callback(null, length)
    };
    //
    this.get        = function(sid, callback)                                                                           {
        var session = _sessions[sid];
        //
        callback(null, session?session.data:null);
    };
    //
    this.set        = function(sid, session, callback)                                                                  {
        var timestamp = new Date().getTime();
        //
        _sessions[sid] = {data: session, created: timestamp, updated: timestamp};
        //
        callback(null);
    };
    //
    this.touch      = function(sid, session, callback)                                                                  {
        if (!_sessions[sid]) return callback(new Error('sid not found'));
        //
        _sessions[sid].updated = new Date().getTime();
        //
        callback(null);
    };
};
//
util.inherits(Contructor, Store);
//
module.exports = new Contructor();
