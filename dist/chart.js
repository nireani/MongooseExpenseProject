let expenseChart = document.getElementById('myChart').getContext('2d')
let expenseLabels = []
let expenseData = []
let expenseColors =["#CC59D2","#FDCA40","#7AE7C7","#b0fe76","#EF8275"]



let expenseChartByGroup = new Chart( expenseChart,{
    type:'pie',
    data:{
        labels:expenseLabels,
        datasets:[{
            data:expenseData,
            backgroundColor:expenseColors
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Expense by Category'
            }
        }
    }
})
function addData(chart,label1,data1) {
    chart.data.labels= label1
    chart.data.datasets[0].data=data1
    chart.update();
}

const chartUpdate = function (){
    let expenseLabels = []
    let expenseData = []
$.get('expensesGroup',function(group){
        group.forEach(g=>[expenseLabels.push(g._id),expenseData.push(g.total)])
         addData(expenseChartByGroup,expenseLabels,expenseData)
       })
    }
    chartUpdate()  

const filteredChartUpdate = function (filteredByDateGroupedToChart){
    let expenseLabels = []
    let expenseData = []
    filteredByDateGroupedToChart.forEach(g=>[expenseLabels.push(g._id),expenseData.push(g.total)])
        console.log(expenseLabels,expenseData);
         addData(expenseChartByGroup,expenseLabels,expenseData)
       }
    
    

    

    









