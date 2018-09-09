var app = angular.module('mainApp', []);
app.controller('MainController', function ($scope, $http) {
    console.log('reached main controller');

    $scope.shortenedUrl;
    refresh();
    $scope.shorten = function () {
        $http.post('/shorten', {
            target: $scope.target
        }).then(function (response) {
            refresh();
        }, function (err) {
            alert('Something went wrong, please contact administrator.')
        });
    };

    $scope.getUrlForHash = function (hash) {
        
        $http.get('/hash:' + hash).then(function (response) {
            console.log(response);
            window.open(response.data.docs.url, "_blank");
        }, function (err) {
            console.log(err);
        });

    };

    function refresh() {
        $http.get('/findAll').then(function (response) {
            $scope.shortenedUrl = response.data;
        }, function (err) {
            alert('Something went wrong, please contact administrator findAll.')
        });
    }
    
    

});
