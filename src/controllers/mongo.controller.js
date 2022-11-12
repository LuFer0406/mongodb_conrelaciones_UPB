import { response } from "../helpers/response.js";
import { mongoModel } from "../models/mongo.model.js";

const mongoCtrl = {};

mongoCtrl.list = async (req, res) => {
  try {
    const registros = await mongoModel.find();
    response(res, 200, true, registros, "Lista de registros");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

mongoCtrl.searchById = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await mongoModel.findById(id);

    if (!registro) {
      return response(
        res,
        404,
        false,
        "",
        "El registro no ha sido encontrado."
      );
    }

    response(
      res,
      200,
      true,
      registro,
      "El registro ha sido encontrado con éxito."
    );
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

mongoCtrl.create = async (req, res) => {
  try {
    const nuevoRegistro = await mongoModel.create(req.body);
    response(
      res,
      201,
      true,
      nuevoRegistro,
      "El registro se ha creado exitosamente."
    );
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

mongoCtrl.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await mongoModel.findById(id);

    if (!registro) {
      return response(
        res,
        404,
        false,
        "",
        "El registro no ha sido encontrado."
      );
    }

    await registro.deleteOne();

    response(res, 200, true, "", "El registro ha sido eliminado con éxito.");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

mongoCtrl.update = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await mongoModel.findById(id);

    if (!registro) {
      return response(
        res,
        404,
        false,
        "",
        "El registro no ha sido encontrado."
      );
    }

    await registro.updateOne({
      ...req.body,
      school: {
        ...registro.school,
        ...req.body.school,
      },
    });

    response(res, 200, true, "", "El registro ha sido actualizado con éxito.");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

export default mongoCtrl;
