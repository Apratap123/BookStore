const express = require("express");
const router  = express.router();
const bookModel = require("../models/book.js");


 Router.get("/",async(req,res)=>{
    console.log("This is a home page")
 })

 
Router.get("/books",async(req,res)=>{
    try{
        const books = await bookModel.find();
        res.status(200).json({
            success:true,
            message:"Books fetched successfully",
        })
    }catch(error){
        console.error(error)
    }
})