var categoryControllers = angular.module('categoryControllers', []);

categoryControllers.controller('categoryController', [
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
