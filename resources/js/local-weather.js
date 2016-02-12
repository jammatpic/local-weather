function firstUpperCase(str) {
    return str[0].toUpperCase() + str.substring(1, str.length);
}

$(document).ready(function() {
    var unit = 0;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var data;
            var units = [["metric","C"],["imperial","F"]];
            
            var locationInfo = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
            var apiKey = "&APPID=5c5b877d759ecaf92e4d2106bb72e23e";
            var unitPref = "&units=" + units[unit][0];
            
            apiCall = "http://api.openweathermap.org/data/2.5/weather?" + locationInfo + apiKey + unitPref;
            //$("#test").text(apiCall);
            
            $.getJSON(apiCall, function(json) {
                data = json;
                $("#condition").html(JSON.stringify(data.main.temp) + "°" + units[unit][1] + ", " + firstUpperCase(data.weather[0].description));
                $("#location").html(data.name + ", " + data.sys.country);
            });
        });
    };
});