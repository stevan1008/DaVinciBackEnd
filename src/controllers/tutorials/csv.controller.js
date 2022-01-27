const db = require("../../models");
const Data = db.data;

const fs = require("fs");
const csv = require("fast-csv");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Por favor suba un archivo CSV especificamente");
    }

    let datos = [];
    let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true, delimiter:',' }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        datos.push(row);
      })
      .on("end", () => {
        Data.bulkCreate(datos)
          .then(() => {
            res.status(200).send({
              message:
                "Archivo subido satisfactoriamente: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Imposible importar a la base de datos",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "No se pudo subir el archivo: " + req.file.originalname,
    });
  }
};

const getData = (req, res) => {
  Data.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error mientras se procesaban los datos.",
      });
    });
};

module.exports = {
  upload,
  getData
};