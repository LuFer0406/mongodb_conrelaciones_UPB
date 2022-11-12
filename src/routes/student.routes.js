import { Router } from "express";
import studentCtrl from "../controllers/student.controller.js";

const route = Router();

route.get("/", studentCtrl.list);
route.get("/:id", studentCtrl.searchById);
route.post("/", studentCtrl.create);
route.put("/:id", studentCtrl.update);
route.delete("/:id", studentCtrl.delete);

export default route;