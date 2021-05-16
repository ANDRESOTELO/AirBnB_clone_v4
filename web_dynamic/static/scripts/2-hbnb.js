$(document).ready(function() {
    dict_amenities = {}
    $('input[type=checkbox]').change(function() {
        if ($(this).is(':checked')) {
            dict_amenities[$(this).data('id')] = $(this).data('name');
        }
        else {
            delete dict_amenities[$(this).data('id')];
        }
        list_amenities = Object.values(dict_amenities);
        if (list_amenities.length > 0) {
            const amenities = list_amenities.join(", ");
            $("DIV.amenities > h4").text(amenities);
        } else {
            $("DIV.amenities > h4").html("&nbsp;");
        }
    });

    const url = 'http://localhost:5001/api/v1/status/'
    $.getJSON(url, function(data) {
        if(data.status === "OK") {
            $("DIV#api_status").addClass("available");
        } else {
            $("DIV#api_status").removeClass("available");
        }
    });
});