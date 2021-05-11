const express = require('express')
const router = express()
const Expense = require('../../modules/Expense')
const moment = require('moment')
const data = require('../../data.json')

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
    
    if (!req.query.d1 && !req.query.d1) {
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


router.get('/expensesGroup', function (req, res) {

    Expense.aggregate([{ $group: { _id: "$group", total: { $sum: "$amount" } } }], function (err, total) {
        res.send(total)
    })
})


router.get('/expensesGroupByDate', function (req, res) {

    const startDate = moment(req.query.d1).format('LLLL')
    const endDate = moment(req.query.d2).format('LLLL')

    Expense.aggregate([
        {
            $match: {
                date: { $gt: new Date(new Date(startDate).setHours(00, 00, 00)), $lt: new Date(new Date(endDate).setHours(23, 59, 59)) }
            }
        },{$group:{
            _id:'$group',
            total:{$sum:'$amount'}
        }}
    ], function (err, total) {
        res.send(total)
    })

    
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
    res.end()
})



router.put('/update', function (req, res) {

    let group1 = req.query.group1
    let group2 = req.query.group2

    Expense.findOneAndUpdate({ group: group1 }, { group: group2 }, function () {
        res.end()
    })
    res.end()
})


router.delete('/expense', function (req, res) {

    let id = req.query.id

    Expense.findOneAndRemove({ _id: id }, function (err, cities) {
        res.end()
    })
})


module.exports = router