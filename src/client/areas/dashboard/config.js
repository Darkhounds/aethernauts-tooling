module.exports  = function($stateProvider){
    $stateProvider.state('guest.dashboard', {
        url: "/dashboard",
        views: {
            "center@": {
                onEnter: function(){ console.log("Hummmm") },
                template: require("./html/template/guest/center.jade")
            }
        }
    });
    //
    $stateProvider.state('admin.dashboard', {
        url: "/dashboard",
        views: {
            "center@": {
                onEnter: function(){ console.log("Dooiiissss") },
                template: require("./html/template/admin/center.jade")
            }
        }
    });
};