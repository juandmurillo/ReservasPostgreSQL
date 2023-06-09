const { DbDao } = require("./DbDao");

class ReservaDao extends DbDao {
  constructor() {
    super();
    this.conexion = super.getConexion;
  }

  async getReservas(req, res) {
    try {
      let response = (
        await this.conexion.query(
          `SELECT * FROM reserva,cliente 
          WHERE reserva.k_idcliente = cliente.k_idcliente
          AND reserva.i_estado IN ('A','P')
          ORDER BY 
            CASE i_estado
              WHEN  'A' THEN 1
              WHEN  'P' THEN 2
              WHEN  'F' THEN 3
              WHEN  'C' THEN 4
              END ASC`
        )
      ).rows;
      if (response.length === 0) {
        res.render("reservas", { reservas: "Sin registros" });
        return false;
      }
      res.render("reservas", { reservas: response });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Un error ha ocurrido en el servidor",
        error: err,
      });
    }
  }
  async getHistorial(req, res) {
    try {
      let response = (
        await this.conexion.query(
          `SELECT * FROM reserva,cliente 
          WHERE reserva.k_idcliente = cliente.k_idcliente
          ORDER BY 
            CASE i_estado
              WHEN  'A' THEN 1
              WHEN  'P' THEN 2
              WHEN  'F' THEN 3
              WHEN  'C' THEN 4
              END ASC`
        )
      ).rows;
      if (response.length === 0) {
        res.render("reservas", { reservas: "Sin registros" });
        return false;
      }
      res.render("historial", { reservas: response });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Un error ha ocurrido en el servidor",
        error: err,
      });
    }
  }

  async getReserva(req, res) {
    try {
      const { id } = req.params;
      const response = await this.conexion.query(
        `SELECT * FROM reserva WHERE( k_numreserva= ${id})`
      );
      if (response.rowCount === 0) {
        res.status(404).json({
          message: "No se encontró el recurso",
        });
        return false;
      }

      res.status(200).json({
        message: "Consulta exitosa",
        data: response.rows,
      });
    } catch (err) {
      res.status(500).json({
        message: "Ocurrió un error interno",
        error: err,
      });
    }
  }

  async insertReserva(reserva, res) {
    try {
      const f_actual = new Date(Date.now());
      console.log(f_actual);
      const response = await this.conexion.query(
        `INSERT INTO reserva (k_idcliente,k_tipoid,k_numhabitacion,i_estado,f_reserva,q_numnoches,q_numpersonas,f_inicio)VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING k_numreserva`,
        [
          reserva.id_cliente,
          reserva.tipo,
          reserva.id_habitacion,
          "P",
          f_actual,
          reserva.noches,
          reserva.huespedes,
          reserva.fecha,
        ]
      );
      res.redirect("/reservas");
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Ha ocurrido un error en el servidor",
        error: err,
      });
    }
  }

  async cancelarReserva(reserva, res) {
    try {
      const response = await this.conexion.query(
        `UPDATE reserva SET i_estado = 'C' WHERE (k_numreserva = ${reserva.id})`
      );
      res.redirect("/reservas");
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Ha ocurrido un error en el servidor",
        error: err,
      });
    }
  }

  async finalizarReserva(reserva, res) {
    try {
      const response = await this.conexion.query(
        `UPDATE reserva SET i_estado = 'F' WHERE (k_numreserva = ${reserva.id})`
      );
      res.redirect("/reservas");
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Ha ocurrido un error en el servidor",
        error: err,
      });
    }
  }
  async activarReserva(reserva, res) {
    try {
      const response = await this.conexion.query(
        `UPDATE reserva SET i_estado = 'A' WHERE (k_numreserva = ${reserva.id})`
      );
      res.redirect("/check-in");
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Ha ocurrido un error en el servidor",
        error: err,
      });
    }
  }
}
module.exports = { ReservaDao };
