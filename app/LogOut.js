// var app = angular.module('myApp', []);
// app.controller('myCtrl', function($scope, $http) {
// var menuLink = document.getElementById('someClick');
// menuLink.addEventListener('click', openMenu, false);
//
// function openMenu(e) {
//     let obj = {token: localStorage.getItem('userToken'), refreshToken: localStorage.getItem('userRefreshToken')};
//     $http.post('http://localhost:3000/api/users/token/delete', obj)
//         .then((resp) => {
//             localStorage.removeItem("userToken");
//             localStorage.removeItem("userRefreshToken");
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//
//
// }
// });