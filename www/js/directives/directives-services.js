var servicesDirectives = angular.module('servicesDirectives', []);

servicesDirectives.directive('menuDirective',[
  '$ionicPopover',
  function(
    $ionicPopover
  )
  {
    return {
        restrict:'E',
        replace: true,
        template: '<button ng-click="openMenu($event)" class="button icon ion-android-more-vertical"></button>',
        link:function($scope, $element, $attrs){

          $ionicPopover.fromTemplateUrl('templates/partials/menu.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });

          $scope.openMenu = function($event) {
            $scope.popover.show($event);
          };

          $scope.closeMenu = function() {
            $scope.popover.hide();
          };


        }
    };
  }
]);

servicesDirectives.directive('searchDirective', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/partials/search.html'
  }
})

servicesDirectives.directive('expiredDirective', [ '$ionicPopup', '$rootScope', '$location', function ($ionicPopup, $rootScope, $location) {
  return {
    restrict: 'E',
    controller: function ($scope) {
      $scope.showAlertExpired = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Expired Session!',
          template: 'Login Please'
        });

        alertPopup.then(function(res) {

          $location.path('/login');
        })
      }
    }
  }
}])

servicesDirectives.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value);
      });
    }
  };
});
