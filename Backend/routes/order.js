const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Order = require("../models/order.js");
const Book = require("../models/book.js");
const auth = require("../Auth/authentication.js");

// Place Order
router.post("/place-order", auth, async (req, res) => {
  try {
    const { id } = req.headers;
    const { orders } = req.body;

    // Validate user ID
    if (!id) {
      return res.status(400).json({ status: "Error", message: "User ID is missing" });
    }

    // Validate orders
    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ status: "Error", message: "Invalid or empty orders array" });
    }

    const orderIds = [];
    const bookIds = [];

    // Create orders using a for...of loop to ensure proper async handling
    for (const orderData of orders) {
      if (!orderData._id) {
        return res.status(400).json({ status: "Error", message: "Each order must have a valid book ID" });
      }

      // Create and save order
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      orderIds.push(orderDataFromDb._id);
      bookIds.push(orderData._id);
    }

    // Update user document (push new orders and remove from cart)
    await User.findByIdAndUpdate(id, {
      $push: { orders: { $each: orderIds } },
      $pullAll: { cart: bookIds },
    });

    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



//get order history of particular user

router.get("/get-order-history", auth, async(req,res) =>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path:"orders",
            populate:{path:"Book"},
        })


        const orderData = userData.orders.reverse();
        return res.json({
            status: "success",
            data: orderData,
        })


    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server error"});
    }
})


//get all Order 
router.get("/get-all-order", auth, async(req,res) =>{
    try{
        const userdata = await Order.find()
        .populate({
            path:"Book",
        }).populate({
            path:"User",
        })
        .sort({createdAt: -1});

        return res.json({
            status: "Success",
            data:userData
        })
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server error"})
    }
})




//Update order
router.put("/update-status/:id", auth, async(req,res) => {
    try{
        const {id} = req.params;
        await Order.findByIdAndUpdate(id, {status: req.body.status});
        return res.json({
            status: "Success",
            message:"Status Updated Successfully",
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal Server error"});
    }
})

module.exports = router;
