$(document).ready(function () {
  console.log("ready!");



  $('#inputButton').click(function (e) {
    let userInput = $('#userText').val();
    e.preventDefault();
    weather(userInput);
    $('#city-top').empty();
    $('#temperature').empty();
    $('#humidity').empty();
    $('#wind-speed').empty();
    $('#current').empty();
    $('#weather-ajax').empty();
  })


  function weather(userInput) {

    
    //Current temperature portion
    let currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=2a255b648d741897177dc2c2d31abf26'
    $.ajax({
      url: currentWeather,
      type: "GET"
    }).then(function (current) {
      console.log(current)
      //Current city & Date
      let currentCity = current.name;
      $('#city-top').append(currentCity);
      let currentDate = new Date();
      currentDate = "  " + currentDate.getDate() + "-" + currentDate.getMonth() + "-" + currentDate.getFullYear()
      $('#city-top').append(currentDate)
      // Current temperature
      let temperature = current.main.feels_like;
      temperature =  Math.floor((temperature - 273.15) * (9 / 5) + 32);
      $('#temperature').append("Current Temperature: " + temperature + ' Farenheit');
      //Current humidity
      let humidity = current.main.humidity;
      $('#humidity').append("Humidity: " + humidity + ' %');
      //Current wind speed
      let windSpeed = current.wind.speed;
      $('#wind-speed').append("Current Wind Speed: " + windSpeed + ' mph');
      // Description current weather
        // Current Icon
      let currentIcon = current.weather[0].icon;
      currentIcon = $('<img>').attr('src', "https://openweathermap.org/img/w/" + currentIcon + ".png")
      $('#current').append(currentIcon);
        // Current decription
      let currentDescription = current.weather[0].description;
      $('#current').append("Current Weather: " + currentDescription)
    })



// 5 Day Forecast weather
    
  let weatherURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=2a255b648d741897177dc2c2d31abf26"



    $.ajax({
      url: weatherURL,
      type: "GET"
    }).then(function (response) {
      console.log(response)

      for (i = 2; i < 40; i += 8) {
        let newDiv = $('<div>').attr("id", "number" + [i]).addClass('col-2 yourClass');
        //Get the date
        let date = response.list[i].dt_txt;
        date = date.slice(0, 10);
        date = $('<h2>').text(date)
        //Get Icon
        let icon = response.list[i].weather[0].icon;
        icon = $('<img>').attr('src', "https://openweathermap.org/img/w/" + icon + ".png")

        //Get the temperature
        let temperature = response.list[i].main.temp;
        temperature = Math.floor((temperature - 273.15) * (9 / 5) + 32);
        temperature = temperature + ' Farenheit'
        temperature = $('<h5>').text(temperature)


        //Get humidity
        let humidity = 'Humidity: ' + response.list[i].main.humidity;
        humidity = $('<h6>').text(humidity)


        let final = $(newDiv).append(date, icon, temperature, humidity)
        $('#weather-ajax').append(final)
        // console.log(humidity)
      }

    });
  }

});