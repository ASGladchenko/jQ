let userTable = $('#user_table')
let btn_render = $('#btn_render_table')


$(btn_render).click(function () {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users",
    }).done(function (users) {
        addRenderFuncInUser(users)
        renderTable(users)
    })
    $(btn_render).hide()
});

$(userTable).on('click', (event) => {
    let target = event.target
    let tr = event.target.closest('tr')
    let tableTr = $('*.content-table')
    let table = $('#users')


    if ($(target).hasClass('fa-regular fa-trash-can')) dataAvailabilityCheck(tr, table)

    if ($(tr).hasClass("content-table")) {

        $(tr).toggleClass('tr-active')

        $(tr).find('input').attr('checked', function (_, attr) {
            return !attr
        });

    }

    if ($(target).attr('id') === 'btn_delete') {
        $(tableTr).each(function (_, tr) {
            if ($(tr).hasClass('tr-active')) dataAvailabilityCheck(tr, table)
        })

    }

    if ($(target).attr('id') === 'btn_select_all') {
        selectAll(tr)

    }
})

function dataAvailabilityCheck(tr, table) {
    $(tr).remove()

    if ($('*.content-table').length === 0) {
        table.remove()
        $(btn_render).show()
    }
}

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

function selectAll() {
    let res;
    $('*.content-table').each(function (_, el) {if (!$(el).hasClass('tr-active')) res = true});
    if (res) {
        $('*.content-table').each(function (_, el) {
            $(el).addClass('tr-active')
            $(el).find('input').attr('checked', function (_, attr) {
                return 'checked'
            });

        })

    } else {$('*.content-table').each(function (_, el) {
            $(el).removeClass('tr-active')
            $(el).find('input').attr('checked', function (_, attr) {
                return !attr
            });

        })}
}

function renderTable(users) {
    let tableHeader =
        `
        <div class="users_table_empty d-none"><span>Table is empty</span></div>
        <table id="users" >
          <Caption> Table with users data<button id="btn_select_all">Select all</button>  <button id="btn_delete">Delete all selected</button> </Caption>
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
































