$(function () {
    // listen for clicks on search button to call the handleSearch button
    $("#search-button").on("click", handleSearch);
  
    function handleSearch(event) {
      event.preventDefault();
      var city = $("#city-input").val();
  
      var APIKey = "085c19b21e169a594fa99752c60ac8c8";
  
      // URL we need to query the weather API database
      var queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        APIKey +
        "&units=imperial";
  
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        var forecastDays = [];
        forecastDays.push(response.list[0]);
        forecastDays.push(response.list[8]);
        forecastDays.push(response.list[16]);
        forecastDays.push(response.list[24]);
        forecastDays.push(response.list[32]);
  
  
        for (var i = 0; i < forecastDays.length; i += 1) {
          var forecastContainer = $("<div>").addClass("forecast-day");
          var dateEl = $("<div>").text(forecastDays[i].dt);
          var iconEl = $("<div>").text("icon id: " + forecastDays[i].weather[0].icon);
          var tempEl = $("<div>").text("Temp: " + forecastDays[i].main.temp + " °F");
          var humidityEl = $("<div>").text("Humidity: " + forecastDays[i].main.humidity + "%");
          
          forecastContainer.append(dateEl, iconEl, tempEl, humidityEl);
          $("#forecast").append(forecastContainer);
        }
      });
    }
  });