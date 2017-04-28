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
              // get OAUTH validation
              $http.get('https://dribbble.com/oauth/authorize?client_id=5a10d0527ddbef9cab8154a9af15bf3c86058d52639ddb19d1f7c44f887fbcd8&scope=public+write').then(function(response) {
                  // if validation return as true
                  // post a like
                  $http.post(apiURL + 'shots/' + shotID + '/like').then(function(response) {
                      //if the post get liked
                      //console.log(response.data);
                  }, function(response){
                      //if the post don't get liked
                      //console.log(response.statustext);
                  });
              }, function(response){
                  //if validation return a error
                  //console.log(response.statustext);
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