var serviceRoutes = angular.module('serviceRoutes', []);

serviceRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
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

  $urlRouterProvider.otherwise('/tab/service-list');

}]);
