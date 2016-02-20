module.exports  = function($stateProvider){
    //
    $stateProvider.state('guest.dashboard', {
        url: "/dashboard",
        views: {
            "center": {
                template: require("./html/template/guest/center.jade")
            }
        }
    });
    //
    $stateProvider.state('admin.dashboard', {
        url: "/dashboard",
        views: {
            "center": {
                template: require("./html/template/admin/center.jade")
            }
        }
    });
};