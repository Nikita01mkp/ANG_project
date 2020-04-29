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
                        $rootScope.isUser = false;
                        localStorage.setItem('UserRole', '');
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
                    console.log(err.data);
                    if (err.status === 403) {
                        $rootScope.isUser = '';
                        localStorage.setItem('UserRole', '');
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
                    }

                    $scope.oldPassword = '';
                    $scope.newPassword = '';
                    $scope.reNewPassword = '';
                    $scope.hasErrOldPass = 'is-invalid';

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
                            window.location.href = '#!/Task2';
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