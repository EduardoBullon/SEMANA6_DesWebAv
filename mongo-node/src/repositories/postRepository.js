import Post from "../models/Post.js";

class PostRepository {
  create(post) {
    return Post.create(post);
  }

  findAll() {
    return Post.find().populate("user");
  }

  findByUser(userId) {
    return Post.find({ user: userId }).populate("user");
  }

  update(postId, postData) {
    return Post.findByIdAndUpdate(postId, postData, { new: true, runValidators: true });
  }

  delete(postId) {
    return Post.findByIdAndDelete(postId);
  }
}

export default new PostRepository();
