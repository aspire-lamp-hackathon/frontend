/* Directives */
var syd = angular.module('OtdDirectives', []);
    
syd.directive('googlePlaces', function(){
    return {
        restrict:'E',
        scope: {location:'=',location2:'='},
        
        template: '<label for="google_places_ac1"> Pickup Point :</label><input class="google_places_ac" name="google_places_ac1" type="text" class="input-block-level"/>'+
                  '<label for="google_places_ac1">Drop Point :</label><input class="google_places_ac" name="google_places_ac2" type="text" class="input-block-level"/>',

        link: function($scope, elm, attrs){
            var autocomplete = new google.maps.places.Autocomplete($(".google_places_ac")[0], {});
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                $scope.location = {'lat':place.geometry.location.lat(), 'lng':place.geometry.location.lng()};
                $scope.$apply();
            });
            
            var autocomplete2 = new google.maps.places.Autocomplete($(".google_places_ac")[1], {});
            google.maps.event.addListener(autocomplete2, 'place_changed', function() {
                var place = autocomplete2.getPlace();
                $scope.location2 = {'lat':place.geometry.location.lat(), 'lng':place.geometry.location.lng()};
                $scope.$apply();
            });
        }
    }
});
 
syd.directive('datetimepicker', function() {
  return {
    require: 'ngModel',
    link: function(scope, el, attr, ngModel) {
      $(el).datetimepicker({
        onSelect: function(dateText) {
          scope.$apply(function() {
            ngModel.$setViewValue(dateText);
          });
        }
      });
    }
  };
});

/** Controllers **/

syd.controller('LoginCtrl', ['$scope', '$http',
    function ($scope, $http) {
		console.log("test")
	}
]);

/** End of Controllers **/

/** Routers **/ 
syd.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
    when('/login', {
      controller: 'PhoneListCtrl'
    }).
    when('/register', {
      controller: 'PhoneDetailCtrl'
    }).
    otherwise({
      redirectTo: '/index'
    });
}]);
/** End of Routers **/

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
angular.module('Otd', ['OtdDirectives']);

/* Controllers */
function calcRoute(params) {
  var start = params.location;//lat: 13.112416, lng: 80.2716064};
  var end = params.location2;//{lat: 12.9112936, lng: 79.9310303};
  var request = {
	  origin:start,
	  destination:end,
	  travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
	if (status == google.maps.DirectionsStatus.OK) {
	  directionsDisplay.setDirections(response);
	}
  });
} 
		


function initialize()
{
    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions =
            {
                zoom: 9,
                center: {lat: 13.112416, lng: 80.2716064},
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            };

    map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
    directionsDisplay.setMap(map);  
};

function SearchForm($scope){
    $scope.location = '';

    $scope.doSearch = function(){
        if($scope.location === ''){
            alert('Directive did not update the location property in parent controller.');
        } else {
            calcRoute($scope);
        }
    };
}


google.maps.event.addDomListener(window, 'load', initialize); 