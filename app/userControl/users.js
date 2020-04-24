'use strict';

angular.module('myApp.Control', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Control', {
            templateUrl: 'userControl/users.html',
            controller: 'ControlUser'
        });
    }])


    .controller('Control', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

        function getUsers() {
            console.log("alarm");

            $http.get('http://localhost:3000/api/control/users/' + localStorage.getItem('userToken'))
                .then((resp) => {


                })
                .catch((err) => {

                    if (err.status === 401) {
                        refreshToken(getUsers);
                    }

                    if (err.status === 403) {
                        window.location.href = '#!/Task2';
                    }

                });
        }

        function refreshToken(request) {

            let obj = {
                token: localStorage.getItem('userToken'),
                refreshToken: localStorage.getItem('userRefreshToken')
            };
            $http.post('http://localhost:3000/api/users/token/refresh', obj)
                .then((resp) => {

                    localStorage.setItem("userToken", resp.data.token);
                    localStorage.setItem("userRefreshToken", resp.data.refreshToken);

                    $scope.token = localStorage.getItem('userToken');

                    request();

                })
                .catch((err) => {
                    console.log(err);
                });

        }
        getUsers();

    }]);