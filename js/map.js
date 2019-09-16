$(function () {
    
    
    var marker = [],
        infowindow = [],
        map, image = "img/marker.svg";

    function addMarker(location, name, contentstr) {
        marker[name] = new google.maps.Marker({
            position: location,
            map: map,
            icon: image
        });
        marker[name].setMap(map);

        infowindow[name] = new google.maps.InfoWindow({
            content: contentstr
        });

        google.maps.event.addListener(marker[name], 'click', function () {
            infowindow[name].open(map, marker[name]);
        });
    }

    function moveto_region(location, zoom_level) {
        map.setZoom(zoom_level);
        map.setCenter(location);
        $('body, html').animate({
            'scrollTop': $('#map-canvas').offset().top - $('header').outerHeight()
        });
    }

    $('.marker').on('click', function () {
        var coord1 = $(this).attr('data-lng');
        var coord2 = $(this).attr('data-lat');
        var location = new google.maps.LatLng(coord2, coord1);
        moveto_region(location, 18);
    });

    function initialize() {

        var lat = $('#map-canvas').attr("data-lat");
        var lng = $('#map-canvas').attr("data-lng");

        var myLatlng = new google.maps.LatLng(lat, lng);

        var setZoom = parseInt($('#map-canvas').attr("data-zoom"));

        var styles = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "invert_lightness": true
            },
            {
                "saturation": "-9"
            },
            {
                "lightness": "0"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "weight": "1.00"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "weight": "0.49"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": "0.01"
            },
            {
                "lightness": "-7"
            },
            {
                "saturation": "-35"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    }
];
        var styledMap = new google.maps.StyledMapType(styles, {
            name: "Styled Map"
        });

        var mapOptions = {
            zoom: setZoom,

            scrollwheel: false,

            center: myLatlng,

            disableDefaultUI: true

        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        $('.addresses-block a.marker').each(function () {
            var mark_lat = $(this).attr('data-lat');
            var mark_lng = $(this).attr('data-lng');
            var this_index = $('.addresses-block a').index(this);
            var mark_name = 'template_marker_' + this_index;
            var mark_locat = new google.maps.LatLng(mark_lat, mark_lng);
            var mark_str = $(this).attr('data-string');
            addMarker(mark_locat, mark_name, mark_str);
        });

    }

    $(window).load(function () {
        if ($('#map-canvas').length) {
            setTimeout(function () {
                initialize();
            }, 500);
        }

    });

});
