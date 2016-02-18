/**
 * Created by Darmadoo on 2/16/16.
 */

function init(){
    document.getElementById('searchForm').style.marginRight = "15px";
    _bindSearch();
}

function updateTime(){
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()
    if (seconds < 10){
        seconds = "0" + seconds
    }
    if (minutes < 10){
        minutes = "0" + minutes
    }
    var t_str = hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        t_str += "PM";
    } else {
        t_str += "AM";
    }
    document.getElementById('time_span').innerHTML = t_str;
    document.getElementById('time_span').style.marginTop = "0px";
}

setInterval(updateTime, 1000);

_bindSearch = function(){
    $('#search').click(function() {
            document.getElementById("search").value = "";
            $.each($("#all").find("tr"), function() {
                $(this).show();
            });
        })
        // Enable searaching inside the modal popup
        .keyup(function () {
            _this = this;
            // Show only matching TR, hide rest of them
            $.each($("#all").find("tr"), function() {
                if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) == -1)
                    $(this).hide();
                else
                    $(this).show();
            });
        });
}

$('.name').click(function(){
    var name = $(this).text();
    $(this).html('');
    $('<input>')
        .attr({
            'type': 'text',
            'name': 'fname',
            'id': 'txt_fullname',
            'size': '15',
            'value': name
        })
        .appendTo(this);
    $('#txt_fullname').focus();Å
});

$(document).on('blur','#txt_fullname', function(){
    var parent = this.closest('.name');
    var name = $(this).val();
    $("#" + parent.id).text(name);
});

$(".dropdown-menu-right a").click(function() {
    var group = $(this).text();
    var id = this.closest('ul').id;
    var res = id.split("-");
    var str = res[0] + "_dropdown";
    $('#' + str).text(group);
});

$(".button-green").click(function() {
    var id = this.id;
    var res = id.split("-");
    var str = res[0] + "-status";
    console.log(str);
    $(this).fadeOut();
    $("#" + str).text("Yes");
});

$(document).ready(init());


