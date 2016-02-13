function firstUpperCase(str) {
    return str[0].toUpperCase() + str.substring(1, str.length);
}

function loadWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
           
            var data;
            
            var locationInfo = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
            var apiKey = "&APPID=5c5b877d759ecaf92e4d2106bb72e23e";
            
            apiCall = "http://api.openweathermap.org/data/2.5/weather?" + locationInfo + apiKey + "&units=metric";
            
            $.getJSON(apiCall, function(json) {
                data = json;
                $("#condition").text(Math.round(JSON.stringify(data.main.temp)) + "°C" + ", " + firstUpperCase(data.weather[0].description));
                $("#location").text(data.name + ", " + data.sys.country);
                // determining whether night or day
                if (Date.now()/1000 > data.sys.sunset && Date.now()/1000 < data.sys.sunrise) {
                    var lightStatus = "night";
                } else {
                    var lightStatus = "day";
                }
                // creating class for icon: taking into account weather condition and time of day
                $("i").removeClass();
                $("i").addClass("wi wi-owm-" + lightStatus + "-" + JSON.stringify(data.weather[0].id));
                
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
            temp = Number($("#condition").text().substr(0, $("#condition").text().indexOf("°")));
            temp = Math.round(temp*(9/5) + 32);
            // reconstructing the condition string
            $("#condition").text(temp + "°F," + $("#condition").text().substr($("#condition").text().indexOf(" "), $("#condition").text().length));
            $(".btn").text("Celsius instead?");
        } else {
            unit = 0;
            // grabbing the temperature and converting to C
            temp = Number($("#condition").text().substr(0, $("#condition").text().indexOf("°")));
            temp = Math.round((temp-32) * (5/9));
            // reconstructing the condition string
            $("#condition").text(temp + "°C," + $("#condition").text().substr($("#condition").text().indexOf(" "), $("#condition").text().length));
            $(".btn").text("Fahrenheit instead?");
        }
    });
    
});