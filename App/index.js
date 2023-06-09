const express = require("express"); //Obtenemos el modulo Express
const bodyParser = require("body-parser"); //Obtenemos el modulo para formatear los body.
const cors = require("cors"), //Modulo para evitar errores por CORS (Cross-origin Resource Sharing)
  corsConfig = {
    origin: "*", //Aceptamos peticiones desde cualquier origen.
  }; //Config de Cors

const server = express(), //Modulo para la incializacion del server
  router = require("./routes/router"); //Creacion del router importandolo de su archivo.

server.set("view engine", "ejs");
server.use(express.static(__dirname + '/views'));
server.use(bodyParser.json()); //Formateando el cuerpo de las peticiones
server.use(bodyParser.urlencoded({ extended: false })); //Formatenado contenido de las URL's

server.use(cors(corsConfig)); //Aplicando encabezados para el CORS

server.use("/", router); //Añadiendo el router.

//Iniciando el servido en el puerto 6060
server.listen(6060, () => {
  console.log("Servidor en ejecucion en http://localhost:6060");
});
  