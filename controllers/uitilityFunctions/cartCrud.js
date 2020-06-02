const Cart = require("../../models/cart")
const Product = require("../../models/product")


const addCart = async (ownerId)=>{
    try{

        const newCart = await new Cart({
            totalPrice:0,
            owner : ownerId._id

        }).save()
        return newCart;
    }
    catch(e){
        throw e;
    }
}

const addToCart = async (cart,productId)=>{
   try{
       const product = await Product.findById(productId)
       if(!product){
           throw new Error("Product not found!")
       }
       const cartItemIndex = cart.products.findIndex((item) => {
          return item.product._id.toString() === productId
         })
       if(cartItemIndex == -1){
        cart.products = cart.products.concat({product : product._id,quantity: 1})
       }
       else{
        cart.products[cartItemIndex].quantity += 1;
       }
       cart.totalPrice = cart.totalPrice + product.price 
       await cart.save()
       await populateProductsField(cart)
       
      
   }
   catch(e){
       throw e
   }
}

const getPopulatedCart = async(cart)=>{
    try{
         await populateProductsField(cart)
    }
    catch(e){
        throw e
    }
}

const removeFromCart = async (cart,productId) =>{
    try{
        
        const cartItemIndex = cart.products.findIndex((item) => {
          return item.product._id.toString() === productId
        })
        const product = await Product.findById(productId)
        if(cartItemIndex === -1){
            throw new Error("There is no such product in the cart!")
        }

        else if(cart.products[cartItemIndex].quantity === 1){
            console.log("here1")
            cart.products.splice(cartItemIndex,1)
        
        }
        
        else {
            console.log("here2")

            cart.products[cartItemIndex].quantity  -= 1

        }
    
        cart.totalPrice = cart.totalPrice -  product.price
        if(cart.totalPrice < 0 ){
            cart.totalPrice = 0
        }
        await cart.save()
        return cart
    }
    catch(e){
        throw e
    }
}

const removeAllFromCart = async (cart)=>{
    try{
       
        cart.products = []
        await cart.save()
    }
    catch(e){
        throw e;
    }
}

const populateProductsField = async (cart)=>{
    try{
        await cart.populate("products.product").execPopulate()
    }
    catch(e){
        throw e;
    }
}


module.exports = {addCart,addToCart,getPopulatedCart,removeFromCart,populateProductsField,removeAllFromCart}