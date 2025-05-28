const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Book = require('../models/book.js')
const auth = require('../Auth/authentication.js')

//Add to cart
router.put('/add-cart', auth, async (req, res) => {
  try {
    const { bookid, id } = req.headers
    const userData = await User.findById(id)
    const isCart = userData.cart.includes(bookid)
    if (isCart) {
      return res.json({
        status: 'Success',
        message: 'Book is already in cart'
      })
    }
    await User.findByIdAndUpdate(id, {
      $push: { cart: bookid }
    })
    return res.status(200).json({ message: 'Book added to cart' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server error' })
  }
})


//remove to cart

router.put("/remove-cart/:bookid",auth, async (req, res) => {
  try {
    const { id } = req.headers;
    const { bookid } = req.params;

    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ status: "Error", message: "User not found" });
    }

    const isCart = userData.cart.includes(bookid);
    
    if (!isCart) {
      return res.status(400).json({
        status: "Error",
        message: "Book is not in the cart"
      });
    }

    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookid }
    });

    return res.status(200).json({ status: "Success", message: "Book removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.get("/get-user-cart", auth,async(req,res) => {
  try{

    const {id} = req.headers;

    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();
    console.log(cart)
    return res.json({
      status: "Success",
      data: cart,
    })

  }catch(error){
    console.log(error);
    res.status(500).json({message:"Internal Server error"});
  }
})


module.exports = router
