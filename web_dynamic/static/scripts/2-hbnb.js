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
});
