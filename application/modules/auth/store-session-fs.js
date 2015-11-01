var util            = require('util');
var Store           = require("express-session").Store
var mkdirp          = require('mkdirp');
var fs              = require('fs');
//
function Contructor(){
    Store.call(this);
    //
    var _self       = this;
    //
    this.folder     = "./";
    //
    this.all        = function(callback)                                                                                {
        var sessions = [];
        //
        mkdirp(_self.folder, function(err)                                                                              {
            if (err) return callback(err);
            fs.readdir(_self.folder, function(err, files)                                                               {
                if (err) return callback(err);
                var count = 0;
                for (var i in files) fs.readFile(files[i], function(err, data)                                          {
                    if (err) return callback(err);
                    //
                    sessions.push(JSON.parse(data));
                    //
                    if (++count >= files.length) callback(null, sessions);
                })
            });
        });
    };
    //
    this.destroy    = function(sid, callback)                                                                           {
        var file = _self.folder + "/" + sid;
        mkdirp(_self.folder, function(err)                                                                              {
            if (err) return callback(err);
            fs.unlink(file, function(err) { return callback(err);                                                       });
        });
    };
    //
    this.clear      = function(callback)                                                                                {
        mkdirp(_self.folder, function(err)                                                                              {
            if (err) return callback(err);
            fs.readdir(_self.folder, function(err, files)                                                               {
                if (err) return callback(err);
                var count = 0;
                for (var i in files) fs.unlink(files[i], function(err, data)                                            {
                    if (err) return callback(err);
                    else if (++count >= files.length) callback(null);
                })
            });
        });
    };
    //
    this.length     = function(callback)                                                                                {
        mkdirp(_self.folder, function(err)                                                                              {
            if (err) return callback(err);
            fs.readdir(_self.folder, function(err, files)                                                               {
                return callback(err, files?files.length:0);
            });
        });
    };
    //
    this.get        = function(sid, callback)                                                                           {
        var file = _self.folder + "/" + sid;
        mkdirp(_self.folder, function(err)                                                                              {
            if (err) return callback(err);
            fs.readFile(file, function(err, data)                                                                       {
                if (err) return callback(err);
                else return callback(null, JSON.parse(data));
            });
        });
    };
    //
    this.set        = function(sid, session, callback)                                                                  {
        var file = _self.folder + "/" + sid;
        //
        mkdirp(_self.folder, function(err)                                                                              {
            if (err) return callback(err);
            fs.writeFile(file, JSON.stringify(session),function(err)                                                    {
                return callback(err);
            });
        });
    };
};
//
util.inherits(Contructor, Store);
//
module.exports = new Contructor();
