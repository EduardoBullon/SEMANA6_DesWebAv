import express from "express";
import postController from "../controllers/postController.js";
import userRepository from "../repositories/userRepository.js";

const router = express.Router();

router.get("/create", async (_req, res) => {
  try {
    const users = await userRepository.findAll();
    res.render("posts_create", { users });
  } catch (err) {
    res.status(500).send("No se pudo cargar el formulario de creación");
  }
});

router.get("/", postController.list);
router.post("/", postController.create);
router.post("/update/:id", postController.update);
router.get("/delete/:id", postController.remove);

export default router;
