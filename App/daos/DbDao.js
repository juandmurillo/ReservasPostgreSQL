/*
Las pool, como su nombre indica, son pozos que contienen un cierto numero de peticiones
y se encagra de manejarlas lo que ayuda a que la base de datos y la api no se sobrecarguen con peticiones y consultas.
*/
const { Pool } = require("pg"), //Importamos la clase Pool del paquete pg, necario para el manejo de multiples querys.
  config = require("../config/config"); //Archivo de configuraciones

//Clase que se encarga de la conexion con la base de datos. Aplicando patron DAO
class DbDao {
  static conexion;

  get getConexion() {
    if (DbDao.conexion) {
      return DbDao.conexion;
    }
    this.createConexion();
    return DbDao.conexion;
  }

  //Se conecta a la DB y queda a la escucha de querys.
  createConexion() {
    DbDao.conexion = new Pool({
      user: config.USER,
      host: config.HOST,
      database: config.DATABASE,
      password: config.PASSWORD,
      port: config.PORT,
    });
  }

  endConexion() {
    DbDao.conexion.end();
  }
}

module.exports = {
  DbDao,
};
