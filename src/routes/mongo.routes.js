import { Router } from "express";
import mongoCtrl from "../controllers/mongo.controller.js";

const route = Router();

route.get("/", mongoCtrl.list);
route.get("/:id", mongoCtrl.searchById);
route.post("/", mongoCtrl.create);
route.put("/:id", mongoCtrl.update);
route.delete("/:id", mongoCtrl.delete);

export default route;
