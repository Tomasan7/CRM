function getFirm(url,id) {  

$.getJSON( url+"procedure.php?cmd=getFirm&id="+id, function( data ) {
  
  var html="";
  $.each( data, function( key, val ) {
    $("input[name="+key).val(val);

  });
    

});  
}
  
function getFirmRow(url,id) {  
  
$.getJSON( url+"?cmd=getFirm&id="+id, function( data ) {
  
  $.each( data, function( key, val ) {
    /*console.log(val);
    console.log(".rownum"+id+" td[class*="+key+"]");
   */
    $(".rownum"+id+" td[class*="+key+"]").html(val);

  });
    

});  
}

function getFirmHidenColmn(url,id) {  
  
$.getJSON( url+"procedure.php?cmd=getFirmHidenColmn&id="+id, function( data ) {
  
  var html="";
  $(".extra").each(function() {
    $(this).remove();
  });
  
  let array_columns=data["array_columns"];
  let array_columns_names = data["array_columns_names"];
  let array_columns_types = data["array_columns_types"];
  let sql_res = data["sql_res"];
  let archon="";
    
  
  for(i=0;i<array_columns.length;i++) {
  //console.log(array_columns[i],sql_res[array_columns[i]]);
    if (sql_res[array_columns_names[i]]==="") sql_res[array_columns_names[i]]="";
    var r = /^(ftp|http|https):\/\/[^ "]+$/;
    if (r.test(sql_res[array_columns[i]])) archon="<a href='"+sql_res[array_columns[i]]+"' target='_blank'><img src='/css/link.png' style='height:1.125em;width:AUTO'></a>";else archon="";
    
    html+='<div class="field half extra"><label class="label">'+archon+' '+array_columns_names[i]+'</label>'+
      '<input class="text-input" name="'+array_columns[i]+'" type="'+array_columns_types[i]+'" value="'+sql_res[array_columns[i]]+'"></div>';
  }
  //console.log(html);
 $(".extra_colmns").before(html);      

}); 
  
}

function getFirmHidenColmn2(url) {//jen vykreslí pole  
  
$.getJSON( url+"procedure.php?cmd=getFirmHidenColmn&id=1", function( data ) {
  
  var html="";
  $(".extra").each(function() {
    $(this).remove();
  });
  
  let array_columns=data["array_columns"];
  let array_columns_names = data["array_columns_names"];
  let array_columns_types = data["array_columns_types"];
  
  let archon="";
    
  
  for(i=0;i<array_columns.length;i++) {
    
    html+='<div class="field half extra"><label class="label">'+archon+' '+array_columns_names[i]+'</label>'+
      '<input class="text-input" name="'+array_columns[i]+'" type="'+array_columns_types[i]+'" value=""></div>';
  }
  //console.log(html);
 $(".extra_colmns").before(html);      

}); 
  
}

// post-submit callback

function processJson(data) {
    //console.log(data.msg);
   
    if (data.msg==-1) $("#output1").html("Error");
    else {$("#output1").html("OK"); $("form").hide();} 
}
