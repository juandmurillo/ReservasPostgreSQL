const { DbDao } = require("./DbDao.js");

class ClienteDao extends DbDao {
  constructor() {
    super();
    this.conexion = super.getConexion;
  }

  async getClientes(req, res) {
    try {
      let response = (await this.conexion.query(`SELECT * FROM cliente`)).rows;
      if (response.length === 0) {
        res.status(404).json({
          message: "No se encontro el recurso",
        });
        return false;
      }
      res.render("clientes", { response });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Un error ha ocurrido en el servidor",
        error: err,
      });
    }
  }

  async getClientesCI(req, res) {
    try {
      let response = (await this.conexion.query(`SELECT * FROM cliente, reserva WHERE (reserva.k_idcliente = cliente.k_idcliente AND reserva.i_estado IN ('P','A'))`)).rows;
      if (response.length === 0) {
        res.render("check-in", { response });
        return false;
      }
      res.render("check-in", { response });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Un error ha ocurrido en el servidor",
        error: err,
      });
    }
  }

  async getCliente(req, res) {
    try {
      const { id } = req.params;
      const response = await this.conexion.query(
        `SELECT * FROM cliente WHERE( k_idcliente= ${id})`
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

  async getClienteInfo(req, res) {
    try {
      const { id } = req.params;

      let response = (
        await this.conexion.query(
          `SELECT * FROM cliente WHERE( k_idcliente= ${id})`
        )
      ).rows;
      if (response.length === 0) {
        res.status(404).json({
          message: "No se encontro el recurso",
        });
        return false;
      }
      if (req.body.fecha && req.body.numnoches && req.body.huespedes) {
        let disponibles = (
          await this.conexion.query(
            `
            SELECT k_numhabitacion, k_tipohab, q_valornoche, o_descripcion FROM
              (SElECT k_numhabitacion, k_tipohab FROM habitacion
              EXCEPT
              SELECT h.k_numhabitacion, h.k_tipohab FROM(
	            SELECT * FROM(
		          SELECT * FROM reserva 
              WHERE (f_inicio >= CURRENT_DATE)
              ) r1 
              WHERE (i_estado NOT in ('F','C'))
              ) r2 , habitacion h
              WHERE ((r2.k_numhabitacion = h.k_numhabitacion) AND
              NOT (
                    (DATE '${req.body.fecha}' > r2.f_inicio + (q_numnoches-1)* interval '1 day' OR DATE '${req.body.fecha}' + interval '${req.body.numnoches} day' < r2.f_inicio) AND
                    (DATE '${req.body.fecha}' > r2.f_inicio OR DATE '${req.body.fecha}' + interval '${req.body.numnoches} day' < r2.f_inicio + (q_numnoches-1)* interval '1 day')
                    )))r3, tipo t WHERE (r3.k_tipohab = t.k_tipo)
            ORDER BY k_numhabitacion ASC`
          )
        ).rows;
        if (disponibles.length === 0) {
          res.render("Nueva_reserva", {
            user: response[0],
            habitaciones: "sin disponibilidad",
            data: req.body,
          });
          return false;
        }
        console.log(disponibles);
        res.render("Nueva_reserva", {
          user: response[0],
          habitaciones: disponibles,
          data: req.body,
        });
      } else {
        res.render("Nueva_reserva", {
          user: response[0],
          habitaciones: "",
          data: "",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Un error ha ocurrido en el servidor",
        error: err,
      });
    }
  }

  async deleteCliente(req, res) {
    try {
      const { id } = req.params;
      const response = await this.conexion.query(
        `DELETE FROM cliente WHERE( k_idcliente= ${id})`
      );
      if (response.rowCount === 0) {
        res.status(404).json({
          message: "No se encontró el recurso",
        });
        return false;
      }
      res.redirect("/clientes");
    } catch (err) {
      res.status(500).json({
        message: "Ocurrió un error interno",
        error: err,
      });
    }
  }

  async insertCliente(cliente, res) {
    try {
      const response = await this.conexion.query(
        `INSERT INTO cliente VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          cliente.id,
          cliente.tipo,
          cliente.nombre1,
          cliente.apellido1,
          cliente.nombre2,
          cliente.apellido2,
          cliente.telefono,
        ]
      );
      res.redirect("clientes");
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Ha ocurrido un error en el servidor",
        error: err,
      });
    }
  }
}

module.exports = {
  ClienteDao,
};
