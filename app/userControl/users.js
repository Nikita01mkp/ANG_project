'use strict';

angular.module('myApp.Control', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/ControlUser', {
            templateUrl: 'userControl/users.html',
            controller: 'ControlUser'
        });
    }])


    .controller('ControlUser', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

        function getUsers() {

            $http.get('http://localhost:3000/api/control/users/' + localStorage.getItem('userToken'))
                .then((resp) => {

                    $rootScope.isUser = 'Admin';
                    $scope.usersData = resp.data;
                    $scope.userLogins = getUsersLogin();

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
        $scope.selectedUser = '0';
        $scope.selectedIndex = 0;

        function getUsersLogin() {
            const mas = [];
            for(let i = 0; i < $scope.usersData.length; i++){
                mas[i] = $scope.usersData[i].login;
            }
            return mas;
        }

        $scope.GetInd = function (i) {
            $scope.selectedIndex = i;
        };

        $scope.deleteUser = function () {
            let obj = {};
            obj._id = $scope.usersData[$scope.selectedIndex]._id;
            $http.post('http://localhost:3000/api/control/deleteUser/' + localStorage.getItem('userToken'), obj)
                .then((resp) => {
                    getUsers();
                    $scope.selectedIndex = 0;
                    $scope.selectedUser = '0';
                })
                .catch((err) => {
                    if (err.status === 401) {
                        refreshToken($scope.deleteUser);
                    }
                });

        };




    }]);