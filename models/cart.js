const mongoose = require("mongoose")



const Schema = mongoose.Schema


const CartSchema = new Schema({
    owner:{
      required:true,
      type:Schema.Types.ObjectId,
      ref:"Member"
    },
    totalPrice:{
      type: Number,
      required:true
    },
    products:[
      {
        product:{
          type:Schema.Types.ObjectId,
          required:true,
          ref:"Product"
        },
        quantity:{
          type:Number,
          required:true
        }
      }
    ]
})


const Cart = mongoose.model("Cart",CartSchema)


module.exports = Cart