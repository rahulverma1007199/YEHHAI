const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//Register
router.post("/register", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});


//Login
router.post("/login", async (req,res)=>{
    try {
        const user =await User.findOne({username:req.body.username});
        !user && res.status(400).json("Wrong Credntials !");
        if(user.isAuth){
          const validate = await bcrypt.compare(req.body.password,user.password);
          !validate && res.status(400).json("Wrong Credntials !");
          const {password, ...others} = user._doc;
          res.status(200).json(others);
        }else{
          res.status(401).json("You are not Authenticated by Admin");
        }
     } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
