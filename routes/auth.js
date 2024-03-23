const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Sign up

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashpassword });
    await user.save().then(() => res.status(200).json({ message: "Sign up successfully" }));
  } catch (error) {
    res.status(200).json({ message: "User already Exist" });
  }
});
module.exports = router;

// Log in
router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({ message: 'Please sign up first' });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(200).json({ message: 'Password is not correct' });
    }

    // Password is correct, send user data without password
    const { password, ...others } = user._doc;
    return res.status(200).json({ user: others });

  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


// router.post("/signin", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       res.status(200).json({ message: "Please Sign up first" });
//     }
//     const isPasswordCorrect = bcrypt.compareSync(
//       req.body.password,
//       user.password
//     );
//     if(!isPasswordCorrect){
//       res.status(200).json({message: "password is not correct"});
//     }
//     const {password, ...others} = user._doc;
//     res.status(200).json({ others });

//   } catch (error) {
//     res.status(200).json({ message: "User already Exist" });
//   }
// });
// module.exports = router;
