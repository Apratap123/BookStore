const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const auth = require("../Auth/authentication.js");




// Add book to favourites
router.put("/add-book-to-favourite", auth, async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        // Find user
        const user = await User.findById(id);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if `favourite` field exists in user schema
        if (!user.favourite) {
            user.favourite = []; // Initialize the array if undefined
        }

        // Check if the book is already in favourites
        if (user.favourite.includes(bookid)) {
            return res.status(200).json({ message: "Book is already in favourites" });
        }

        // Add book to favourites
        await User.findByIdAndUpdate(id, { $push: { favourite: bookid } });

        return res.status(200).json({ message: "Book added successfully to favourites" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//remove book to favourite
router.put("/remove-book-to-favourite", auth, async(req,res) => {
    try{
        const {bookid, id} = req.headers;
        const user = await User.findById(id);
        const isBookFavourite = user.favourite.includes(bookid);
    if(isBookFavourite){
        await User.findByIdAndUpdate(id, { $pull: {favourite: bookid}});
    }

    return res.status(200).json({message:"Book remove Successfully"});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server error"});
    }
})


router.get("/get-favourite-book", auth, async (req, res) => {
    try {
        const { id } = req.headers;

        // Find user and populate favourite books
        const userData = await User.findById(id).populate("favourite");

        // Check if user exists
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the favourite field exists
        const favouriteBook = userData.favourite ;

        console.log(favouriteBook);

        res.json({
            status: "Success",
            data: favouriteBook,
        });

    } catch (error) {
        console.error("Error fetching favourite books:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



module.exports = router;