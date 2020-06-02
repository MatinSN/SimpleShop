const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    productType:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    }
})


const Product = mongoose.model("Product",ProductSchema)


module.exports = Product