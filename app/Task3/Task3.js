'use strict';

angular.module('myApp.Task3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Task3', {
            templateUrl: 'Task3/Task3.html',
            controller: 'CtrlT3'
        });
    }])

    .controller('CtrlT3', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        $scope.oldPassword = '';
        $scope.newPassword = '';
        $scope.reNewPassword = '';
        $scope.hasErrName = '';
        $scope.hasErrAge = '';
        $scope.hasErrGender = '';
        $scope.hasErrOldPass = '';
        $scope.hasErrNewPass = '';
        $scope.fieldPass = '';
        $scope.fieldNewPass = '';

        function getUser() {
            let params = {
                params: {
                    token: localStorage.getItem('userToken')
                }
            };
            $http.get('http://localhost:3000/api/users/', params)
                .then((resp) => {
                    $scope.currentUser = resp.data;
                    $scope.name = $scope.currentUser.name;
                    $scope.age = $scope.currentUser.age;
                    $scope.gender = $scope.currentUser.gender;
                    $rootScope.isUser = 'User';
                })
                .catch((err) => {
                    if (err.status === 401) {
                        refreshToken(getUser);
                    }

                    if (err.status === 403) {
                        localStorage.removeItem("userToken");
                        localStorage.removeItem("userRefreshToken");
                        localStorage.removeItem("UserRole");
                        $rootScope.isUser = '';
                        window.location.href = '#!/Task2';
                    }
                    if (err.status === 400){
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

                    $scope.token = localStorage.getItem('userToken');

                    request();

                })
                .catch((err) => {
                    console.log(err.data);
                    if (err.status === 403) {
                        localStorage.removeItem("userToken");
                        localStorage.removeItem("userRefreshToken");
                        localStorage.removeItem("UserRole");
                        $rootScope.isUser = '';
                        window.location.href = '#!/Task2';
                    }
                });

        }

        getUser();


        $scope.changeName = function () {
            let params = {
                params: {
                    token: localStorage.getItem('userToken')
                }
            };
            if ($scope.name !== '') {
                let name = $scope.currentUser.name;
                $scope.currentUser.name = $scope.name;
                $http.put("http://localhost:3000/api/users/change/", $scope.currentUser, params)
                    .then((resp) => {

                        $scope.gender = $scope.currentUser.gender;
                        $scope.age = $scope.currentUser.age;

                    })
                    .catch((err) => {

                        if (err.status === 401) {
                            refreshToken($scope.changeName);
                        }
                        if (err.status === 403) {
                            $scope.gender = $scope.currentUser.gender;
                            $scope.age = $scope.currentUser.age;
                            $scope.currentUser.name = name;
                            $scope.name = name;
                        }

                        console.log(err.data);


                    });

            } else {
                $scope.hasErrName = 'is-invalid';
            }
        };

        $scope.changeAge = function () {
            if ($scope.age !== '') {
                let params = {
                    params: {
                        token: localStorage.getItem('userToken')
                    }
                };
                let age = $scope.currentUser.age;
                $scope.currentUser.age = $scope.age;
                $http.put("http://localhost:3000/api/users/change/", $scope.currentUser, params)
                    .then((resp) => {


                        $scope.name = $scope.currentUser.name;
                        $scope.gender = $scope.currentUser.gender;

                    })
                    .catch((err) => {
                        if (err.status === 401) {
                            refreshToken($scope.changeAge);
                        }

                        if (err.status === 403) {
                            $scope.gender = $scope.currentUser.gender;
                            $scope.age = age;
                            $scope.currentUser.age = age;
                            $scope.name = $scope.currentUser.name;
                        }

                    });

            } else {
                $scope.hasErrAge = 'is-invalid';
            }
        };

        $scope.changeGender = function () {
            if ($scope.gender !== '') {
                let params = {
                    params: {
                        token: localStorage.getItem('userToken')
                    }
                };
                let gender = $scope.currentUser.gender;
                $scope.currentUser.gender = $scope.gender;
                $http.put("http://localhost:3000/api/users/change/", $scope.currentUser, params)
                    .then((resp) => {


                        $scope.name = $scope.currentUser.name;
                        $scope.age = $scope.currentUser.age;

                    })
                    .catch((err) => {

                        if (err.status === 401) {
                            refreshToken($scope.changeGender);
                        }

                        if (err.status === 403){
                            $scope.name = $scope.currentUser.name;
                            $scope.age = $scope.currentUser.age;
                            $scope.currentUser.gender = gender;
                            $scope.gender = gender;
                        }

                    });

            } else {
                $scope.hasErrGender = 'is-invalid';
            }
        };

        $scope.changePass = function () {

            if ($scope.newPassword !== $scope.reNewPassword) {
                $scope.fieldNewPass = "Passwords do not match";
                $scope.newPassword = '';
                $scope.reNewPassword = '';
                $scope.hasErrNewPass = 'is-invalid';
                return;
            }

            if ($scope.newPassword === '') {
                $scope.fieldNewPass = 'Enter a new password';
                $scope.hasErrNewPass = 'is-invalid';
                return;
            }


            let localObj = {};
            localObj.newPassword = $scope.newPassword;
            localObj.oldPassword = $scope.oldPassword;

            let params = {
                params: {
                    token: localStorage.getItem('userToken')
                }
            };

            $http.put("http://localhost:3000/api/users/changePassword/", localObj, params)
                .then((resp) => {

                    $scope.oldPassword = '';
                    $scope.newPassword = '';
                    $scope.reNewPassword = '';

                })
                .catch((err) => {

                    if (err.status === 401) {
                        return refreshToken($scope.changePass);
                    }

                    if (err.status === 403) {
                        $scope.fieldPass = err.data;
                        $scope.oldPassword = '';
                        $scope.newPassword = '';
                        $scope.reNewPassword = '';
                        $scope.hasErrOldPass = 'is-invalid';
                    }

                    if (err.status === 405){
                        alert("Password was not been changed");
                    }


                });


        };

        $scope.userDelete = function () {
            let request = confirm("Are you sure?");
            if (request) {
                let params = {
                    params: {
                        token: localStorage.getItem('userToken')
                    }
                };
                $http.delete("http://localhost:3000/api/users/", params)
                    .then((resp) => {
                        localStorage.removeItem("userToken");
                        localStorage.removeItem("userRefreshToken");
                        localStorage.removeItem("UserRole");
                        window.location.href = '#!/Task2';
                    })
                    .catch((err) => {

                        if (err.status === 401) {
                            refreshToken($scope.userDelete);
                        }

                        if(err.status === 403){
                            localStorage.removeItem("userToken");
                            localStorage.removeItem("userRefreshToken");
                            localStorage.removeItem("UserRole");
                            $rootScope.isUser = '';
                            window.location.href = '#!/Task2';
                        }

                        if(err.status === 405){
                            alert("Something went wrong, please try again");
                        }

                    });

            } else {
                alert("This is right mind");
            }
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
                    if(err.status === 403){
                        localStorage.removeItem("userToken");
                        localStorage.removeItem("userRefreshToken");
                        localStorage.removeItem("UserRole");
                        $rootScope.isUser = '';
                        window.location.href = '#!/Task2';
                    }
                });

        };

        $scope.validBack = function (i) {

            switch (i) {
                case '1':
                    $scope.hasErrName = '';
                    break;
                case '2':
                    $scope.hasErrAge = '';
                    break;
                case '3':
                    $scope.hasErrGender = '';
                    break;
                case '4':
                    $scope.hasErrOldPass = '';
                case '5':
                    $scope.hasErrNewPass = '';
                    break;
                default:
                    $scope.hasErrName = '';
                    $scope.hasErrAge = '';
                    $scope.hasErrGender = '';
                    $scope.hasErrOldPass = '';
                    $scope.hasErrNewPass = '';
            }

        };


    }])
;