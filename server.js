const express = require('express')
const mongoose = require('mongoose')
const Expense = require('./modules/Expense')
const app = express()
const api = require('./server/routes/api')
const data = require('./data.json')

mongoose.connect("mongodb://localhost/mongoose-expense-project",{ useUnifiedTopology: true })



app.use('/',api)

const saveExpense = function(e){
      newE = new Expense({
    item: e.item,
    amount: e.amount,
    date: e.date,
    group:e.group 
    }),
    newE.save()
}
// data.forEach(d=>saveExpense(d))
    

const port = 3006
app.listen(port,function(){
    console.log(`server running on port ${port}`);
})