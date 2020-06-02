const express = require("express")
const Routes = require("../../utils/routes")
const auth = require("../middleware/auth")
const CartCRUD = require("../uitilityFunctions/cartCrud")
const Cart = require("../../models/cart")

const router = express.Router()




//remove a product from cart by getting the product's id
router.delete(Routes.REMOVE_FROM_CART,auth,async (req,res)=>{
  try{
    const cart = await Cart.findById(req.user.cart)
    if(!cart){
      throw new Error("Cart not found!")
    }
    await CartCRUD.removeFromCart(cart,req.params.id)
    
    await CartCRUD.populateProductsField(cart)
    res.send(cart)
  }
  catch(e){
    res.status(400).send({error:e.message})
  }
})

//Add a product to a cart by getting the product's id
router.post(Routes.ADD_TO_CART,auth,async(req,res)=>{

    try{
    
        await req.user.populate("cart").execPopulate()
        console.log(req.user.cart)
        await CartCRUD.addToCart(req.user.cart,req.params.id)
        res.send(req.user.cart)
      }
      catch(e){
          res.status(400).send({error:e.message})
      }
})





router.get(Routes.GET_CART,auth,async(req,res)=>{

    try{
        
    await req.user.populate("cart").execPopulate()
    await CartCRUD.getPopulatedCart(req.user.cart)
      res.send(req.user.cart)
    }
    catch(e){
      res.status(400).send(e.message)
    }
})





module.exports = router;