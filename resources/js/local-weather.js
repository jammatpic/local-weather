$(document).ready(function() {
    $(".btn").on("click", function() {
        window.alert("test");
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=5c5b877d759ecaf92e4d2106bb72e23e", function(json) {
            $("#output").html(JSON.stringify(json));
        });
    });
});