const express = require('express')
const mongoose = require('mongoose')
const Expense = require('./modules/Expense')
const Chart = require('chart.js');

const app = express()
const api = require('./server/routes/api')
const data = require('./data.json')

mongoose.connect("mongodb://localhost/mongoose-expense-project",{ useUnifiedTopology: true })

const path = require('path')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))



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