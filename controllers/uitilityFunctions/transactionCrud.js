const Transaction = require("../../models/transaction")

const addTransaction =async  (productId,owner,approvalStatus=false,quantity)=>{
   try{
       console.log(quantity)
      const newTransaction = await new Transaction({productId,owner,approvalStatus,quantity}).save()
      return newTransaction
   }
   catch(e){
     throw e
   }
}

//This function returns all transctions for one product
const getTrasactions = async (productId,owner)=>{
   try{
      const transactions = await Transaction.find({productId,owner})
      if(transactions.length === 0){
          throw new Error("Couldn't find any transaction!")
      }
      return transactions
   }
   catch(e){
      throw e
   }
}

const getUserTransactions = async (owner)=>{
    try{
       const userTransactions = await Transaction.find({owner})
       return userTransactions
    }
    catch(e){
        throw e;
    }
}

module.exports = { 
    addTransaction,
    getTrasactions,
    getUserTransactions
}