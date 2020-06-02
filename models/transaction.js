const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    owner:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:"Member"
      },
    productId:{
        required:true,
        type:Schema.Types.ObjectId
    },
    quantity:{
        required:true,
        type:Number
    },
    approvalStatus:{
        type:Boolean,
        required:true
    }
})


const Transaction = mongoose.model("Transaction",TransactionSchema)


module.exports = Transaction