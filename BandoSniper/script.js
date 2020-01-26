      var map;
      var infowindow;
      var request;
      var service;
      var markers = [];
      /*types to try: ['hospital', 'school', 'church', 'shopping_mall', 'tourist_attraction']*/
      function createMap() {
        var center = new google.maps.LatLng(41.881832,-87.6298);
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: center,
          mapTypeId: 'roadmap'

        });
        request = {
            location: center,
            radius: 8047,
            types: ['school']
        };
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, cback);          
    
    
    google.maps.event.addListener(map, 'rightclick', function(event){
        map.setCenter(event.latLng)
        clearResults(markers)
        var request = {
            location: event.latLng,
            radius: 8047,
            types: ['shopping_mall']
        };
        service.nearbySearch(request, cback);   
    })
}

    function cback(results, status){
        if(status == google.maps.places.PlacesServiceStatus.OK){
            for(var i=0; i<results.length; i++){
                markers.push(createMarker(results[i]));
            }

        }

    }
    function createMarker(place){
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function(){
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
        return marker;
    }
   function clearResults(markers){
       for (var m in markers){
           markers[m].setMap(null)
       }
       markers=[]
   }
