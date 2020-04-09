'use strict';

angular.module('myApp.Task3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Task3', {
            templateUrl: 'Task3/Task3.html',
            controller: 'CtrlT3'
        });
    }])

    .controller('CtrlT3', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        // let token = localStorage.getItem('userToken');
        // $scope.currentUser = {};
        // let someObj = {};
        // someObj.token = token;
        // console.log(someObj);

        function getUser() {
            let token = localStorage.getItem('userToken');

            $http.get('http://localhost:3000/api/users/' + token)
                .then((resp) => {
                    console.log("work");
                    console.log(resp.data);
                    $scope.currentUser = resp.data;
                    $scope.name = $scope.currentUser.name;
                    $scope.age = $scope.currentUser.age;
                    $scope.gender = $scope.currentUser.gender;
                    // $scope.currentUser._id = userId;
                })
                .catch((err) => {
                    if (err.status === 401) {
                        refreshToken(getUser);
                    }
                    console.log("token is dead");
                });
        }

        function refreshToken(request){

            let obj = {token: localStorage.getItem('userToken'), refreshToken: localStorage.getItem('userRefreshToken')};
            $http.post('http://localhost:3000/api/users/token/refresh', obj)
                .then((resp) =>{

                    localStorage.setItem("userToken", resp.data.token);
                    localStorage.setItem("userRefreshToken", resp.data.refreshToken);

                    console.log("userToken", resp.data.token);
                    console.log("userRefreshToken", resp.data.refreshToken);

                    request();

                })
                .catch((err) => {
                    console.log("Error");
                });

        }

        getUser();



        $scope.oldPassword = '';
        $scope.newPassword = '';
        $scope.reNewPassword = '';
        $scope.hasErrName = '';
        $scope.hasErrAge = '';
        $scope.hasErrGender = '';
        $scope.hasErrOldPass = '';
        $scope.hasErrNewPass = '';
        // $rootScope.fonOfbody = 'Task3/mood.jpg';


        $scope.changeName = function () {
            if ($scope.name !== '') {
                $scope.currentUser.name = $scope.name;
                $http.put("http://localhost:3000/api/users/change/" + token, $scope.currentUser)
                    .then((resp) => {

                        console.log("who is here");
                        $scope.gender = $scope.currentUser.gender;
                        $scope.age = $scope.currentUser.age;

                    })
                    .catch((err) => {

                        console.log(err);

                        console.log("Warning this is a mistake");

                    })

            } else {
                $scope.hasErrName = 'is-invalid';
            }
        }

        $scope.changeAge = function () {
            if ($scope.age != '') {
                $scope.currentUser.age = $scope.age;
                $http.put("http://localhost:3000/api/users/change/" + token, $scope.currentUser)
                    .then((resp) => {

                        console.log("who is here");
                        $scope.name = $scope.currentUser.name;
                        $scope.gender = $scope.currentUser.gender;

                    })
                    .catch((err) => {

                        console.log("Warning this is a mistake")

                    })

            } else {
                $scope.hasErrAge = 'is-invalid';
            }
        }

        $scope.changeGender = function () {
            if ($scope.gender != '') {

                $scope.currentUser.gender = $scope.gender;
                $http.put("http://localhost:3000/api/users/change/" + token, $scope.currentUser)
                    .then((resp) => {

                        console.log("who is here");
                        $scope.name = $scope.currentUser.name;
                        $scope.age = $scope.currentUser.age;

                    })
                    .catch((err) => {

                        console.log("Warning this is a mistake");

                    });

            } else {
                $scope.hasErrGender = 'is-invalid';
            }
        }

        $scope.changePass = function () {

            if ($scope.newPassword === $scope.reNewPassword) {
                if ($scope.newPassword != '') {

                    let localObj = {};
                    localObj.newPassword = $scope.newPassword;
                    localObj.oldPassword = $scope.oldPassword;

                    $http.put("http://localhost:3000/api/users/changePassword/" + token, localObj)
                        .then((resp) => {

                            console.log("change password log success");
                            $scope.oldPassword = '';
                            $scope.newPassword = '';
                            $scope.reNewPassword = '';

                        })
                        .catch((err) => {

                            console.log("Warning this is a mistake");
                            $scope.oldPassword = '';
                            $scope.newPassword = '';
                            $scope.reNewPassword = '';
                            $scope.hasErrOldPass = 'is-invalid';

                        });


                } else {
                    $scope.hasErrNewPass = 'is-invalid';
                    alert('Enter a new password')
                }
            } else {
                alert("Passwords do not match")
                $scope.newPassword = '';
                $scope.reNewPassword = '';
                $scope.hasErrNewPass = 'is-invalid';
            }


        }

        $scope.userDelete = function () {
            let request = confirm("Are you sure?");
            if (request) {
                console.log("User is dead");
                $http.delete("http://localhost:3000/api/users/" + token)
                    .then((resp) => {

                        console.log('delete user - success');

                    })
                    .catch((err) => {

                        console.log('delete user - something wrong');

                    });

            } else {
                alert("This is right mind");
            }
        }

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
            }

        };


    }]);