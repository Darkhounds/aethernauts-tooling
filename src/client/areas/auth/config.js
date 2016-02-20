module.exports  = function($stateProvider) {
    $stateProvider.state("guest", {
        url: "/guest",
        views: {
            "auth": {
                template: require("./html/template/login.jade"),
                controller: ["$scope", "$window", "session", require("./js/controller/login")]
            }
        }
    });
    $stateProvider.state("admin", {
        url: "/admin",
        views: {
            "auth": {
                template: require("./html/template/logout.jade"),
                controller: ["$scope", "session", require("./js/controller/logout")]
            }
        }
    });
};