$(document).ready( function () {
    var cookies = document.cookie.split(";");
    var cookie = "";
    for(const c of cookies){
        if(c.includes("search=")){
            cookie = c.split("=")[1];
            break;
        }
    }

    $('#basic').DataTable({
        dom: 'lBftrip',
    buttons: [
        'colvis',
        'excel',
        'print'
    ],
        scrollX: "auto",
        lengthMenu: [
            [-1, 10],
            ['All', 10],
        ],
        scrollY: '700px',
        scrollCollapse: true,
        search:{
            search: cookie
        },
        columnDefs:[ {
            targets: 0,
            orderable: false
            } ],
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
    } );

    var serachInput = $("#basic_filter label input");
    serachInput.keyup(function(){
        var value = serachInput.val();
        const d = new Date();
        d.setTime(d.getTime() + (0.5*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = "search="+ value+ ";"+ expires;
        if (window.history.replaceState) {
            window.history.replaceState("", "CRM", window.location.origin+ "?search="+ value);
         }
    });

    

    $(".dataTables_length").append($('<div class="table-filter"><button id="delete-btn">Smazat vybrané</button>'+
     ' <a class="bn49" href="addEventForm.php">Přidání události</a><a class="bn49 zpet" href="/">Zpět na firmy</a> </div>'));

    $("#delete-btn").click(function(){
    //console.log(this);
    var selected = $(".check:checked");
    
    console.log(selected);
    if(selected.length > 0){
        $.confirm({
            title: 'Opravdu chcete smazat tyto události ?',
            content: 'Smazat '+ selected.length+ ' událostí?',
            buttons: {
                yes: {
                    text: 'Ano',
                    btnClass: 'btn-blue',
                    keys: ['enter', 'shift'],
                    action: function(){
                        var array = [];
                        for (const tr of selected) {
                            array.push($(tr).attr('id'));
                        }
                        console.log(array);
                        $.ajax({
                            url:"./deleteEvents.php",
                            method:"POST",
                            data: {"ids":array},
                            success:function(response) {
                                console.log(response);
                                location.reload();
                            },
                            error:function(){
                                alert("error");
                            }
                
                         }); 
                                        }
                },
                no: {
                    text: 'Ne',
                    btnClass: 'btn-gray',
                    keys: ['enter', 'shift'],
                    action: function(){
                       
                    }
                }             
            }
        });
    }
    });

    $('#basic').DataTable().on( 'search.dt', function () {
        var serachInput = $("#basic_filter label input");
        var value = serachInput.val();
        if(value == ""){
            Setcookie("");
        }else {
            Setcookie(value);
        if (window.history.replaceState) {
            window.history.replaceState("", "CRM", window.location.origin+ "?search="+ value);
         }
        }
    } );


    $("#export-btn").click(function(){
        var selected = $(".selected");
        if(selected.length > 0){
            var array = [];
                        for (const tr of selected) {
                            array.push($(tr).attr('id'));
                        }
                        console.log(array);
                        var form = document.createElement("form");
                        form.method = "POST";
                        form.action = "/firms/exportFirms.php";

                        var data = document.createElement("input");

                        var json = {"ids": array};
                        data.value = JSON.stringify(json);
                        data.name = "ids";
                        data.type = 'hidden';

                        form.appendChild(data);

                        document.body.appendChild(form);

                        form.submit();
        }
    })
        
} );