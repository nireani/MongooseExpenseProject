const addExpenses = function () {
    const item = $(".name").val()
    $('.name').val('');
    const amount = $(".amount").val()
    $('.amount').val('');

    const group = $(".group").val()
    $('.group').val('');

    const date = $(".date").val()
    $('.date').val('');

    document.getElementsByClassName('name').value = ''
    $.post(`/expense?item=${item}&amount=${amount}&group=${group}&date=${date}`, function () {
        renderExpenses()

    })

}

const renderExpenses = function () {
    $.get('/expenses', function (AllExpenses) {
        $(".tableList").empty()
        const source = $("#expense-template").html()
        const template = Handlebars.compile(source)
        const newHTML = template({ expenses: AllExpenses })
        $(".tableList").append(newHTML)
        chartUpdate()
    })

}
renderExpenses()

const filteredExpenses = function(){
    const startDate = new Date($(".startDate").val()).toISOString().slice(0, 10);
    console.log(startDate);
    $('.startDate').val('');
    const endDate = new Date($(".endDate").val()).toISOString().slice(0, 10);
    console.log();
    $(".endDate").val("")
    $.get(`expenses?d1=${startDate}&d2=${endDate}`,function(filteredByDate){
        console.log(filteredByDate);
        $(".tableList").empty()
        const source = $("#expense-template").html()
        const template = Handlebars.compile(source)
        const newHTML = template({ expenses: filteredByDate })
        $(".tableList").append(newHTML)
    })
}





