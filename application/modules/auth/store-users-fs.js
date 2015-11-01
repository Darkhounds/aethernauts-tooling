var mkdirp          = require('mkdirp');
var fs              = require('fs');
var bcrypt          = require('bcrypt-nodejs');
//
function Contructor(){
    var _self       = this;
    //
    this.folder     = "./";
    //
    this.get        = function(email, callback)                                                                         {
        var file = _self.folder + "/" + email;
        mkdirp(_self.folder, function(err)                                                                              {
            if (err) return callback(err);
            fs.readFile(file, function(err, data)                                                                       {
                if (err) return callback(err);
                else return callback(null, JSON.parse(data));
            });
        });
    };
    //
    this.create = function (email, password, token, name, callback){
        _self.get(email, function(err, user)                                                                            {
            if (err) return callback(err);
            else if (user) return callback("exists");
            else _createUser(email, password, token, name, function(err, user)                                          {
                if (err) return callback(err);
                var file = _self.folder + "/" + email;
                //
                mkdirp(_self.folder, function(err)                                                                      {
                    if (err) return callback(err);
                    fs.writeFile(file, JSON.stringify(user),function(err)                                               {
                        if (err) return callback(err);
                        return callback(err, user);
                    });
                });
            });
        });
    };
    //
    this.validate = function (email, password, callback)                                                                {
        _self.get(email, function(err, user)                                                                            {
            if (err) return callback(err);
            else if (!user) return callback("notfound");
            else _validPassword(password, user.password, function(err, valid)                                           {
                if (err) return callback(err);
                callback(valid?user:false)
            });
        });
    };
    //
    function _createUser(email, password, token, name, callback)                                                        {
        _generateHash(password, function(err, res){
            if (err) return callback(err);
            //
            callback(null, {
                email:  email,
                password: res,
                token: token,
                name: name
            });
        });
    }
    //
    function _generateHash(password, callback)                                                                          {
        bcrypt.genSalt(8, function(err, res){
            if (err) return callback(err);
            bcrypt.hash(password, res, null, function(err, data){
                if (err) return callback(err);
                callback(null, data);
            });
        });
    }
    //
    function _validPassword(password, hash, callback)                                                                   {
        bcrypt.compare(password, hash, function(err, res){
            if (err) callback(err);
            callback(null, res);
        });
    }
}
//
module.exports = new Contructor();
