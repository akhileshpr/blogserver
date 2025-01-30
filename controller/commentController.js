const Comment = require('../model/commentModel');
const Blogs = require('../model/blogmodel')
const Users = require('../model/usermodel'); 

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    // Fetch the comments for the given postId
    const comments = await Comment.find({ postId })
      .populate('user', 'name avatar') // Populate user details (adjust based on your User model)
      .sort({ createdAt: -1 }); // Sort comments by creation date

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error while fetching comments' });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.params;
    const { text } = req.body; 
    console.log(postId,userId,text);
    console.log(req.body);
    
    
    const post = await Blogs.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = new Comment({
      user: userId,
      postId,
      text,
    });

    await newComment.save();

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment: newComment,
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Server error while creating comment' });
  }
};
