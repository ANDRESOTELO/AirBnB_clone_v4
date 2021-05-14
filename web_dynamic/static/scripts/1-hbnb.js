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
});