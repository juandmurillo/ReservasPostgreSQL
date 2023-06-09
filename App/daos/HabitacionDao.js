const { DbDao } = require("./DbDao");

class HabitacionDao extends DbDao {
  constructor() {
    super();
    this.conexion = super.getConexion;
  }


  
  async getHabitacion(req, res) {
    try {
      let response = (
        await this.conexion.query(
          `SELECT k_numhabitacion, k_tipo, TO_CHAR(q_valornoche, '$999,999.99') q_valornoche, o_descripcion
          FROM habitacion,tipo WHERE(k_tipohab = k_tipo) ORDER BY k_numhabitacion ASC;`
        )
      ).rows;
      if (response.length === 0) {
        res.status(404).json({
          message: "No se encontro el recurso",
        });
        return false;
      }
      res.render('habitaciones',{response})
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Un error ha ocurrido en el servidor",
        error: err,
      });
    }
  }
}

module.exports = { HabitacionDao };
