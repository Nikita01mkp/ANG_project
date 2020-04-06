'use strict';

angular.module('myApp.Task3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Task3', {
            templateUrl: 'Task3/Task3.html',
            controller: 'CtrlT3'
        });
    }])

    .controller('CtrlT3', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        let userId = '5e8b32db58e864334c050071';
        $scope.currentUser = {};
        $http.get('http://localhost:3000/api/users/' + userId)
            .then((resp) => {
                console.log("work");
                console.log(resp.data);
                $scope.currentUser = resp.data;
                $scope.name = $scope.currentUser.name;
                $scope.age = $scope.currentUser.age;
                $scope.gender = $scope.currentUser.gender;
                $scope.currentUser._id = userId;
            })
            .catch((err) => {
                console.log(err);
                console.log("ALAAARM ALAARM we all are died");
            });


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
            if ($scope.name != '') {
                $scope.currentUser.name = $scope.name;
                $http.put("http://localhost:3000/api/users/change", $scope.currentUser)
                    .then((resp) => {

                        console.log("who is here");

                    })
                    .catch((err) => {

                        console.log("Warning this is a mistake");

                })

            } else {
                $scope.hasErrName = 'is-invalid';
            }
        }

        $scope.changeAge = function () {
            if ($scope.age != '') {
                $scope.currentUser.age = $scope.age;
                $http.put("http://localhost:3000/api/users/change", $scope.currentUser)
                    .then((resp) => {

                        console.log("who is here");

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
                $http.put("http://localhost:3000/api/users/change", $scope.currentUser)
                    .then((resp) => {

                        console.log("who is here");

                    })
                    .catch((err) => {

                        console.log("Warning this is a mistake")

                    })

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
                        localObj.id = userId;


                        $http.put("http://localhost:3000/api/users/changePassword", localObj)
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

                            })



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

        }


    }]);