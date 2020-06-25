var APIKey = "&appid=085c19b21e169a594fa99752c60ac8c8";

var date = new Date();

$("#searchBtn").on("click", function () {
    event.preventDefault();
    $('#forecastH5').addClass('show');

    //Get the City from User
    city = $("#searchTerm").val();

    //Clear input box
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
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
    

 
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
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

            var day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
            var hour = results[i].dt_txt.split('-')[2].split(' ')[1];
           

            if (results[i].dt_txt.indexOf("12:00:00") !== -1) {

                // get the temperature and convert to fahrenheit 
                var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
                var tempF = Math.floor(temp);

                var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
                var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

                var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

                cardBody.append(cityDate, image, temperature, humidity);
                card.append(cardBody);
                $("#forecast").append(card);

            }
        }
    });

}

