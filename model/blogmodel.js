const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    title:String,
    description: {
       type:String,
       minlength: 50,
    },
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
      default: new Map(),
    },
    isPrivate: {
        type: Boolean,
        default: false, 
      },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("Blogs", blogSchema);

module.exports = Blogs;
