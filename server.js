const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const port = process.env.PORT || 8080;

global.Promise = require("bluebird");

const restApi = require("./app/routes/restApi");

// Para ler parametros url e json do client
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logs no console
app.use(morgan("dev"));

// Local dos aquivos para o frontend
app.use(express.static(__dirname + "/public"));

app.use("/", restApi);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/app/index.html"));
});

// Inicia o servidor
app.listen(port, () => console.log("http://localhost:" + port));
