const Product = require("../../models/product")

const addProduct =async  (productFields={})=>{
   try{
      const newProduct = await new Product(productFields).save()
      return newProduct
   }
   catch(e){
     throw e
   }
}

const getProduct = async (productId)=>{
   try{
      const product = await Product.findById(productId)
      return product
   }
   catch(e){
      throw e
   }
}

module.exports = { 
    addProduct,
    getProduct
}