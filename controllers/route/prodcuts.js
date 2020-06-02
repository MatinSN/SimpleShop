const express = require("express")
const Routes = require("../../utils/routes")
const router = express.Router()
const auth = require("../middleware/auth")
const ProductCRUD = require("../uitilityFunctions/productCrud")


router.get(Routes.GET_PRODUCTS,(req,res)=>{
    res.send({
        name:"Matin"
    })
})

router.post(Routes.ADD_PRODUCT,auth,async(req,res)=>{
        try{
          const newProduct = await ProductCRUD.addProduct(req.body)
          res.status(201).send(newProduct)
        }
        catch(e){
          res.status(400).send({error:e.message})
        }
})

module.exports = router;