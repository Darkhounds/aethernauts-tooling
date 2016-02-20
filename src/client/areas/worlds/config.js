module.exports  = function($stateProvider) {
    $stateProvider.state('admin.worlds', {
        url: "/worlds",
        views: {
            "center": {
                template: require("./html/template/center.jade")
            }
        }
    });
};