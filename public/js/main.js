    'use strict';
    // set app
    var app = angular.module('jobbble', []);

    // main controller
    app.controller('shotsController', function($scope, $http) {
      // set authorization to headers
      $http.defaults.headers.common['Authorization'] = 'Bearer a33efd0686dd49a3250322b17b2d73a3e8e9c585387321955ec0aebe0135c3a7';
      
      // api url
      var apiURL = 'https://api.dribbble.com/v1/';

      // get shots from api
      $http.get(apiURL + 'shots').then(function(response) {
          $scope.shots = response.data;
      });

      // when a shot details is opened
      $scope.openShot = function(shotID){
          // get details info
          $http.get(apiURL + 'shots/' + shotID).then(function(response) {
              $scope.shotDetails = response.data;

              // check if shot is already liked
              $http.get(apiURL + 'shots/' + shotID + '/like').then(function(response) {
                  // if it's already liked
                  $scope.shotDetails.like = response.data;
                  $scope.shotDetails.button = 'Liked';
              }, function(){
                  // if it's not already liked
                  $scope.shotDetails.button = 'Like';
                  return false
              });
          });
          // when user like a shot
          $scope.likeShot = function(){
              // get the code in url
              var query = window.location.search.substring(1);
              var vars = query.split("&");
              for (var i=0;i<vars.length;i++) {
                  var pair = vars[i].split("=");
                  if(pair[0] == 'code'){var code = pair[1];}
              }
              console.log(code);
              // get OAUTH validation
              $http.get('https://dribbble.com/oauth/authorize?client_id=5a10d0527ddbef9cab8154a9af15bf3c86058d52639ddb19d1f7c44f887fbcd8&client_secret=c1b2c59d7c446768959fecdc232bd85ebc1cc72081b2e762ded8e51e25cf6e2f&code='+ code).then(function(response) {
                  console.log(response.data);
                  // post a like
                  $http.post(apiURL + 'shots/' + shotID + '/like').then(function(response) {
                      //if the post get liked
                      console.log(response.data);
                  }, function(response){
                      //if the post don't get liked
                      console.log(response.statustext);
                  });
              }, function(response){
                  console.log(response.statustext);
              });
          }
      }
    });
    // filter to remove html tags
    app.filter('htmlToPlaintext', function() {
        return function(text) {
            return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
      }
    );