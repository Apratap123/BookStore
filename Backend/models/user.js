const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    avatar: {
        type: String,
        default: "https://www.freepik.com/premium-ai-image/men-design-logo-avatar_167399793.htm#fromView=keyword&page=1&position=6&uuid=e3d96acb-004a-4423-9eff-3c785fa0dddc&query=Avatar"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    favourite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book" 
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"  
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order" 
    }]
}, { timestamps: true });  

module.exports = mongoose.model("User", userSchema);
