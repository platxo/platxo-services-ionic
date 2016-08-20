var servicesControllers = angular.module('servicesControllers', []);

servicesControllers.controller('serviceController', [
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

servicesControllers.controller('categoryController', [
  '$scope',
  '$stateParams',
  '$state',
  'categoryService',
  function(
    $scope,
    $stateParams,
    $state,
    categoryService
  )
  {
      $scope.categories = categoryService.list();
      $scope.category = categoryService.detail({id: $stateParams.id});
      $scope.create = function () {
        categoryService.create($scope.category);
        $scope.categories = categoryService.list();
        $state.go('tab.category-list');
      }

      $scope.update = function () {
        categoryService.update($scope.category);
        $scope.categories = categoryService.list();
        $state.go('tab.category-list');
      }

      $scope.delete = function () {
        categoryService.delete($scope.category);
        $scope.categories = categoryService.list();
        $state.go('tab.category-list');
      }

      $scope.cancel = function () {
        $state.go('tab.category-list');
      }

      $scope.$on('$stateChangeSuccess', function() {
        $scope.categories = categoryService.list();
      })

    }
]);

servicesControllers.controller('typeController', [
  '$scope',
  '$stateParams',
  '$state',
  'typeService',
  'categoryService',
  function(
    $scope,
    $stateParams,
    $state,
    typeService,
    categoryService
  )
  {
      $scope.types = typeService.list();
      $scope.type = typeService.detail({id: $stateParams.id});
      $scope.categories = categoryService.list();

      $scope.create = function () {
        typeService.create($scope.type);
        $scope.types = typeService.list();
        $state.go('tab.type-list');
      }

      $scope.update = function () {
        typeService.update($scope.type);
        $scope.types = typeService.list();
        $state.go('tab.type-list');
      }

      $scope.delete = function () {
        typeService.delete($scope.type);
        $scope.types = typeService.list();
        $state.go('tab.type-list');
      }

      $scope.cancel = function () {
        $state.go('tab.type-list');
      }

      $scope.$on('$stateChangeSuccess', function() {
        $scope.types = typeService.list();
      })

    }
]);
