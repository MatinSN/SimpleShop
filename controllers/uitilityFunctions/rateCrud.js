const Rate = require("../../models/rate")

const addRate =async  (productId,owner,value,comment="")=>{
   try{
      const newRate = await new Rate({productId,owner,value,comment}).save()
      return newRate
   }
   catch(e){
     throw e
   }
}

const getRate = async (productId,owner)=>{
   try{
      const rate = await Rate.findOne({productId,owner})
      if(!rate){
          throw new Error("Couldn't find any rating for this product!")
      }
      return rate
   }
   catch(e){
      throw e
   }
}





module.exports = { 
    addRate,
    getRate
}