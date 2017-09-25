angular.module("app").controller("DeliveryCtrl", DeliveryCtrl);

DeliveryCtrl.$inject = ["$scope", "Delivery", "Mapa"];
function DeliveryCtrl($scope, Delivery, Mapa) {

  $scope.deliveries = [];
  $scope.delivery = Delivery.getDelivery();
  $scope.endereco = "";
  $scope.dados = {};
  var enderecoValido = false;
  var mapa = new Mapa("mapId");

  ativar();

  function ativar() {
    Delivery.iniciar().then(function () {
      $scope.deliveries = Delivery.getDeliveries();
      $scope.dados = Delivery.getDados();

      let marcadores = $scope.deliveries.map(montarMarcador);
      function montarMarcador(item) {
        return {
          titulo: item.nome,
          descricao: item.peso + "Kg",
          coordenadas: [item.endereco.geolocalizacao.latitude, item.endereco.geolocalizacao.longitude],
        };
      };
      mapa.carregar(marcadores);
    });
  };

  $scope.buscar = function () {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: $scope.endereco }, extrairEndereco);
  };

  $scope.onCadastrar = function () {
    if (validarCadastro()) {
      Delivery.cadastrar($scope.delivery, function (response) {
        if (response && response.status === 200) {
          atualizarTabela();
          atualizarMapa();
          limparFormulario();
        } else {
          alert("Não foi possível efetuar cadastro");
        }
      });
    }
  };

  $scope.onResetar = function () {
    var resetar = confirm("Alerta: Esta ação irá apagar todos os cadastros.");
    if (resetar) {
      Delivery.resetarCadastro(resetar);
      function resetar() {
        if (response && response.status === 200) {
          mapa.removerTodos();
          $scope.deliveries = [];
          $scope.dados = {};
        } else {
          alert("Não foi possível efetuar resetar o cadastro");
        }
      }
    }
  };

  function extrairEndereco(results, status) {
    if (status === "OK" && results.length === 1 && results[0].address_components.length >= 6) {

      var endereco = results[0].address_components;
      var geo = results[0].geometry.location;

      $scope.delivery.endereco.numero = endereco[0].long_name;
      $scope.delivery.endereco.logradouro = endereco[1].long_name;
      $scope.delivery.endereco.bairro = endereco[2].long_name;
      $scope.delivery.endereco.cidade = endereco[3].long_name;
      $scope.delivery.endereco.estado = endereco[4].long_name;
      $scope.delivery.endereco.pais = endereco[5].long_name;
      $scope.delivery.endereco.geolocalizacao.latitude = geo.lat();
      $scope.delivery.endereco.geolocalizacao.longitude = geo.lng();

      enderecoValido = true;
      $scope.$apply();
    } else {
      if (status === "OK" && results.length) {
        alert("Informe um endeço completo. (rua, nº, bairro, cidade e estado)");
      } else {
        alert("Não foi possível carragar o enderço");
      }
      enderecoValido = false;
    }

  };

  function validarCadastro() {
    if (!enderecoValido) {
      alert("preencha um endeço válido.");
      return false;
    } else if (!$scope.delivery.nome || !$scope.delivery.peso) {
      alert("Todos os campos são de preenchimento obrigatório.");
      return false;
    }
    return true;
  }

  function atualizarTabela() {
    $scope.dados = Delivery.getDados();
    $scope.deliveries = Delivery.getDeliveries();
  }

  function atualizarMapa() {
    var geo = $scope.delivery.endereco.geolocalizacao;
    mapa.inserir({
      titulo: $scope.delivery.nome,
      descricao: $scope.delivery.peso + "Kg",
      coordenadas: [geo.latitude, geo.longitude],
    });
  };

  function limparFormulario() {
    $scope.delivery = Delivery.getDelivery();
    $scope.endereco = "";
    enderecoValido = false;
  }
};