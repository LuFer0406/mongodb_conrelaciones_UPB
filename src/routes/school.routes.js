import { Router } from "express";
import schoolCtrl from "../controllers/school.controller.js";

const route = Router();

route.get("/", schoolCtrl.list);
route.get("/:id", schoolCtrl.searchById);
route.post("/", schoolCtrl.create);
route.put("/:id", schoolCtrl.update);
route.delete("/:id", schoolCtrl.delete);

export default route;
