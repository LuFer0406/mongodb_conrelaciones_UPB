import { response } from "../helpers/response.js";
import { schoolModel } from "../models/school.model.js";
import { studentModel } from "../models/student.model.js";

const schoolCtrl = {};

schoolCtrl.list = async (req, res) => {
  try {
    const registros = await schoolModel.find();
    response(res, 200, true, registros, "Lista de registros");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

schoolCtrl.searchById = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await schoolModel.findById(id);

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

schoolCtrl.create = async (req, res) => {
  try {
    const nuevoRegistro = await schoolModel.create(req.body);
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

schoolCtrl.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await schoolModel.findById(id);

    if (!registro) {
      return response(
        res,
        404,
        false,
        "",
        "El registro no ha sido encontrado."
      );
    }

    // await studentModel.deleteMany({school: registro._id});
    await registro.deleteOne();

    response(res, 200, true, "", "El registro ha sido eliminado con éxito.");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

schoolCtrl.update = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await schoolModel.findById(id);

    if (!registro) {
      return response(
        res,
        404,
        false,
        "",
        "El registro no ha sido encontrado."
      );
    }

    await registro.updateOne(req.body);

    response(res, 200, true, "", "El registro ha sido actualizado con éxito.");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

export default schoolCtrl;
