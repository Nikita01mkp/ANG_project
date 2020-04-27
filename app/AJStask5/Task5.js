'use strict';

angular.module('myApp.Task5', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Task5', {
            templateUrl: 'AJStask5/Task5.html',
            controller: 'CtrlT5'
        });
    }])


    .controller('CtrlT5', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {



        function getHomesName() {

            $http.get('http://localhost:3000/api/homes/list/' + localStorage.getItem('userToken'))
                .then((resp) => {

                    $scope.home = resp.data;
                    getRoomsName();
                    $scope.mas = $scope.arrofhm();
                    $scope.inputts5 = $scope.mas[$scope.selectedIndex];
                    $rootScope.isUser = 'User';

                })
                .catch((err) => {

                    if (err.status === 401) {
                        refreshToken(getHomesName);
                    }

                    if (err.status === 403) {
                        window.location.href = '#!/Task2';
                    }

                });
        }

        function getRoomsName() {

            let obj = {};
            obj.homeId = $scope.home[$scope.selectedIndex]._id;
            $http.post('http://localhost:3000/api/homes/rooms/' + localStorage.getItem('userToken'), obj)
                .then((resp) => {
                    $scope.room = resp.data;
                    $scope.masOfRooms = $scope.arrOfRoom();
                    $scope.roomNm = $scope.masOfRooms[$scope.selectedRoomIndex];


                })
                .catch((err) => {

                    if (err.status === 401) {
                        refreshToken(getRoomsName);
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

        getHomesName();


        $scope.arrofhm = function () { //возвращает массив с названием домов

            let arr = [];
            for (let i = 0; i < $scope.home.length; i++) {
                arr[i] = $scope.home[i].homeName;
            }
            return arr;

        }

        $scope.arrOfRoom = function () { //возвращает массив с названием комнат

            let arr1 = [];
            for (let i = 0; i < $scope.room.length; i++) {
                arr1[i] = $scope.room[i].roomName;
            }
            return arr1;

        };


        $scope.SelectedHome = '';
        $scope.SelectedRoom = '';
        $scope.selectedIndex = 0;
        $scope.selectedRoomIndex = 0;
        $scope.InvFeedBackRoom = '';
        $scope.InvFeedBackHome = '';

        $scope.GetInd = function (i) {
            $scope.inputts5 = $scope.mas[i];
            $scope.selectedIndex = i;
            $scope.masOfRooms = $scope.arrOfRoom(i);
            $scope.roomNm = $scope.masOfRooms[0];
            $scope.SelectedRoom = '0';
            $scope.selectedRoomIndex = 0;
            $scope.bkCol();
            $scope.backColRoom();
            getRoomsName();
        };

        $scope.GetIndRoom = function (i) {
            $scope.roomNm = $scope.masOfRooms[i];
            $scope.selectedRoomIndex = i;
            $scope.backColRoom();

        };


        $scope.Save = function () {

            if (($scope.inputts5 !== '') && ($scope.inputts5.replace(/\s+/g, '') !== 0)) {
                if ($scope.inputts5.length < 20) {
                    let obj = {};
                    obj.homeName = $scope.inputts5;
                    obj.homeId = $scope.home[$scope.selectedIndex]._id;
                    $http.post('http://localhost:3000/api/homes/updateHome/' + localStorage.getItem('userToken'), obj)
                        .then((resp) => {
                            getHomesName();
                        })
                        .catch((err) => {

                            if (err.status === 401) {
                                refreshToken($scope.Save);
                            }

                        });
                } else {
                    $scope.hasErrTS5 = 'has-errorts5';
                    $scope.hasErrBtn = 'has-errorts5';
                    $scope.InvFeedBackHome = "Name have to less than 20 symbols";
                }

            } else {
                $scope.hasErrTS5 = 'has-errorts5';
                $scope.hasErrBtn = 'has-errorts5';

            }

        }

        $scope.saveRoomName = function () {

            if (($scope.roomNm !== '') && ($scope.roomNm.replace(/\s+/g, '') !== 0)) {
                if ($scope.roomNm.length < 20) {
                    let obj = {};
                    obj.roomId = $scope.room[$scope.selectedRoomIndex]._id;
                    obj.roomName = $scope.roomNm;
                    $http.post('http://localhost:3000/api/homes/updateRoom/' + localStorage.getItem('userToken'), obj)
                        .then((resp) => {
                            getRoomsName();
                        })
                        .catch((err) => {
                            if (err.status === 401) {
                                refreshToken($scope.Save);
                            }
                        });
                } else {
                    $scope.hasErrRoom = 'has-errorts5';
                    $scope.InvFeedBackRoom = "Name have to less than 20 symbols";
                }
            } else {
                $scope.hasErrRoom = 'has-errorts5';

            }

        };


        $scope.bkCol = function () {
            $scope.hasErrTS5 = '';
            $scope.hasErrBtn = '';
            $scope.InvFeedBackHome = "";
        };

        $scope.backColRoom = function () {
            $scope.hasErrRoom = '';
            $scope.InvFeedBackRoom = "";
        };

        $scope.addHome = function () {
            if (($scope.inputts5 !== '') && ($scope.inputts5.replace(/\s+/g, '') !== 0)) {
                if ($scope.inputts5.length < 20) {
                    let obj = {};
                    obj.homeName = $scope.inputts5;
                    $http.post('http://localhost:3000/api/homes/addHome/' + localStorage.getItem('userToken'), obj)
                        .then((resp) => {
                            $scope.selectedIndex = $scope.home.length;
                            getHomesName();
                            $scope.SelectedHome = $scope.home.length.toString();
                        })
                        .catch((err) => {
                            if (err.status === 401) {
                                refreshToken($scope.addHome);
                            }
                        });
                } else {
                    $scope.hasErrTS5 = 'has-errorts5';
                    $scope.hasErrBtn = 'has-errorts5';
                    $scope.InvFeedBackHome = "Name have to less than 20 symbols";
                }

            } else {
                $scope.hasErrTS5 = 'has-errorts5';
                $scope.hasErrBtn = 'has-errorts5';

            }
        };

        $scope.addRoom = function () {
            if (($scope.roomNm !== '') && ($scope.roomNm.replace(/\s+/g, '') !== 0)) {
                if ($scope.roomNm.length < 20) {

                    let obj = {};
                    obj.roomName = $scope.roomNm;
                    obj.homeId = $scope.home[$scope.selectedIndex]._id;
                    $http.post('http://localhost:3000/api/homes/addRoom/' + localStorage.getItem('userToken'), obj)
                        .then((resp) => {
                            console.log("SUCCESS");
                            $scope.selectedRoomIndex = $scope.room.length;
                            $scope.SelectedRoom = $scope.room.length.toString();
                            getRoomsName();
                        })
                        .catch((err) => {
                            if (err.status === 401) {
                                refreshToken($scope.addRoom);
                            }
                        });
                } else {
                    $scope.hasErrRoom = 'has-errorts5';
                    $scope.InvFeedBackRoom = "Name have to less than 20 symbols";
                }
            } else {
                $scope.hasErrRoom = 'has-errorts5';

            }

        };

        $scope.deleteHome = function () {
            let obj = {};
            obj.homeId = $scope.home[$scope.selectedIndex]._id;
            $http.post('http://localhost:3000/api/homes/deleteHome/' + localStorage.getItem('userToken'), obj)
                .then((resp) => {
                    $scope.selectedIndex = 0;
                    $scope.selectedRoomIndex = 0;
                    $scope.SelectedHome = "0";
                    $scope.SelectedRoom = '0';
                    getHomesName();
                })
                .catch((err) => {
                    if (err.status === 401) {
                        refreshToken($scope.deleteHome);
                    }
                });

        };

        $scope.deleteRoom = function () {
            let obj = {};
            obj.roomId = $scope.room[$scope.selectedRoomIndex]._id;
            $http.post('http://localhost:3000/api/homes/deleteRoom/' + localStorage.getItem('userToken'), obj)
                .then((resp) => {
                    $scope.selectedRoomIndex = 0;
                    $scope.SelectedRoom = '0';
                    getRoomsName();
                })
                .catch((err) => {
                    if (err.status === 401) {
                        refreshToken($scope.deleteHome);
                    }
                });

        };

    }]);