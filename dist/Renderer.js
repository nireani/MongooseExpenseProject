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
    $.get('/expenses', function (expenses) {
        $(".table-container").empty()
        const source = $("#expense-template").html()
        const template = Handlebars.compile(source)
        const newHTML = template({ expenses: expenses })
        $(".table-container").append(newHTML)
        chartUpdate()
    })

}
renderExpenses()





