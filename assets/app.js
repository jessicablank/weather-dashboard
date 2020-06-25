var APIKey = "&appid=085c19b21e169a594fa99752c60ac8c8";
var m = moment();

var date = new Date();



$("#searchBtn").on("click", function () {
    event.preventDefault();
    $('#forecastH5').addClass('show');
    city = $("#searchTerm").val();
    $("#searchTerm").val("");


    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            getCurrentConditions(response);
            getCurrentForecast(response);
            makeList();
        })
});

function makeList() {
    var listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
}

function getCurrentConditions(response) {
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();


    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var city = $("<h4>").addClass("card-title").text(response.name);
    var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
    var lat = $("<p>").addClass("card-text lat").text("Latitude: " + response.coord.lat);
    var lon = $("<p>").addClass("card-text lon").text("Longitude: " + response.coord.lon);

    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind, lat, lon);
    card.append(cardBody);
    $("#currentCity").append(card)

}

function getCurrentForecast() {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $('#forecast').empty();

        var results = response.list;

        for (var i = 0; i < results.length; i++) {

            if (results[i].dt_txt.indexOf("12:00:00") !== -1) {

                var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
                var tempF = Math.floor(temp);

                var card = $("<div>").addClass("card col-md-2 ml-4 bg-light text-black");
                var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                var cityDate = $("<h4>").addClass("card-title").text(moment.unix(results[i].dt).utc().format("L"));
                var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
                var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")
                var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + results[i].wind.speed + " MPH")


                cardBody.append(cityDate, image, temperature, humidity, wind);
                card.append(cardBody);
                $("#forecast").append(card);

            }
        }
    });

}
