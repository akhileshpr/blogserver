const express = require('express');
const jwtMiddleWare = require('../middleware/auth')
const usercontroller = require('../controller/usercontroller');
const blogController = require('../controller/blogController');
const commentController = require('../controller/commentController');
const router = new express.Router();
const multerConfig = require('../middleware/multer');
router.post('/register',multerConfig.single('picture'),usercontroller.register);
router.post('/login',usercontroller.login);




// blogs
router.post('/add-blog',jwtMiddleWare,multerConfig.single('picture'),blogController.addBlog);
router.get('/all-blog',blogController.getAllBlogs);
router.get('/user-blog/:id',blogController.getUserBlogs);
router.put('/update-blog/:id',multerConfig.single('picture'),blogController.updateBlog);
router.delete('/delete-blog/:id',blogController.deletePost);
router.patch('/update-like/:id',blogController.likepost);
router.get('/single-post/:postId',blogController.getSinglePost);


// Comment
router.post('/add-comment/:postId/:userId',jwtMiddleWare,commentController.createComment);

module.exports = router