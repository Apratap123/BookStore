const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const auth = require("../Auth/authentication.js")

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        if (!username || !email || !password || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (username.length < 3) {
            return res.status(400).json({ message: "Username length should be greater than 3" });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const emailExisting = await User.findOne({ email });
        if (emailExisting) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length < 5) {
            return res.status(400).json({ message: "Password should be greater than 5" });
        }

        const hashPassword = await bcrypt.hash(password, 8);

        const newUser = new User({
            username,
            email,
            password: hashPassword,
            address
        });

        await newUser.save();
        return res.status(201).json({ message: "Signup successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const tokenData = { email: user.email, role: user.role };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        // Set Cookie and Send Response
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                sameSite: "strict"
            })
            .json({
              id: user._id,
              username:user.username,
              email: user.email,
              role: user.role,
              token
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error" });
    }
});


//get-user Information
router.get("/getUser", auth, async (req, res) => {
  try {
    const id = req.user?.id || req.headers.id; // Get ID from authenticated user or headers

    // Validate if ID is provided
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch user from the database
    const data = await User.findById(id).select('-password');

    // Check if user exists
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.put("/userUpdate",auth, async(req,res)=>{
  try{

    const {id} = req.headers;
    const {address} = req.body;
     await User.findByIdAndUpdate(id, {address: address});
     return res.status(200).json({message:"Address updated Successfully"});
  }catch(error){
    console.log(error);
    res.status(501).json({message:"Internal server error"});
  }
})


module.exports = router;
