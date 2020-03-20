'use strict';

angular.module('myApp.Task3', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/Task3', {
            templateUrl: 'Task3/Task3.html',
            controller: 'CtrlT3'
        });
    }])

.controller('CtrlT3', [ '$scope', '$rootScope', function($scope, $rootScope) {

    $scope.myPoint = $rootScope.currentUserPoint;
    let currentUser = JSON.parse(localStorage.getItem($scope.myPoint));
    $scope.name = currentUser.userName;
    $scope.age = currentUser.userOld;
    $scope.gender = currentUser.userGender;
    $scope.oldPassword = '';
    $scope.newPassword = '';
    $scope.reNewPassword = '';
    $scope.hasErrName = '';
    $scope.hasErrAge = '';
    $scope.hasErrGender = '';
    $scope.hasErrOldPass = '';
    $scope.hasErrNewPass = '';

    $scope.hashCode = function (s) {
        return s.split("").reduce(function (a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a
        }, 0);
    }


    $scope.changeName = function () {
        if ($scope.name != '') {
            currentUser.userName = $scope.name;
            let obj = JSON.stringify(currentUser);
            localStorage.setItem($scope.myPoint, obj);
        } else {
            $scope.hasErrName = 'is-invalid';
        }
    }

    $scope.changeAge = function () {
        if ($scope.age != '') {
            currentUser.userOld = $scope.age;
            let obj = JSON.stringify(currentUser);
            localStorage.setItem($scope.myPoint, obj);
        } else {
            $scope.hasErrAge = 'is-invalid';
        }
    }

    $scope.changeGender = function () {
        if ($scope.gender != '') {
            currentUser.userGender = $scope.gender;
            let obj = JSON.stringify(currentUser);
            localStorage.setItem($scope.myPoint, obj);
        } else {
            $scope.hasErrGender = 'is-invalid';
        }
    }

    $scope.changePass = function () {

        if (($scope.hashCode($scope.oldPassword + currentUser.userEmail)) === currentUser.userPassword) {
            if ($scope.newPassword === $scope.reNewPassword) {
                if ($scope.newPassword != '') {
                    currentUser.userPassword = $scope.hashCode($scope.newPassword + currentUser.userEmail);
                    let obj = JSON.stringify(currentUser);
                    localStorage.setItem($scope.myPoint, obj);
                    alert("Success");
                    $scope.oldPassword = '';
                    $scope.newPassword = '';
                    $scope.reNewPassword = '';
                }else {
                    $scope.hasErrNewPass = 'is-invalid';
                    alert('Enter a new password')
                }
            } else {
                alert("Passwords do not match")
                $scope.newPassword = '';
                $scope.reNewPassword = '';
                $scope.hasErrNewPass = 'is-invalid';
            }

        } else {
            alert("Wrong password")
            $scope.oldPassword = '';
            $scope.newPassword = '';
            $scope.reNewPassword = '';
            $scope.hasErrOldPass = 'is-invalid';
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


}])