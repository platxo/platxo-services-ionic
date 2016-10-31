var serviceControllers = angular.module('serviceControllers', []);

serviceControllers.controller('serviceListCtrl', [
  '$scope',
  '$state',
  '$location',
  '$ionicLoading',
  '$ionicTabsDelegate',
  '$ionicActionSheet',
  'serviceService',
  function(
    $scope,
    $state,
    $location,
    $ionicLoading,
    $ionicTabsDelegate,
    $ionicActionSheet,
    serviceService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    serviceService.list()
      .$promise
        .then(function (res) {
          $scope.services = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          if (err.data.detail === "Signature has expired.") {
            $scope.showAlertExpired()
          }
      })

    $scope.refresh = function () {
      serviceService.list()
        .$promise
          .then(function (res) {
            $scope.services = res
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
          }, function (err) {
            $ionicLoading.hide();
            if (err.data.detail === "Signature has expired.") {
              $scope.showAlertExpired()
            }
          })
    }

    $scope.loadMore = function() {
      serviceService.list()
        .$promise
          .then(function (res) {
            $scope.services = res
            $ionicLoading.hide();
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, function (err) {
            $ionicLoading.hide();
            if (err.data.detail === "Signature has expired.") {
              $scope.showAlertExpired()
            }
          })
  	}

    $scope.goForward = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    }

    $scope.goBack = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    }

    $scope.showActionsheet = function(service) {
      $ionicActionSheet.show({
        buttons: [
          { text: 'Update <i class="icon ion-edit"></i>' },
          { text: 'Delete <i class="icon ion-android-delete"></i>' },
        ],
        buttonClicked: function(index) {
          if (index == 0) {
            $state.go('tab.service-update', {id:service.id});
          } else {
            $state.go('tab.service-delete', {id:service.id});
          }
          return true;
        },
      });
    };

	  $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'tab.service-list') {
        serviceService.list()
          .$promise
            .then(function (res) {
              $scope.services = res
              $ionicLoading.hide();
            }, function (err) {
              $ionicLoading.hide();
              if (err.data.detail === "Signature has expired.") {
                $scope.showAlertExpired()
              }
            })
      }
	  })

	}
]);

serviceControllers.controller('serviceDetailCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  'serviceService',
  function(
    $scope,
    $stateParams,
    $ionicLoading,
    serviceService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    serviceService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.service = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
        });

	}
]);

serviceControllers.controller('serviceCreateCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  '$cordovaCamera',
  'serviceService',
  'categoryService',
  'typeService',
  'taxService',
  function(
    $scope,
    $rootScope,
    $state,
    $ionicLoading,
    $ionicModal,
    $cordovaCamera,
    serviceService,
    categoryService,
    typeService,
    taxService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    categoryService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.categories = res;
        }, function (err) {
          $ionicLoading.hide();
        })

    typeService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.types = res;
        }, function (err) {
          $ionicLoading.hide();
        })

    taxService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.taxes = res;
        }, function (err) {
          $ionicLoading.hide();
        })

    $scope.service = {}

	  $scope.create = function () {
      $scope.service.business = $rootScope.currentBusiness.id;
      $scope.service.employee = $rootScope.currentEmployee.id;
	    serviceService.create($scope.service)
        .$promise
          .then(function (res) {
      	    $state.go('tab.service-list');
          }, function (err) {

          })
	  }

    $scope.selectCategory = function(category) {
      $scope.service.category_name = category.name;
      $scope.service.service_category = category.id;
      $scope.categoryModal.hide();
    };

    //Modal select category
    $ionicModal.fromTemplateUrl('templates/service/select-category.html', {
      scope: $scope,
      controller: 'serviceCreateCtrl',
      animation: 'slide-in-up',
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

    $scope.selectType = function(type) {
      $scope.service.type_name = type.name;
      $scope.service.service_type = type.id;
      $scope.typeModal.hide();
    };

    //Modal select type
    $ionicModal.fromTemplateUrl('templates/service/select-type.html', {
      scope: $scope,
      controller: 'serviceCreateCtrl',
      animation: 'slide-in-up',
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

    $scope.selectTax = function(tax) {
      $scope.service.tax_name = tax.name;
      $scope.service.tax = tax.id;
      $scope.typeModal.hide();
    };

    //Modal select tax
    $ionicModal.fromTemplateUrl('templates/service/select-tax.html', {
      scope: $scope,
      controller: 'serviceCreateCtrl',
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.taxModal = modal;
    });
    $scope.taxOpenModal = function() {
      $scope.taxModal.show();
    };
    $scope.taxCloseModal = function() {
      $scope.taxModal.hide();
    };

    $scope.takePicture = function() {
      var options = {
          quality : 100,
          destinationType : Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.CAMERA,
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
      };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.service.picture = "data:image/jpeg;base64," + imageData;
    }, function(err) {
          alert(JSON.stringify(err));
    });
    }

    $scope.cancel = function () {
      $state.go('tab.service-list');
    }

	}
]);

serviceControllers.controller('serviceUpdateCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  '$cordovaCamera',
  'serviceService',
  'categoryService',
  'typeService',
  'taxService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicLoading,
    $ionicModal,
    $cordovaCamera,
    serviceService,
    categoryService,
    typeService,
    taxService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    categoryService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.categories = res;
        }, function (err) {
          $ionicLoading.hide();
        })

    typeService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.types = res;
        }, function (err) {
          $ionicLoading.hide();
        })

    taxService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.taxes = res;
        }, function (err) {
          $ionicLoading.hide();
        })

    serviceService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.service = res
          $scope.service.category_name = $scope.service.service_category_name;
          $scope.service.type_name = $scope.service.service_type_name;
          $scope.service.tax_name = $scope.service.tax_name;
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
        });

    $scope.update = function () {
	    serviceService.update($scope.service)
        .$promise
          .then(function (res) {
      	    $scope.services = serviceService.list();
      	    $state.go('tab.service-list');
          }, function (error) {

          })
	  }

    $scope.selectCategory = function(category) {
      $scope.service.category_name = category.name;
      $scope.service.service_category = category.id;
      $scope.categoryModal.hide();
    };

    //Modal select category
    $ionicModal.fromTemplateUrl('templates/service/select-category.html', {
      scope: $scope,
      controller: 'serviceCreateCtrl',
      animation: 'slide-in-up',
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

    $scope.selectType = function(type) {
      $scope.service.type_name = type.name;
      $scope.service.service_type = type.id;
      $scope.typeModal.hide();
    };

    //Modal select type
    $ionicModal.fromTemplateUrl('templates/service/select-type.html', {
      scope: $scope,
      controller: 'serviceCreateCtrl',
      animation: 'slide-in-up',
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

    $scope.selectTax = function(tax) {
      $scope.service.tax_name = tax.name;
      $scope.service.tax = tax.id;
      $scope.typeModal.hide();
    };

    //Modal select tax
    $ionicModal.fromTemplateUrl('templates/service/select-tax.html', {
      scope: $scope,
      controller: 'serviceCreateCtrl',
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.taxModal = modal;
    });
    $scope.taxOpenModal = function() {
      $scope.taxModal.show();
    };
    $scope.taxCloseModal = function() {
      $scope.taxModal.hide();
    };

    $scope.takePicture = function() {
      var options = {
          quality : 100,
          destinationType : Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.CAMERA,
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
      };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.service.picture = "data:image/jpeg;base64," + imageData;
    }, function(err) {
          alert(JSON.stringify(err));
    });
    }

    $scope.cancel = function () {
      $state.go('tab.service-list');
    }

	}
]);

serviceControllers.controller('serviceDeleteCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  'serviceService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicLoading,
    serviceService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    serviceService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.service = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
        });

    $scope.delete = function () {
	    serviceService.delete($scope.service)
        .$promise
          .then(function (res) {
      	    $scope.services = serviceService.list()
      	    $state.go('tab.service-list');
          }, function (err) {

          })
	  }

    $scope.cancel = function () {
      $state.go('tab.service-list');
    }

	}
]);
