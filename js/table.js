$( window ).on( "resize", function() {
  
} );



$(document).ready(function () {



 var $chkboxes = $('.check');
    var lastChecked = null;

    $chkboxes.click(function(e) {
        if (!lastChecked) {
            lastChecked = this;
            return;
        }

        if (e.shiftKey) {
            var start = $chkboxes.index(this);
            var end = $chkboxes.index(lastChecked);

            $chkboxes.slice(Math.min(start,end), Math.max(start,end)+ 1).prop('checked', lastChecked.checked);
        }

        lastChecked = this;
    });
    

    var cookies = document.cookie.split(";");
    var cookie = "";
    for (const c of cookies) {
        if (c.includes("search=")) {
            cookie = c.split("=")[1];
            break;
        }
    }



        $('#basic').DataTable({
        stateSave: true,
        dom: 'lBftrip',
        buttons: [
            'colvis',
            'excel',
            'print'
        ],
        scrollX: "auto",
        lengthMenu: [
            [-1, 10,20,30,40,50],
            ['vše', 10,20,30,40,50,100],
        ],
        //scrollY: '700px',
        scrollCollapse: true,
        search: { 
            search: cookie
        },
        columnDefs: [{
            targets: 0,
            orderable: false
        }],
       // responsive: true,
        /*Vojta*/
        language: {
            search: "",
            searchPlaceholder: "Vyhledávání",
            lengthMenu:     "Ukazat _MENU_ záznamy",
            zeroRecords:    "Nebyli nalezeny žádné výsledky",
            info:           "Ukazuje _START_ do _END_ z _TOTAL_ záznamů",
            infoFiltered:   "(Filtrované z _MAX_ celkových záznamů)",
            "paginate": {
                first:      "První",
                last:       "Poslední",
                next:       "Další",
                previous:   "Minulé"
            },
            infoEmpty:      "Ukazuje 0 do 0 z 0 záznamů",
            loadingRecords: "Načítání...",
            zeroRecords:    "Nenalezeny žádné záznamy",
        },

  
        initComplete: function (settings, json) {
            $('.dataTables_scrollBody').height($(window).innerHeight() - 220);
            // TOMASAN7 - EDIT START
            $('#basic tbody').on('click', 'td', function () {
                if (!this.classList.contains("name"))
                    return;
                editClick(this.parentElement.id, 1);
            });
            // EDIT END
        }

    });//$('#basic').DataTable({
    
    

    $(".dataTables_length").append(
        $('<div id ="hamburger" class="topnav">' +
            '' +
            '<div class="table-filter">' +
            '<button class="bn49" id="edit-btn">Upravit vybrané</button>' +
            '<a class="bn49" href="#" id="link">Přidání Firmy</a>' +
			' <div id="myLinks"><label>Aktivní:<input type="checkbox" id="check-active" checked></label>' +
            
            
            '<button class="bn49" id="delete-btn">Odstranit vybrané</button>' +
            '<button class="bn49" id="export-btn">Exportovat vybrané</button>' +
            '<button class="bn49" id="export-vcard">vCard export</button>' +
            
            
			'<a class="bn49 " href="/columns/columnForm.php">Úpravy sloupců</a>' +
            '<a class="bn49 " href="/events/tableEvents.php">Události</a>' +
            '<button class="bn49" id="edit-rows">Hromadná změna sloupce</button>' +
            '<input id="email-btn" class="bn49" type="submit" value="Poslat email vybranym"></div>' +
			'<a href="javascript:void(0);" class="icon" onclick="myFunction()"><i class="fa fa-bars"></i></a></div></div>'
        )
    );
    
    

    $("#closeIframe").on('click',function () {
        clearEditFirmForm();
        $(".myframe2").hide();
    
    });

    function clearEditFirmForm() {
    $(".form").trigger('reset');
    /*$(".form").children().each(function(){
    console.log($(this));
        $(this).reset();
    });
    */
    $(".form").attr("id","");
    
}

    var table = $('#basic').DataTable().on('search.dt', function () {
        var serachInput = $("#basic_filter label input");
        var value = serachInput.val();
        if (value == "") {
            Setcookie("");
			//window.history.replaceState("", "CRM", window.location.origin + "table.php?search=" + value);
        } else {
            Setcookie(value);
            if (window.history.replaceState) {
              //  window.history.replaceState("", "CRM", window.location.origin + "table.php?search=" + value);
            }
        }
    });
    
   
    var checkActive = $("#check-active");
    $('#basic').DataTable().column(4).search("1", true, false, true).draw();
    checkActive.on('change', function () {
        if (checkActive.prop("checked") == true) {
            $('#basic').DataTable().column(4).search("1", true, false, true).draw();
        } else {
            $('#basic').DataTable().column(4).search("0", true, false, true).draw();
        }

    });

    $("#delete-btn").click(function () {
        var selected = $(".check:checked");
        if (selected.length > 0) {
            $.confirm({
                title: 'Opravdu chcete smazat tyto firmy ?',
                content: 'Smazat ' + selected.length + ' firem?',
                buttons: {
                    yes: {
                        text: 'Ano',
                        btnClass: 'btn-blue',
                        keys: ['enter', 'shift'],
                        action: function () {
                            var array = [];
                            for (const tr of selected) {
                                array.push($(tr).attr('id'));
                            }
                            console.log(array);
                            $.ajax({
                                url: "/firms/deleteFirms.php",
                                method: "POST",
                                data: { "ids": array },
                                success: function (response) {
                                    //console.log(response);
                                    location.reload();
                                },
                                error: function () {
                                    alert("error");
                                }

                            });
                        }
                    },
                    no: {
                        text: 'Ne',
                        btnClass: 'btn-gray',
                        keys: ['enter', 'shift'],
                        action: function () {

                        }
                    }
                }
            });
        }
    });

$("#export-vcard").click(function () {
    var id = $(".check:checked").attr("id");
    location.href="http://lm/vcard_export.php?id="+id;
});

/*
* ==================================
* Lukáš "Trup10ka" Friedl EDIT START
* ==================================
* */

$("#export-btn").click(function () {
    let selected = $(".selected")

    if (selected.length <= 0)
        return

    let array = []
    for (const tr of selected)
        array.push($(tr).attr('id'))

    let form = document.createElement("form")
    form.name = "expF"
    form.method = "POST"
    form.action = "/firms/exportFirms.php"

    let data = document.createElement("input")

    let json = { "ids": array }
    data.value = JSON.stringify(json)
    data.name = "ids"
    data.type = 'hidden'

    form.appendChild(data);

    let columns = $("#table-head th");

    const thElements = document.querySelectorAll('th.sorting');
    console.log(thElements)
    const filteredColumns = Array.from(thElements).filter(th => th.style.offsetWidth > 0);
    console.log(filteredColumns)

    for (let i = 1; i < columns.length / 2; i++) {
        if (columns[i].classList[0] == "hidec")
            clname = columns[i].classList[1]
        else
            clname = columns[i].classList[0]

        let formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        let label = document.createElement("label");
        label.setAttribute("for", "for" + clname);
        let textNode = document.createTextNode(columns[i].textContent + ": ");
        label.appendChild(textNode);
        formGroup.appendChild(label);


        let elm = document.createElement("input");
        elm.name = clname;
        elm.type = 'checkbox';
        elm.value = "1";
        for (let j = 0; j < filteredColumns.length; j++)
            if (filteredColumns[j].classList.contains(clname))
            {
                elm.checked = true;
                break;
            }
        elm.classList.add('exportCheckbox');
        elm.setAttribute("id", "for" + clname);
        formGroup.appendChild(elm);

        form.appendChild(formGroup);
    }

    //submit button
    let submitButton = document.createElement('input');
    submitButton.value = 'Odeslat';
    submitButton.type = 'submit';
    submitButton.classList.add("exportButton");
    form.appendChild(submitButton);

    //invert button
    let invertButton = document.createElement('input');
    invertButton.value = 'Invertovat';
    invertButton.type = 'button';
    invertButton.classList.add("exportButton");
    invertButton.addEventListener('click', () => {
        let checkboxes = document.getElementsByClassName('exportCheckbox')

        for (let i = 0; i < checkboxes.length; i++)
            checkboxes[i].checked = !checkboxes[i].checked

    });

    form.appendChild(invertButton);

    //check all button
    let checkAllButton = document.createElement('input');
    checkAllButton.value = 'Vybrat vše';
    checkAllButton.type = 'button';
    checkAllButton.classList.add('exportButton');

    let isEveryChecked = false;
    checkAllButton.addEventListener('click', () => {
        let checkboxes = document.getElementsByClassName('exportCheckbox')

        if (isEveryChecked) {
            for (let i = 0; i < checkboxes.length; i++)
                checkboxes[i].checked = false;
            isEveryChecked = false;
        } else {
            for (let i = 0; i < checkboxes.length; i++)
                checkboxes[i].checked = true;
            isEveryChecked = true;
        }
    });

    form.appendChild(checkAllButton);

    let exportForm = $("#exportForm");
    exportForm.html("");
    exportForm.append(form);

    //form.submit();
});

    // Export checkbox class = 'exportCheckbox'
    // Export button class = 'exportButton'

    /*
    * ================================
    * Lukáš "Trup10ka" Friedl EDIT END
    * ================================
    * */

    $("#email-btn").click(function (event) {
        var selected = $(".selected");
        if (selected.length > 0) {
            var mailtoStr = "mailto:?bcc=";
            for (var x = 0; x < selected.length; x++) {
                var item = selected[x]
                var email = $(item).find(".email").attr("title");
                if (email != "") {
                    mailtoStr += email;
                    if (x != selected.length - 1) {
                        mailtoStr += ",";
                    }
                }
            }
            window.location = mailtoStr;
        }
    });

    $("#edit-rows").click(function(){
        var selected = $(".selected");
        if (selected.length > 0) {
            ids_str = "";
            for (var x = 0; x < selected.length; x++) {
                ids_str += $(selected[x]).attr("id")+";";
            }
            sessionStorage.setItem('ids', ids_str)
            window.location = "./firms/editRowsForm.php";
        }
    });


    function Setcookie(value) {
        const d = new Date();
        d.setTime(d.getTime() + (0.5 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = "search=" + value + ";" + expires;
    }


});//document ready



$(window).resize(function () {
    $('.dataTables_scrollBody').height($(window).innerHeight() - 180);
});

function closeIFrame2(){
    $(".myframe2").hide();
    location.reload();
}
