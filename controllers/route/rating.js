const express = require("express")
const Routes = require("../../utils/routes")
const router = express.Router()
const auth = require("../middleware/auth")
const RateCrud = require("../uitilityFunctions/rateCrud")
const Rate = require("../../models/rate")


router.get(Routes.GET_RATING,auth,async (req,res)=>{
    
 
    try{
        const rate = await RateCrud.getRate(req.params.id,req.user._id)
        res.send(rate)
    }
    catch(e){
        res.status(404).send({error:e.message})
    }
})

router.post(Routes.RATING,auth,async(req,res)=>{
        try{
          const {value,comment=""} = req.body
          const rate = await Rate.findOne({owner:req.user._id,productId:req.params.id})
          if(!rate){
            const newRate = await RateCrud.addRate(req.params.id,req.user._id,value,comment)
            res.send(newRate)
          }
          else{
            rate.value = value
            rate.comment = comment
            await rate.save()
            res.send(rate)
          }
        
        }
        catch(e){
          res.status(400).send({error:e.message})
        }
})

module.exports = router;