var serviceServices = angular.module('serviceServices', ['ngResource']);

serviceServices.service('serviceService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var servicesUrl = '/api/services/';
  return $resource($rootScope.version + $rootScope.baseUrl + servicesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);

serviceServices.service('taxService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var taxUrl = '/api/taxes/';
  return $resource($rootScope.version + $rootScope.baseUrl + taxUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true},
  });
}]);
