const Comment = require('../model/commentModel');
const Blogs = require('../model/blogmodel')
const Users = require('../model/usermodel'); 

exports.getComments = async (req, res) => {
    try {
      const { postId } = req.params;
  
      const comments = await Comment.find({ postId })
        .populate('user', 'userName picture') 
        .sort({ createdAt: -1 });
  
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
      const populatedComment = await newComment.populate('user', 'userName picture');
      res.status(200).json({
        success: true,
        message: 'Comment added successfully',
        comment: populatedComment, 
      });
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ message: 'Server error while creating comment', error });
    }
  };
  