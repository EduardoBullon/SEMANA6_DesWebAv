import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
  async list(req, res) {
    const posts = await postRepository.findAll();
    res.render("posts_list", { posts });
  }

  async create(req, res) {
    try {
      const { userId, title, content, hashtags, imageUrl } = req.body;
      const user = await userRepository.findById(userId);
      if (!user) return res.status(400).send("Usuario no encontrado");

      await postRepository.create({
        title,
        content,
        hashtags: hashtags ? hashtags.split(",").map(h => h.trim()) : [],
        imageUrl,
        user: user._id,
        createdAt: new Date()
      });
      res.redirect("/posts");
    } catch (err) {
      res.status(500).send("Error al crear post: " + err.message);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, content, hashtags, imageUrl } = req.body;

      await postRepository.update(id, {
        title,
        content,
        hashtags: hashtags ? hashtags.split(",").map(h => h.trim()) : [],
        imageUrl,
        updatedAt: new Date()
      });
      res.redirect("/posts");
    } catch (err) {
      res.status(500).send("Error al actualizar post");
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      await postRepository.delete(id);
      res.redirect("/posts");
    } catch (err) {
      res.status(500).send("Error al eliminar post");
    }
  }
}

export default new PostController();
