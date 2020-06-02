
const chalk = require("chalk")
const express = require("express")
const productsRouter = require("./route/prodcuts")
const userRouter = require("./route/user")
const cartRouter = require("./route/cart")
const ratingRouter = require("./route/rating")
const transactionRouter = require("./route/transaction")
require("./dbConnection")

// const yargs=require("yargs")
// const request = require("request")
// const path = require("path")
// const hbs = require("hbs")
// const fs = require("fs")


// const publicDirPath=path.join(__dirname,"/test.html")
// const pathToPatials = path.join(__dirname,"/views/partials")
// hbs.registerPartials(pathToPatials)

const app = express()

app.set("view engine","hbs")

app.use(express.json())
app.use(productsRouter)
app.use(userRouter)
app.use(cartRouter)
app.use(ratingRouter)
app.use(transactionRouter)

// app.use(express.static(publicDirPath))


// app.get("/test",(req,res)=>{
//     res.render("test",{
//         message:"This view if for testing porpuses"
//     })
//     console.log(req.query)
// })

// app.get("",(req,res)=>{
//     res.sendFile(publicDirPath)
// })



app.listen("3000",()=>{
    console.log(chalk.bgGreen("Server is running on port 3000"))
})