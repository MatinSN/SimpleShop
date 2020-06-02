const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const MAX_RATE = 10

const RateShema = new Schema({
    owner:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:"Member"
      },
    productId:{
        required:true,
        type:Schema.Types.ObjectId
    },
    value:{
        type:Number,
        max:MAX_RATE,
        min:0,
        required:true
    },
    comment:{
        type:String
    }
})


const Rate = mongoose.model("Rate",RateShema)


module.exports = Rate