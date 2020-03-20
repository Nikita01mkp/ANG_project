'use strict';

angular.module('myApp.Task2', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/Task2', {
            templateUrl: 'Task2/Task2.html',
            controller: 'CtrlT2'
        });
    }])


.controller('CtrlT2', [ '$scope', '$rootScope', function($scope, $rootScope) {

    $scope.hasErrLog = '';
    $scope.hasErrPass = '';
    $scope.login = '';
    $scope.password = '';
    $scope.mail = '';
    $scope.mas = [];
    $scope.myPoint = '';
    $scope.fieldLog = '';
    $scope.fieldPass = '';
    $scope.currenctPoin = localStorage.getItem('Point');

    $scope.hashCode = function(s){
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    }

    $scope.validBack = function (i) {

        switch (i) {
            case '1':
                $scope.hasErrLog = '';
                break;
            case '2':
                $scope.hasErrPass = '';
                break;
            case '3':
                $scope.hasErrMail = '';
        }

    }

    $scope.comeIn = function () {


        if(!($scope.login === '') && !($scope.password === '')){
            let i = 0;
            for(i = 0; i < ($scope.currenctPoin); i++){
                $scope.mas[i] = JSON.parse(localStorage.getItem(i));
                if($scope.login === $scope.mas[i].userLogin){
                    $scope.comparePass(i);
                    break;
                }
            }
            if(i == ($scope.currenctPoin)){
                $scope.hasErrLog = 'is-invalid';
                $scope.fieldLog = 'Wrong Login or user does not exist';
                $scope.password = ''
            }

        }else {

            if ($scope.login === '') {
                $scope.hasErrLog = 'is-invalid';
                $scope.fieldLog = 'Obligatory field'
            }
            if (($scope.password === '') || !($scope.password === $scope.rePassword)) {
                $scope.hasErrPass = 'is-invalid';
                $scope.fieldPass = 'Obligatory field'
            }
        }
    }

    $scope.comparePass = function (key) {


        let myObj = JSON.parse(localStorage.getItem(key));
        let saltPass = $scope.password + myObj.userEmail;
        let hashPass = $scope.hashCode(saltPass);
        if (hashPass === myObj.userPassword){
            alert("Welcome!");// реализовать переход по ссылке вместо приветствие
            $rootScope.currentUserPoint = key;
        } else{
            $scope.password = '';
            $scope.fieldPass = 'Wrong password'
            $scope.hasErrPass = 'is-invalid';
        }

    }


}])