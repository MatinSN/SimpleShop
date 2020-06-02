const jwt = require("jsonwebtoken")
const Member = require("../../models/member")

const auth = async (req,res,next)=>{
  
    try{
      
        const token = req.header("Authorization").replace("Bearer ","");
        const decoded = jwt.verify(token,process.env.SECRET);
        const user = await Member.findOne({
            _id:decoded._id,
            "tokens.token" :token
        })
        if(!user){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next()
    }
    catch(e){
          res.status(401).send({error:"Not Authorized!"})
    }
}

module.exports = auth;