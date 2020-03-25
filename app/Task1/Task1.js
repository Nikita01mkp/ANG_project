'use strict';

angular.module('myApp.Task1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Task1', {
            templateUrl: 'Task1/Task1.html',
            controller: 'CtrlT1'
        });
    }])

    .controller('CtrlT1', ['$scope', '$http', function ($scope, $http) {

        $scope.hasErrLog = '';
        $scope.hasErrPass = '';
        $scope.hasErrMail = '';
        $scope.login = '';
        $scope.password = '';
        $scope.rePassword = '';
        $scope.mail = '';
        $scope.myPoint = localStorage.getItem('Point');
        $scope.mas = [];
        $scope.old = '';
        $scope.name = '';
        $scope.InvFeedbackPass = "";
        $scope.subBtn = '';

        $scope.hashCode = function (s) {
            return s.split("").reduce(function (a, b) {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a
            }, 0);
        }

        $scope.send = function () {

            if (!($scope.login === '') && !($scope.password === '') && !($scope.rePassword === '') && !($scope.mail === '')) {
                if($scope.password === $scope.rePassword) {
                    $scope.subBtn = true;
                    let obj = {};
                    obj.userLogin = $scope.login;
                    obj.userPassword = $scope.password;
                    obj.userEmail = $scope.mail;
                    obj.userName = $scope.name;
                    obj.userAge = $scope.old;


                    $http.post( 'http://localhost:3000/api/users ', obj  )
                        .then((resp) => {
                            console.log("Success");
                        })
                        .catch((err)=>{
                            console.log("Ошибка отправки данных пользователя", err)
                        })
                    $scope.login = '';
                    $scope.password = '';
                    $scope.rePassword = '';
                    $scope.mail = '';
                    $scope.old = '';
                    $scope.name = '';
                    $scope.subBtn = false;

                }else {
                    $scope.InvFeedbackPass = 'Passwords do not match';
                    $scope.hasErrPass = 'is-invalid';
                    $scope.password = '';
                    $scope.rePassword = '';
                }

            } else {

                if ($scope.login === '') {
                    $scope.hasErrLog = 'is-invalid';
                }
                if (($scope.password === '') || !($scope.password === $scope.rePassword)) {
                    $scope.InvFeedbackPass = 'Obligatory field';
                    $scope.hasErrPass = 'is-invalid';
                }
                if ($scope.mail === '') {
                    $scope.hasErrMail = 'is-invalid';
                }
            }
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


    }]);