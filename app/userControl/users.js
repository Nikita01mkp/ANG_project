'use strict';

angular.module('myApp.Control', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/ControlUser', {
            templateUrl: 'userControl/users.html',
            controller: 'ControlUser'
        });
    }])


    .controller('ControlUser', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

        $scope.selectedUser = '0';
        $scope.selectedIndex = 0;

        function getUsers() {

            let params = {
                params: {
                    token: localStorage.getItem('userToken')
                }
            };

            $http.get('http://localhost:3000/api/control/users/', params)
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
                        window.location.href = '#!/Task3';
                    }

                    if (err.status === 405) {
                        localStorage.removeItem("userToken");
                        localStorage.removeItem("userRefreshToken");
                        localStorage.removeItem("UserRole");
                        $rootScope.isUser = '';
                        window.location.href = '#!/Task2';
                    }

                    if(err.status === 404){
                        alert(err.data);
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
                    $rootScope.isUser = 'Admin';
                    $scope.token = localStorage.getItem('userToken');

                    request();

                })
                .catch((err) => {

                    if(err.status === 403){
                        localStorage.removeItem("userToken");
                        localStorage.removeItem("userRefreshToken");
                        localStorage.removeItem("UserRole");
                        $rootScope.isUser = '';
                        window.location.href = '#!/Task2';
                    }
                });

        }
        getUsers();


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
            let params = {
                params: {
                    token: localStorage.getItem('userToken'),
                    _id: $scope.usersData[$scope.selectedIndex]._id,
                }
            };
            $http.delete('http://localhost:3000/api/control/user/', params)
                .then((resp) => {
                    $scope.selectedIndex = 0;
                    $scope.SelectedUser = '0';
                    getUsers();
                })
                .catch((err) => {
                    if (err.status === 401) {
                        refreshToken($scope.deleteUser);
                    }

                    if (err.status === 403) {
                        window.location.href = '#!/Task3';
                    }

                    if (err.status === 405) {
                        localStorage.removeItem("userToken");
                        localStorage.removeItem("userRefreshToken");
                        localStorage.removeItem("UserRole");
                        $rootScope.isUser = '';
                        window.location.href = '#!/Task2';
                    }

                    if(err.status === 404){
                        alert(err.data);
                    }

                });

        };

        $rootScope.userLogout = function () {

            let obj = {
                token: localStorage.getItem('userToken'),
                refreshToken: localStorage.getItem('userRefreshToken')
            };
            $http.post('http://localhost:3000/api/users/token/delete', obj)
                .then((resp) => {
                    localStorage.removeItem("userToken");
                    localStorage.removeItem("userRefreshToken");
                    localStorage.removeItem("UserRole");
                    $rootScope.isUser = '';
                    window.location.href = '#!/Task2';
                })
                .catch((err) => {
                    console.log(err.data);
                });

        };




    }]);