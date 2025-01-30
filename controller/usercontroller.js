const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const users = require('../model/usermodel')
exports.register = async (req, res) => {
  console.log(req.body);
  
    console.log("inside register api");
    const { userName, email, password } = req.body;
    const profile = req.file.filename;
    
    try {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = new users({
        userName,
        email,
        password: passwordHash,
        picture:profile
      });
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };

  exports.login = async (req, res) => {
    console.log("inside login api");
    try {
      const { email, password } = req.body;
  
      const existingUser = await users.findOne({ email: email });      
      if (!existingUser) return res.status(400).json("user does not exists..");
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) return res.status(400).json("invalid credentials..");
  
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
      const { password: userpassword, ...userWithoutPassword } =
        existingUser.toObject();
      res.status(200).json({ token, user: userWithoutPassword });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };