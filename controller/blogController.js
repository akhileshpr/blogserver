const Blogs = require("../model/blogmodel");
const Users = require("../model/usermodel");
exports.addBlog = async (req, res) => {
  console.log("inside add blog api");
  const { title, description } = req.body;
  const userId = req.payload;
  // console.log(title,description,userId);
  try {
    const user = await Users.findById(userId);
    const image = req.file.filename;
    if (!user) {
      res.status(404).json("user not exists..");
    } else {
      const newPost = new Blogs({
        userId,
        userName: user.userName,
        description,
        title,
        userPicturePath: user.picture,
        picturePath: image,
        likes: {},
      });
      await newPost.save();
      const post = await Blogs.find();
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(404).json(err);
  }
};


exports.getAllBlogs = async (req, res) => {
  try {
    let { page, limit } = req.query;  
    // console.log(page,limit);
    
    page = parseInt(page);
    limit = parseInt(limit);

    const totalBlogs = await Blogs.countDocuments({isPrivate:false});
    const blogs = await Blogs.find({isPrivate:false})
      .sort({ createdAt: -1 }) 
      .skip((page - 1) * limit) 
      .limit(limit); 

    res.status(200).json({
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

  exports.getUserBlogs = async (req, res) => {
  try {
    let { page, limit } = req.query;
    console.log(page,limit);
    
    page = parseInt(page);
    limit = parseInt(limit);
    const {id} = req.params;
    const totalBlogs = await Blogs.countDocuments({userId: id });
    console.log(totalBlogs);
    
    const blogs = await Blogs.find({ userId :id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      blogs,
    });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res.status(500).json({ message: "Server error" });
  }
};
  
  exports.updateBlog = async (req, res) => {
    console.log("Inside update blog API");
  
    const { title, description,isPrivate } = req.body;
    const { id } = req.params;
    const image = req.file ? req.file.filename : null;
    try {
      const post = await Blogs.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      post.title = title || post.title;
      post.description = description || post.description;
      post.isPrivate = isPrivate || post.isPrivate;
      if (image) {
        post.picturePath = image;
      }
  
      await post.save();
      res.status(200).json(post);
    } catch (err) {
      console.error("Error updating blog:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.deletePost = async (req, res) => {
    console.log('Inside deletePost API...');
    const { id } = req.params; 
    try {
      const deletedPost = await Blogs.findByIdAndDelete(id);
            if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found.' });
      }
        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (err) {
      console.error('Error deleting post:', err.message);
      res.status(500).json({ error: 'Failed to delete post. Please try again later.' });
    }
  };
  
  exports.likepost= async (req, res) => {
    console.log('inside like api..');
    
    try {
      const { id } = req.params;
      const { userId } = req.body;
      
      const post = await Blogs.findById(id);      
      const isLiked = post.likes.get(userId);
  
      if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }
  
      const updatedPost = await Blogs.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
      );
     const postes = await Blogs.find();
      res.status(200).json(postes);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  exports.getSinglePost=async(req,res)=>{
    try {
      const postId = req.params.postId;
      const post = await Blogs.findById(postId)
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching post' });
    }
  }