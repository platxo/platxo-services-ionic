var servicesRoutes = angular.module('servicesRoutes', []);

servicesRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    // Products
    .state('tab.service-list', {
      url: '/service-list',
      views: {
        'tab-services': {
          templateUrl: 'templates/service/service-list.html',
          controller: 'serviceController'
        }
      }
    })
    .state('tab.service-detail', {
      url: '/service-detail/:id',
      views: {
        'tab-services': {
          templateUrl: 'templates/service/service-detail.html',
          controller: 'serviceController'
        }
      }
    })
    .state('tab.service-create', {
      url: '/service-create',
      views: {
        'tab-services': {
          templateUrl: 'templates/service/service-create.html',
          controller: 'serviceController'
        }
      }
    })
    .state('tab.service-update', {
      url: '/service-update/:id',
      views: {
        'tab-services': {
          templateUrl: 'templates/service/service-update.html',
          controller: 'serviceController'
        }
      }
    })
    .state('tab.service-delete', {
      url: '/service-delete/:id',
      views: {
        'tab-services': {
          templateUrl: 'templates/service/service-delete.html',
          controller: 'serviceController'
        }
      }
    })

    // Categories
    .state('tab.category-list', {
      url: '/category-list',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-list.html',
          controller: 'categoryController'
        }
      }
    })
    .state('tab.category-detail', {
      url: '/category-detail/:id',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-detail.html',
          controller: 'categoryController'
        }
      }
    })
    .state('tab.category-create', {
      url: '/category-create',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-create.html',
          controller: 'categoryController'
        }
      }
    })
    .state('tab.category-update', {
      url: '/category-update/:id',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-update.html',
          controller: 'categoryController'
        }
      }
    })
    .state('tab.category-delete', {
      url: '/category-delete/:id',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-delete.html',
          controller: 'categoryController'
        }
      }
    })

    // Types
    .state('tab.type-list', {
      url: '/type-list',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-list.html',
          controller: 'typeController'
        }
      }
    })
    .state('tab.type-detail', {
      url: '/type-detail/:id',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-detail.html',
          controller: 'typeController'
        }
      }
    })
    .state('tab.type-create', {
      url: '/type-create',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-create.html',
          controller: 'typeController'
        }
      }
    })
    .state('tab.type-update', {
      url: '/type-update/:id',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-update.html',
          controller: 'typeController'
        }
      }
    })
    .state('tab.type-delete', {
      url: '/type-delete/:id',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-delete.html',
          controller: 'typeController'
        }
      }
    })

  $urlRouterProvider.otherwise('/tab/service-list');

}]);
