'use strict';

angular.module('myApp.Task2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Task2', {
            templateUrl: 'Task2/Task2.html',
            controller: 'CtrlT2'
        });
    }])


    .controller('CtrlT2', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

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
        // $rootScope.fonOfbody = 'Task3/fon.jpg';


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


            if (!($scope.login === '') && !($scope.password === '')) {

                let obj = {};
                let tumb = false;
                obj.userLogin = $scope.login;
                obj.userPassword = $scope.password;

                $http.put('http://localhost:3000/api/users', obj)
                    .then((resp) => {
                        alert("Success");
                        console.log("Task2.js - It's work");
                    })
                    .catch((err) => {
                        console.log("Task2.js - It's not work");
                        if (err.status === 400) {
                            $scope.hasErrLog = 'is-invalid';
                            $scope.fieldLog = err.data;
                            $scope.password = '';
                        }
                        if (err.status === 401) {
                            $scope.hasErrPass = 'is-invalid';
                            $scope.fieldPass = err.data;
                            $scope.password = '';
                        }

                    })


            } else {

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



    }])