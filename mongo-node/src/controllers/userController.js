import userRepository from "../repositories/userRepository.js";

class UserController {
  async showCreateForm(req, res) {
    res.render("users_create");
  }

  async list(req, res) {
    try {
      const users = await userRepository.findAll();
      res.render("users_list", { users });
    } catch (err) {
      res.status(500).send("Error al obtener usuarios: " + err.message);
    }
  }

  async create(req, res) {
    try {
      const { name, lastName, email, age, phoneNumber, password } = req.body;
      
      await userRepository.create({
        name,
        lastName,
        email,
        age: parseInt(age),
        phoneNumber,
        password,
        createdAt: new Date()
      });
      
      res.redirect("/users");
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).send("Error: El email ya está registrado");
      } else {
        res.status(500).send("Error al crear usuario: " + err.message);
      }
    }
  }
}

export default new UserController();