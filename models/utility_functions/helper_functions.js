const bcrypt = require("bcryptjs")

const hashPassword =async (password)=>{
    try{
        
        const hashedPassword = await bcrypt.hash(password,8)
        console.log(hashedPassword)
        return hashedPassword
    }
    catch(e){
       throw e
    }
    
} 

module.exports = {hashPassword}