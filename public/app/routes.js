angular.module("app").config(Routes);

Routes.$inject = ["$routeProvider", "$locationProvider"];
function Routes($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
    templateUrl: "app/delivery/delivery.html",
    controller: "DeliveryCtrl",
    controllerAs: "vm"
  }).otherwise({ redirectTo: "/" });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
};