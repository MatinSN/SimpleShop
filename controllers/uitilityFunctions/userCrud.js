const Member = require("../../models/member")

const addMember = async(memberInfo={})=>{
    try{
        const member =await new Member(memberInfo).save()
        const token = await member.addAuthToken()
        return {member,token}     
    }
    catch(e){
      throw e
    }
  
}

const updateMember = async (updates={},user) =>{
    const allowedUpdated = ["username","password","email","fullName","address","gender","birthDate"]
   
    const updatesKeys = Object.keys(updates)
    
    const isValidOperation = updatesKeys.every((update)=>{
        return allowedUpdated.includes(update)
    })
    if(!isValidOperation){
        throw new Error("Invalid Updates!")
    }
    try{
        updatesKeys.forEach((key)=>user[key] = updates[key])
        await user.save()
    }
    catch(e){
       throw e
    }
}

module.exports={
    addMember,
    updateMember
}