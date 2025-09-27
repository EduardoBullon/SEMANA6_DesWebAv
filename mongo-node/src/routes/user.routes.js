import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/create", userController.showCreateForm);

router.get("/", userController.list);

router.post("/", userController.create);

export default router;