$(document).ready(function() {
    const url = 'http://localhost:5001/api/v1/status/'
    $.getJSON(url, function(data) {
        if(data.status === "OK") {
            $("DIV#api_status").addClass("available");
        } else {
            $("DIV#api_status").removeClass("available");
        }
    });
    dict_amenities = {}
    $('input[type=checkbox]#checkAmenity').change(function() {
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
    listLocations = [];
    const dict_city = {};
    $('input[type=checkbox]#checkCity').change(function() {
        if ($(this).is(':checked')) {
            dict_city[$(this).data('id')] = $(this).data('name');
        }
        else {
            delete dict_city[$(this).data('id')];
        }
        if (listLocations.length > 0) {
            const cities = list_amenities.join(", ");
            $("DIV.locations > h4").text(cities);
        } else {
            $("DIV.locations > h4").html("&nbsp;");
        }
        
    });

    dict_state = {}
    $('input[type=checkbox]#checkState').change(function() {
        if ($(this).is(':checked')) {
            dict_state[$(this).data('id')] = $(this).data('name');
        }
        else {
            delete dict_state[$(this).data(id)];
        }
    });
   

    const urlPlacesSearch = 'http://localhost:5001/api/v1/places_search/';
    $.ajax({
        type: "POST",
        url: urlPlacesSearch,
        contentType: 'application/json',
        data: '{}',
        success: function(datos){
            $.each(datos, function(index, place) {
                let bathrooms = " Bathroom";
                let bedrooms = " Bedroom";
                let guest = " Guest";

                if (place.number_bathrooms > 1) {
                    bathrooms = " Bathrooms";
                }
                if (place.number_rooms > 1) {
                    bedrooms = " Bedrooms";
                }
                if (place.max_guest > 1) {
                    guest = " Guests";
                }
                $('SECTION.places').append(
                    '<article>'+
	                    '<div class="title_box">'+
	                        '<h2>' + place.name + '</h2>'+
	                        '<div class="price_by_night">' + place.price_by_night + '</div>'+
	                    '</div>'+
	                    '<div class="information">'+
	                        '<div class="max_guest">'+ place.max_guest + guest + '</div>'+
                            '<div class="number_rooms">' + place.number_rooms + bedrooms + '</div>'+
                            '<div class="number_bathrooms">' + place.number_bathrooms + bathrooms + '</div>'+
	                    '</div>'+
	                    '<div class="user">'+
                            '<b>Owner:</b>' +
                        '</div>'+
                        '<div class="description">'+ place.description +
                        '</div>'+
	                '</article>'             
                )
                
             });
        },
        dataType: "json"
    });

    $('BUTTON').on('click', function() {
        $('SECTION.places').empty();
        const idAmenities = Object.keys(dict_amenities);
        const idCities = Object.keys(dict_city);
        const idStates = Object.keys(dict_state);
        $.ajax({
            type: "POST",
            url: urlPlacesSearch,
            contentType: 'application/json',
            data: JSON.stringify({"amenities": idAmenities, "cities": idCities, "states": idStates}),
            success: function(datos){
                $.each(datos, function(index, place) {
                    let bathrooms = " Bathroom";
                    let bedrooms = " Bedroom";
                    let guest = " Guest";
    
                    if (place.number_bathrooms > 1) {
                        bathrooms = " Bathrooms";
                    }
                    if (place.number_rooms > 1) {
                        bedrooms = " Bedrooms";
                    }
                    if (place.max_guest > 1) {
                        guest = " Guests";
                    }
                    $('SECTION.places').append(
                        '<article>'+
                            '<div class="title_box">'+
                                '<h2>' + place.name + '</h2>'+
                                '<div class="price_by_night">' + place.price_by_night + '</div>'+
                            '</div>'+
                            '<div class="information">'+
                                '<div class="max_guest">'+ place.max_guest + guest + '</div>'+
                                '<div class="number_rooms">' + place.number_rooms + bedrooms + '</div>'+
                                '<div class="number_bathrooms">' + place.number_bathrooms + bathrooms + '</div>'+
                            '</div>'+
                            '<div class="user">'+
                                '<b>Owner:</b>' +
                            '</div>'+
                            '<div class="description">'+ place.description +
                            '</div>'+
                        '</article>'             
                    )
                    
                 });
            },
            dataType: "json"
        });

    });

});

// '{"amenities": ["017ec502-e84a-4a0f-92d6-d97e27bb6bdf", "3e73edf2-c3d6-409f-9202-213df4a7a25a","cf701d1a-3c19-4bac-bd99-15321f1140f2","416cddd7-746e-4715-821c-3ad30b9bc3c3","0d375b05-5ef9-4d43-aaca-436762bb25bf","4a0a3fa7-21a0-411a-bb0a-9b4eed1901ef","f4e98f0a-053a-42e2-9633-0cca2a587410"]}'