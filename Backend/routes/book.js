const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Book = require("../models/book.js");
const auth = require("../Auth/authentication.js");

// Add Book
router.post("/addBook", auth, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "You do not have admin privileges" });
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });

        await book.save();
        res.status(201).json({ message: "Book added successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Book Update
router.put("/bookUpdate", auth, async (req, res) => {
    try {
        const { bookid } = req.headers;

        const book = await Book.findById(bookid);
        console.log(book);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });

        res.status(200).json({ message: "Book updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete Book
router.delete("/deleteBook", auth, async (req, res) => {
    try {
        const { bookid } = req.headers;

        const book = await Book.findById(bookid);
        console.log(book)
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await Book.findByIdAndDelete(bookid);
        res.status(200).json({ message: "Book deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//get All Book
router.get("/getAllBook", async(req,res)=>{
    try{
        const book = await Book.find().sort({createdAt :-1});
        return res.json({
            status:"Success",
            data:book,
        })
    }catch(error){
        console.log(error);
        res.status(501).json({message:"Internal Server error"});
    }
})





//get recent Book
router.get("/getRecentBook", async(req,res)=>{
    try{
        const book = await Book.find().sort({createdAt :-1}).limit(4);
        return res.json({
            status:"Success",
            data:book,
        })
    }catch(error){
        console.log(error);
        res.status(501).json({message:"Internal Server error"});
    }
})



//get book by id
router.get("/getBookById/:id", async(req,res)=>{
    try{
        const {id} = req.params;
       const book =  await Book.findById(id)
        return res.json({
            status:"Success",
            data:book,
        })
    }catch(error){
        console.log(error);
        res.status(501).json({message:"Internal Server error"});
    }
})

module.exports = router;
