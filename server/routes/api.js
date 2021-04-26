const express = require('express')
const router = express()
const Expense = require('../../modules/Expense')
const moment = require('moment')

router.get('/expenses', function (req, res) {

    let formatD1 = moment(req.query.d1).format('LLLL')
    let formatD2 = moment(req.query.d2).format('LLLL')


    if (req.query.d1 && req.query.d1) {
        Expense.find({ $and: [{ date: { $gt: formatD1 } }, { date: { $lt: formatD2 } }] }, function (err, filteredExpenses) {
            res.send(filteredExpenses);
        }
        ).sort({ date: -1 })
    }

    if (req.query.d1 && !req.query.d2) {
        Expense.find({ $and: [{ date: { $gt: formatD1 } }, { date: { $lt: moment().format('LLLL') } }] }, function (err, filteredExpenses) {
            res.send(filteredExpenses)
        }
        ).sort({ date: -1 })

    }
    if(!req.query.d1&&!req.query.d1){
        Expense.find({}, function (err, allExpenses) {
            res.send(allExpenses);
        }).sort({ date: -1 })
    }
})



router.get('/expenses/:group', function (req, res) {
    let group = req.params.group
    let total = req.query.total

    if (total) {
        Expense.aggregate([
            { $match: { group: group } },
            { $group: { _id: "$group", totalAmount: { $sum: "$amount" } } }], function (err, total) {
                res.send(total)
            })
    } else {
        Expense.find({ group: group }, function (err, expensesByGroup) {
            res.send(expensesByGroup)
        })
    }
})


router.post('/expense', function (req, res) {
    let amount = req.query.amount
    let item = req.query.item
    let group = req.query.group
    let date

    if (req.query.date) {
        date = moment(req.query.date).format('LLLL')
    } else {
        date = moment().format('LLLL')
    }
    
    const newEx = new Expense({
        amount: amount,
        item: item,
        group: group,
        date: date
    })
    newEx.save()
    console.log(`amount of ${newEx.amount} was spend in ${newEx.date}`)
    res.end()
})



router.put('/update', function (req, res) {
    let group1 = req.query.group1
    let group2 = req.query.group2

    Expense.findOneAndUpdate({ group: group1 }, { group: group2 }, function () {
        res.end()
    })
    console.log(`first item group ${group1} changed to ${group2}`)
    res.end()
})


module.exports = router