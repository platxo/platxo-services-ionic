var serviceControllers = angular.module('serviceControllers', []);

serviceControllers.controller('serviceController', [
  '$scope',
  '$stateParams',
  '$state',
  'serviceService',
  'categoryService',
  'typeService',
  function(
    $scope,
    $stateParams,
    $state,
    serviceService,
    categoryService,
    typeService
  )
  {
    $scope.services = serviceService.list();
    $scope.service = serviceService.detail({id: $stateParams.id});
    $scope.categories = categoryService.list();
    $scope.types = typeService.list();

    $scope.create = function () {
      serviceService.create($scope.service);
      $scope.services = serviceService.list();
      $state.go('tab.service-list');
    }

    $scope.update = function () {
      serviceService.update($scope.service);
      $scope.services = serviceService.list();
      $state.go('tab.service-list');
    }

    $scope.delete = function () {
      serviceService.delete($scope.service);
      $scope.services = serviceService.list();
      $state.go('tab.service-list');
    }

    $scope.cancel = function () {
      $state.go('tab.service-list');
    }

    $scope.$on('$stateChangeSuccess', function() {
      $scope.services = serviceService.list();
    })
  }
]);
