angular.module("app").factory("Delivery", DeliveryFactory);

DeliveryFactory.$inject = ["$http", "$q"];
function DeliveryFactory($http, $q) {

  var deliveriesPromise = $q.defer();
  var deliveries = [];
  var dados = { totalClientes: 0, totalPeso: 0, ticketMedio: 0 };

  var exportar = {
    iniciar: iniciar,
    getDeliveries: getDeliveries,
    getDelivery: getDelivery,
    getDados: getDados,
    cadastrar: cadastrar,
    resetarCadastro: resetarCadastro
  };

  function iniciar() {
    $http.get("deliveries").then(onResponse);
    function onResponse(response) {
      if (response && response.status === 200) {
        deliveries = response.data;
        deliveriesPromise.resolve(response);
      }
    }
    return deliveriesPromise.promise;
  };

  function getDeliveries() {
    return deliveries;
  };

  function getDelivery() {
    return {
      nome: "",
      peso: null,
      endereco: {
        logradouro: "",
        numero: null,
        bairro: "",
        complemento: "-",
        cidade: "",
        estado: "",
        pais: "",
        geolocalizacao: { latitude: null, longitude: null }
      }
    };
  };

  function getDados() {
    dados.totalClientes = deliveries.length;
    if (deliveries.length) {
      dados.totalPeso = deliveries.reduce(somar).peso;
      function somar(a, b) {
        return { peso: a.peso + b.peso };
      }
    }
    dados.ticketMedio = dados.totalPeso / dados.totalClientes;

    return dados;
  };

  function cadastrar(delivery, cb) {
    $http.post("deliveries", delivery).then(onResponse);
    function onResponse(response) {
      if (response && response.status === 200) {
        deliveries.push(delivery);
      }
      cb(response);
    }
  };

  function resetarCadastro(cb) {
    $http.delete("deliveries").then(onResponse);
    function onResponse(response) {
      deliveries = [];
    }
  };

  return exportar;
};