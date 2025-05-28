const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },

    books:[{
        type:mongoose.Types.ObjectId,
        ref:"Book",
        required:true,
    }],
    status:{
        type:String,
        default:"Order Placed",
        enum:["Order Placed", "Out for delivery", "Cancelled"]
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Order", orderSchema);