
const chalk = require("chalk")
const express = require("express")
const productsRouter = require("./route/prodcuts")
const userRouter = require("./route/user")
const cartRouter = require("./route/cart")
const ratingRouter = require("./route/rating")
const transactionRouter = require("./route/transaction")
require("./dbConnection")

const port = process.env.PORT


const app = express()

app.set("view engine","hbs")

app.use(express.json())
app.use(productsRouter)
app.use(userRouter)
app.use(cartRouter)
app.use(ratingRouter)
app.use(transactionRouter)




app.listen(3000,()=>{
    console.log(chalk.bgGreen("Server is running on port "+ port))
})