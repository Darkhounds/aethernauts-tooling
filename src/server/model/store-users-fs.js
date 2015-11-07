var mkdirp          = require('mkdirp');
var fs              = require('fs');
//
function Contructor(){
    var _self       = this;
    //
    this.folder     = "./";
    //
    this.get        = function(email, callback)                                                                         {
        var file        = _self.folder + "/" + email + ".json";
        mkdirp(_self.folder, function(err)                                                                              {
            if (err) return callback(err);
            //
            fs.readFile(file, function(err, data)                                                                       {
                if (err && err.code != 'ENOENT') return callback(err);
                //
                var user    = !err?JSON.parse(data):null;
                //
                callback(null, user);
            });
        });
    };
    //
    this.create     = function (email, profile, callback)                                                               {
        _self.get(email, function(err, user)                                                                            {
            if (err) return callback(err);
            if (user) return callback("exists");
            //
            mkdirp(_self.folder, function(err)                                                                          {
                if (err) return callback(err);
                //
                var file    = _self.folder + "/" + email + ".json";
                //
                fs.writeFile(file, JSON.stringify(profile),function(err)                                                {
                    if (err) return callback(err);
                    return callback(err, user);
                });
            });
        });
    };
}
//
module.exports = new Contructor();
