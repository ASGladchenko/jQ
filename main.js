let userTable = $('#user_table')
let btn_render = $('#btn_render_table')
$(btn_render).click(function () {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users",
    }).done(function (users) {
        addRenderFuncInUser(users)
        renderTable(users)
    })
    $(btn_render).remove()
});

$(userTable).on('click', (event) => {
    let target = event.target
    let tr = event.target.closest('tr')
    let activeTr = $('*.content-table')

    if ($(target).hasClass('fa-regular fa-trash-can')) $(tr).remove()
    if ($(tr).hasClass("content-table")) {
        $(tr).toggleClass('tr-active')
        $(tr).find('input').attr('checked', function (_, attr) {
            return !attr
        });

    }
    if ($(target).prop('tagName') === "BUTTON") {
        $(activeTr).each(function (_, tr) {
            if ($(tr).hasClass('tr-active')) $(tr).remove()
        })
    }
})

function addRenderFuncInUser(users) {
    $(users).map(function (user) {
        user.renderUserInTable = renderUserInTable
    })
}

function renderUserInTable(user) {
    let userTableData = `
        <tr class="content-table">
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.website}</td>
                    <td><input type="checkbox"></td>
                    <td><i class="fa-regular fa-trash-can"></i></td>
                </tr>`
    $('#users tbody').append(userTableData)

}

function renderTable(users) {
    let tableHeader =
        `
        <table id="users" >
          <Caption> Table with users data <button>Delete all selected</button> </Caption>
            <tr class="table-keys">
                <td>Id</td>
                <td>Name</td>
                <td>User name</td>
                <td>Em@il</td>
                <td>Phone number</td>
                <td>Website</td>
                <td></td>
                <td></td>
            </tr>
        </table>
        `
    $(userTable).append(tableHeader)
    $(users).each((_, user) => {
        renderUserInTable(user)
    })
}

