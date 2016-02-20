module.exports  = function($stateProvider) {
    $stateProvider.state('worlds', {
        url: "/worlds",
        views: {
            "center": {
                template: require("./html/template/center.jade"),
            }
        }
    });
};