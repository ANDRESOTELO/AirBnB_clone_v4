$(document).ready(function() {
    $('.reviews span').on('click', function() {
        console.log("hello");
    });
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
    listLocations = {};
    const dict_city = {};
    $('input[type=checkbox]#checkCity').change(function() {
        if ($(this).is(':checked')) {
            dict_city[$(this).data('id')] = $(this).data('name');
            listLocations[$(this).data('id')] = $(this).data('name');
        }
        else {
            delete dict_city[$(this).data('id')];
            delete listLocations[$(this).data('id')];
        }
        locations = Object.values(listLocations);
        if (locations.length > 0) {
            const cities = locations.join(", ");
            $("DIV.locations > h4").text(cities);
        } else {
            $("DIV.locations > h4").html("&nbsp;");
        }
        
    });

    const dict_state = {}
    $('input[type=checkbox]#checkState').change(function() {
        if ($(this).is(':checked')) {
            dict_state[$(this).data('id')] = $(this).data('name');
            console.log($(this).data('name'));
            listLocations[$(this).data('id')] = $(this).data('name');

        }
        else {
            delete dict_state[$(this).data('id')];
            delete listLocations[$(this).data('id')];

        }
        locations = Object.values(listLocations);
        if (locations.length > 0) {
            const cities = locations.join(", ");
            $("DIV.locations > h4").text(cities);
        } else {
            $("DIV.locations > h4").html("&nbsp;");
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
                        '<div id="review'+ place.id + '">'+
                            '<div class="reviews">'+
                                '<h2>Reviews</h2>'+
                                '<span id="' + place.id + '">Show</span>'+
                            '</div>'+
                            '<ul></ul>'+
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
                            '<div id="review' + place.id + '">'+
                                '<div class="reviews">'+
                                    '<h2>Reviews</h2>'+
                                    '<span id="' + place.id + '">Show</span>'+
                                '</div>'+
                                '<ul></ul>'+
                            '</div>'+
                        '</article>'             
                    )
                 });
            },
            dataType: "json"
        });

    });
    $(document).on('click','.reviews span',function(){
        idPlace = $(this).attr('id');
        console.log(idPlace);
        nameUL = "#review"+ idPlace;
        urlReview = 'http://localhost:5001/api/v1/places/'+idPlace+'/reviews';
        if($(nameUL + ' span').text() == "Show") {
            $(nameUL + ' span').text("Hide");
            $.ajax({
                type: "GET",
                url: urlReview,
                dataType: "json",
                success: function(data) {
                    $.each(data, function(index, review) {
                        $(nameUL +' ul').append(
                            '<li>'+
                                '<h3>From '+ review.created_at +
                                '</h3>'+
                                '<p>'+ review.text +
                                '</p>'+
                            '</li>'
                        );
    
                    });
                }
            });
        } else {
            $(nameUL + ' span').text("Show");          
            $(nameUL +' ul').empty();
        }
    });    

});
