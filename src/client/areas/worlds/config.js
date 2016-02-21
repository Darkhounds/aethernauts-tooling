module.exports  = function($stateProvider) {
    $stateProvider.state('admin.worlds', {
        url: "/worlds",
        views: {
            "center@": {
                onEnter: function(){ console.log("Hummmm....") },
                template: require("./html/template/list.jade")
            }
        }
    });
};