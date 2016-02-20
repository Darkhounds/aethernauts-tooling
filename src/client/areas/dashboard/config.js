module.exports  = function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/dashboard");
    //
    $stateProvider.state('dashboard', {
        url: "/dashboard",
        views: {
            "center": {
                template: require("./html/template/center.jade"),
            }
        }
    });
};