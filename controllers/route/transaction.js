const express = require("express")
const Routes = require("../../utils/routes")
const router = express.Router()
const auth = require("../middleware/auth")
const transactionCRUD = require("../uitilityFunctions/transactionCrud")
const cartCRUD = require("../uitilityFunctions/cartCrud")
const Cart = require("../../models/cart")
const mongoose = require("mongoose")


router.post(Routes.ADD_TRANSACTION,auth,async (req,res)=>{
    try{
        
        const userCart = await Cart.findById(req.user.cart)
        const quantity = userCart.totalPrice
        const {approvalStatus} = req.body

        if(userCart.products.length === 0){
            throw new Error("There's no product in the cart")
        }
        
        if(approvalStatus){
         await cartCRUD.removeAllFromCart(userCart)
         userCart.totalPrice = 0;
         await userCart.save()
        }

        const newTransaction = await (await transactionCRUD.addTransaction(new mongoose.Types.ObjectId(req.params.id),req.user._id,approvalStatus,quantity))
        
        res.send(newTransaction)
    }
    catch(e){
        res.status(400).send({error:e.message})
    }
})

//sends all transactions that a user has for a particular product
router.get(Routes.GET_TRANSACTIONS,auth,async (req,res)=>{
    try{
        
        const productTransactions = await transactionCRUD.getTrasactions(req.params.id,req.user._id)
        res.send(productTransactions)
    }
    catch(e){
        res.status(400).send({error:e.message})
    }
})


router.get(Routes.GET_USER_TRANSACTIONS,auth,async (req,res)=>{
    try{
        
        const userTransactions = await transactionCRUD.getUserTransactions(req.user._id)
        res.send(userTransactions)
    }
    catch(e){
        res.status(400).send({error:e.message})
    }
})

module.exports = router;