var services = angular.module('services', [
  'ionic',
  'ngCordova',
  'authControllers',
  'authServices',
  'authRoutes',
  'businessControllers',
  'businessRoutes',
  'businessServices',
  'categoryControllers',
  'categoryServices',
  'categoryRoutes',
  'typeControllers',
  'typeServices',
  'typeRoutes',
  'serviceControllers',
  'serviceServices',
  'serviceRoutes',
  'servicesDirectives'
])

services.run(function($ionicPlatform, $rootScope, $state, $ionicHistory, $http) {
  $rootScope.version = 'http://development.';
  $rootScope.baseUrl = 'platxo-bi.appspot.com';
  // $rootScope.version = 'http://localhost';
  // $rootScope.baseUrl = ':8080';
  $http.defaults.headers.common['Authorization'] = 'JWT ' + JSON.parse(localStorage.getItem("token"));
  $rootScope.currentUser = JSON.parse(localStorage.getItem("user")) || '';
  $rootScope.currentEmployee = $rootScope.currentUser.employee || '';
  $rootScope.currentBusiness = JSON.parse(localStorage.getItem("business")) || '';

  $rootScope.logout = function() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('business');
    $http.defaults.headers.common['Authorization'] = undefined;
    $ionicHistory.clearCache().then(function() {
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
      $state.go('login');
    })
  };

  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// products.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = 'JWT ' + JSON.parse(localStorage.getItem("token"));
// }])
