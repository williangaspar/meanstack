## challenge-fullstack-master

Projeto Mean Stack com [Leaflet](http://leafletjs.com/)  e [Google Geocode API](https://developers.google.com/maps/documentation/geocoding/intro?hl=pt-br).

### Backend

O projeto é iniciado pelo arquivo `server.js`. Nele estão as configurações do express e a importação dos routes

a API Rest está localizada na pasta `app/routes`. 

O banco está na pasta `app/db`. Optei por utilizar um arquivo `index.js` para facilitar a importação e inicializar os componentes do banco.

#### Validação server side

Como a validação para o projeto consiste apenas na verificação de preenchimento preferi colocar validação no mongoDb. No entanto, em casos mais complexos pode ser interessante criar uma camada/módulo dedicado a validação.

## Frontend

![layout](layout.jpg)

O frontend foi feito com Angular 1.x e está localizado na pasta `public/app`. A página principal do sistema está na pasta `public/app/delivery`.
É bem comum estruturar aplicação AngularJs com uma pasta para controller, outra para services, view e etc. Porém optei por organizar a aplicação por funcionalidade e não por tipo de arquivo.

O mapa foi abstraído para o arquivo `mapa.js` e `mapaService.js`. O mapa.js contém a lógica básica do Leaflet, inserção/remoção de marcadores e pode ser reutilizada com qualquer framework javascript. O mapaService.js transfora o mapa em um objeto Angular.

### validação frontend

A Validação no frontend é feita com a propriedade `required` no form e com a função `validarCadastro` do `deliveryCtrl` que verifica se os campos estão preenchidos e se o usuário inseriu um endereço válido.

