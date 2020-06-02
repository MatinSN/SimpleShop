const express = require("express")
const Routes = require("../../utils/routes")
const UserCRUD = require("../uitilityFunctions/userCrud")
const CartCRUD = require("../uitilityFunctions/cartCrud")
const Member = require("../../models/member")
const Cart = require("../../models/cart")
const auth = require("../middleware/auth")

const router = express.Router()


router.post(Routes.LOGIN,async(req,res)=>{
    
    try{
       
       const {password,email} = req.body
       const user = await Member.findByCredentials(email,password)
       const token = await user.addAuthToken() 
       res.send({user,token})
    }
    catch(e){
        res.status(400).send(e.message)
    }
})


router.post(Routes.REGISTER,async (req,res)=>{
    try{
      const newMember= await UserCRUD.addMember(req.body)
      const newCart = await CartCRUD.addCart(newMember.member._id);
      newMember.member.cart = newCart._id
      await newMember.member.save()
      await newMember.member.populate("cart").execPopulate()
      return res.status(201).send(newMember)
    }
    catch(e){
     console.log(e.message)
     res.status(400).send(e.message)
    }
    
})
router.post(Routes.USER_EDIT,auth,async (req,res)=>{
    try{
      await UserCRUD.updateMember(req.body,req.user)
      
      res.send(req.user)
    }
    catch(e){
     res.status(400).send(e.message)
    }
  
})


router.get(Routes.GET_USER,(req,res)=>{
    res.send({})
})

module.exports = router;