import { response } from "../helpers/response.js";
import { studentModel } from "../models/student.model.js";

const studentCtrl = {};

studentCtrl.list = async (req, res) => {
  try {
    const registros = await studentModel.find().populate("school_id"); // -> Inner Join en mongoDb
    response(res, 200, true, registros, "Lista de registros");
  } catch (error) {
    response(res, 500, false, "", error.message);
  }
};

studentCtrl.searchById = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await studentModel.findById(id).populate("school_id");

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

studentCtrl.create = async (req, res) => {
  try {
    const nuevoRegistro = await studentModel.create(req.body);
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

studentCtrl.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await studentModel.findById(id);

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

studentCtrl.update = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await studentModel.findById(id);

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

export default studentCtrl;
