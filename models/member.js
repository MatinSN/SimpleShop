const mongoose = require("mongoose")
const validator = require("validator")
const Schema =mongoose.Schema;
const uniqueValidation=require('mongoose-beautiful-unique-validation')
const Helpers = require("./utility_functions/helper_functions")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const MemberSchema=new Schema({

  username:{
      type:String,
      required:true,
      trim:true,
      unique:true
  },
  password:{
     type:String,
     trim:true,
     required:true,
     lowercase:true
  },
  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    unique:true,
    validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Email is invalid!!")
        }
    }
  },
  tokens:[
    {
      token:{
        type:String,
        required:true
      }
    }
  ],
  fullName:{
      type:String
  },
  address:{
    type:String
  },
  phone:{
    type:String
  },
  gender:{
    type:String
  },
  birthDate:{
   type:Date
  },
  cart:{
    type:Schema.Types.ObjectId,
    ref:"Cart"
  }

}
)

// MemberSchema.virtual("cart",{
//   ref:"Cart",
//   localField: "_id",
// foreignField: "owner"
// })

MemberSchema.statics.findByCredentials = async (email,password)=>{
  const member = await Member.findOne({email})
  if(!member){
    throw new Error ("your username or password is incorrect!!")
  }
   console.log(password,member.password)
   const isMatch = bcrypt.compare(password,member.password)
   if(!isMatch){
     throw new Error("Your username of password is incorrect!!")
   }
   
   return member
}

MemberSchema.methods.toJSON = function(){
  const user = this
  const userObject = user.toObject();
  delete userObject.password
  delete userObject.tokens
  delete userObject.id
  return userObject
}

MemberSchema.methods.addAuthToken = async function(){
  const user = this;
  const token = await jwt.sign({_id:user._id.toString()},"MyJwtSecret")
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

MemberSchema.pre("save",async function(next){
  const member = this;
  if(member.isModified("password")){
    member.password  =await bcrypt.hash(member.password,8)
  }
  next();
})

MemberSchema.set("toObject",{virtuals:true})
MemberSchema.set("toJSON",{virtuals:true})

const Member = mongoose.model("Member",MemberSchema)



module.exports = Member

