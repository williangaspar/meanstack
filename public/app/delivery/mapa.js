/* marcador = {titulo: "João", descricao: 100, coordenadas: [100, 200]} */

var Mapa = function (mapaId) {
  let mapa = null;
  let marcadores = [];

  function carregar(listaMarcadores) {

    if (listaMarcadores && listaMarcadores.length) {
      mapa = L.map('mapId').setView(listaMarcadores[0].coordenadas, 12);

      marcadores = listaMarcadores.map(function (item, index) {
        let m = novoMarcador(index, item);
        return m;
      }, this);
    } else {
      // Mostra São Paulo caso não houver objetos
      mapa = L.map(mapId).setView([-23.533773, -46.625290], 10);
    }

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_' +
      'token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
      }).addTo(mapa);
  }

  function inserir(marcador) {
    let novo = novoMarcador(marcadores.length, marcador);
    marcadores.push(novo);
  }

  function removerTodos() {
    marcadores.forEach(function (item) {
      mapa.removeLayer(item);
    }, this);
    marcadores = [];
  }

  function novoMarcador(index, item) {
    let customIcon = L.ExtraMarkers.icon({
      icon: 'fa-number',
      number: index + 1,
      markerColor: 'black',
      shape: 'circle',
      prefix: 'fa'
    });
    let marcador = L.marker(item.coordenadas, {icon: customIcon});
    marcador.addTo(mapa);
    marcador.bindPopup("<b>" + item.titulo + "</b><br>" + item.descricao).openPopup();
    return marcador;
  }

  return { carregar, inserir, removerTodos };
}