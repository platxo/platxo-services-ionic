var serviceControllers = angular.module('serviceControllers', []);

serviceControllers.controller('serviceController', [
  '$scope',
  '$stateParams',
  '$state',
  'serviceService',
  'categoryService',
  'typeService',
  '$ionicModal',
  function(
    $scope,
    $stateParams,
    $state,
    serviceService,
    categoryService,
    typeService,
    $ionicModal
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

    //Modal select category
    $ionicModal.fromTemplateUrl('templates/service/select-category.html', {
      scope: $scope,
      controller: 'serviceController',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    }).then(function(modal) {
      $scope.categoryModal = modal;
    });
    $scope.categoryOpenModal = function() {
      $scope.categoryModal.show();
    };
    $scope.categoryCloseModal = function() {
      $scope.categoryModal.hide();
    };
    // Cleanup the modal when we're done with it! detecta cambios
    $scope.$on('$destroy', function() {
      $scope.categoryModal.remove();
    });

    $scope.selectCategory = function(category) {
      $scope.service.category = category.name;
      $scope.service.service_category = category.url;
      $scope.categoryModal.hide();
    };

    //Modal select type
    $ionicModal.fromTemplateUrl('templates/service/select-type.html', {
      scope: $scope,
      controller: 'serviceController',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    }).then(function(modal) {
      $scope.typeModal = modal;
    });
    $scope.typeOpenModal = function() {
      $scope.typeModal.show();
    };
    $scope.typeCloseModal = function() {
      $scope.typeModal.hide();
    };
    // Cleanup the modal when we're done with it! detecta cambios
    $scope.$on('$destroy', function() {
      $scope.typeModal.remove();
    });

    $scope.selectType = function(type) {
      $scope.service.type = type.name;
      $scope.service.service_type = type.url;
      $scope.typeModal.hide();
    };

    $scope.$on('$stateChangeSuccess', function() {
      $scope.services = serviceService.list();
    })
  }
]);
