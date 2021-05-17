$(document).ready(function () {
  const dictAmenities = {};
  $('input[type=checkbox]').change(function () {
    if ($(this).is(':checked')) {
      dictAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete dictAmenities[$(this).data('id')];
    }
    const listAmenities = Object.values(dictAmenities);
    if (listAmenities.length > 0) {
      const amenities = listAmenities.join(', ');
      $('DIV.amenities > h4').text(amenities);
    } else {
      $('DIV.amenities > h4').html('&nbsp;');
    }
  });

  const url = 'http://localhost:5001/api/v1/status/';
  $.getJSON(url, function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  const urlPlacesSearch = 'http://localhost:5001/api/v1/places_search/';
  $.ajax({
    type: 'POST',
    url: urlPlacesSearch,
    contentType: 'application/json',
    data: '{}',
    success: function (datos) {
      $.each(datos, function (index, place) {
        let bathrooms = ' Bathroom';
        let bedrooms = ' Bedroom';
        let guest = ' Guest';

        if (place.number_bathrooms > 1) {
          bathrooms = ' Bathrooms';
        }
        if (place.number_rooms > 1) {
          bedrooms = ' Bedrooms';
        }
        if (place.max_guest > 1) {
          guest = ' Guests';
        }
        $('SECTION.places').append(
            '<article>' +
	        '<div class="title_box">' +
	        '<h2>' + place.name + '</h2>' +
	        '<div class="price_by_night">' + place.price_by_night + '</div>' +
	        '</div>' +
	        '<div class="information">' +
	        '<div class="max_guest">' + place.max_guest + guest + '</div>' +
                '<div class="number_rooms">' + place.number_rooms + bedrooms + '</div>' +
                '<div class="number_bathrooms">' + place.number_bathrooms + bathrooms + '</div>' +
	        '</div>' +
	        '<div class="user">' +
                '<b>Owner:</b>' +
                '</div>' +
                '<div class="description">' + place.description +
                '</div>' +
	        '</article>'
        );
      });
    },
    dataType: 'json'
  });
});
