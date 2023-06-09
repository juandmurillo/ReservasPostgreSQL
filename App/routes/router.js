const express = require("express"); //Modulo para el manejo de las peticiones HTTPS
const { DbDao } = require("../daos/DbDao.js"); //Importacion del DAO para postgress
const { HabitacionDao } = require("../daos/HabitacionDao.js");
const { ClienteDao } = require("../daos/ClienteDao.js");
const { ReservaDao } = require("../daos/ReservaDao.js");

const router = express.Router(); //Objeto para configurar las rutas

const DAO = new DbDao(); //DAO para la conexion con la DB en postgress

const habitacionDao = new HabitacionDao(), //DAO para el manejo de la tabla habitacion.
  clienteDao = new ClienteDao(),
  reservaDao = new ReservaDao();

DAO.createConexion(); //Se crea la conexion con la DB

//Trae los datos de la tabla reserva en la DB //Enrutando las peticiones GET
router.get("/reservas", (req, res) => {
  reservaDao.getReservas(req, res);
});

//Trae un dato especifico de la tabla Reserva usando el Id del resgistro
router.get("/reservas/:id", (req, res) => {
  reservaDao.getReserva(req, res);
});

//Trae los registros de la tabla cliente en la DB
router.get("/clientes", (req, res) => {
  clienteDao.getClientes(req, res);
});

// Ruta check-in
router.get("/check-in", (req, res) => {
  clienteDao.getClientesCI(req, res);
});
// Cambiar estado a activo
router.get("/hacer_check_in/:id", (req, res) => {
  reservaDao.activarReserva(req.params, res);
});

// Mostrar historial de reservas
router.get("/historial", (req, res) =>{
  reservaDao.getHistorial(req, res);
})

//Trae el registro de un cliente a través de su ID
router.get("/cliente/:id", (req, res) => {
  clienteDao.getCliente(req, res);
});

//Trae los registro de las habitaciones en la DB
router.get("/habitaciones", (req, res) => {
  //Retornar las habitaciones en la DB
  habitacionDao.getHabitacion(req, res);
});

//Enruntando peticiones POST

// Crear
router.get("/crear_cliente", (req, res) => {
  res.render("crear_cliente");
});

//Inserta un registro a la tabla cliente en la DB
router.post("/insertar_cliente", (req, res) => {
  clienteDao.insertCliente(req.body, res);
});
//Eliminar un registro de la tabla clientes
router.get("/eliminar_cliente/:id", (req, res) => {
  clienteDao.deleteCliente(req, res);
});

//Formulario para crear reserva
router.get("/crear_reserva/:id", (req, res) => {
  clienteDao.getClienteInfo(req, res);
});
// Traer habitaciones disponibles
router.post("/crear_reserva/:id", (req, res) => {
  clienteDao.getClienteInfo(req, res);
});

//Insertat un registro a la tabla reserva en la DB
router.get(
  "/insertar_reserva/:id_cliente.:tipo.:id_habitacion.:noches.:huespedes.:fecha",
  (req, res) => {
    //console.log('Datos ->'+Object.keys(req.params))

    reservaDao.insertReserva(req.params, res);
  }
);

//Actualizar un registro en la tabla reserva.
router.get("/reserva/c/:id", (req, res) => {
  reservaDao.cancelarReserva(req.params, res);
});

//Exportar router.
module.exports = router;
