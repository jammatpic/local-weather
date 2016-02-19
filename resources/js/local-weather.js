var firstLoad = true;

function firstUpperCase(str) {
    return str[0].toUpperCase() + str.substring(1, str.length);
}

function loadWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var data;
            // getting user location
            var locationInfo = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
            var apiKey = "&APPID=5c5b877d759ecaf92e4d2106bb72e23e";
            // making api call with parameters specified
            apiCall = "http://api.openweathermap.org/data/2.5/weather?" + locationInfo + apiKey + "&units=metric";
            
            $.getJSON(apiCall, function(json) {
                data = json;
                // updating temp, condition, and location
                $("#temperature").text(Math.round(JSON.stringify(data.main.temp)) + "°C");
                $("#condition").text(firstUpperCase(data.weather[0].description));
                $("#location").text(data.name + ", " + data.sys.country);
                // determining whether night or day
                if (Date.now()/1000 > data.sys.sunset || Date.now()/1000 < data.sys.sunrise) {
                    var lightStatus = "night";
                } else {
                    var lightStatus = "day";
                }
                // creating class for icon: taking into account weather condition and time of day
                $("i").removeClass();
                $("i").addClass("wi wi-owm-" + lightStatus + "-" + JSON.stringify(data.weather[0].id));
                
                if (firstLoad === true) { // code is here so it runs once loaded
                    $(".last").append('<button class = "btn btn-default">Fahrenheit instead?</button>');
                } else {
                    firstLoad = false;
                }
            });
        });
    } 
}

$(document).ready(function() {
    var unit = 0;
    var temp;
    loadWeather();
    
    $(".btn").on("click", function() {
        if (unit === 0) {
            unit = 1;
            // grabbing the temperature and converting to F
            temp = Number($("#temperature").text().substr(0, $("#temperature").text().indexOf("°")));
            temp = Math.round(temp*(9/5) + 32);
            // Adding symbols and relabelling button
            $("#temperature").text(temp + "°F")
            $(".btn").text("Celsius instead?");
        } else {
            unit = 0;
            // grabbing the temperature and converting to C
            temp = Number($("#temperature").text().substr(0, $("#temperature").text().indexOf("°")));
            temp = Math.round((temp-32) * (5/9));
            // Adding symbols and relabelling button
            $("#temperature").text(temp + "°C")
            $(".btn").text("Fahrenheit instead?");
        }
    });
    
});