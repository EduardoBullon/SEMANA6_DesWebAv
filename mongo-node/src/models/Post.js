import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, minlength: 5, maxlength: 30, required: true, trim: true },
  content: { type: String, minlength: 10, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hashtags: [{ type: String, trim: true }],      
  imageUrl: { type: String, trim: true },        
  createdAt: { type: Date, default: Date.now },  
  updatedAt: { type: Date }                      
});


postSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});
postSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

export default mongoose.model("Post", postSchema);
