$(document).ready(function () {
  console.log("ready!");



  $('#inputButton').click(function (e) {
    let userInput = $('#userText').val();
    choices.push(userInput);
    weather(userInput);

    console.log(choices)
    e.preventDefault();
    $('#city-top').empty();
    $('#temperature').empty();
    $('#humidity').empty();
    $('#wind-speed').empty();
    $('#current').empty();
    $('#weather-ajax').empty();

    


    for(i=0;i<choices.length;i++){
      localStorage.setItem('key'+[i],choices[i])
      userLocalStorage = localStorage.getItem('key')
      }


  console.log(localStorage)
  console.log(userLocalStorage)


  })
  let choices = [];


  



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
      $('#humidity').append("Humidity: " + humidity + '%');
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
  //this is are my variables for the UV index
  var latitud = response.city.coord.lat;
  var longitud = response.city.coord.lon;
  //this is the url for the UV index
  var uv =
    "http://api.openweathermap.org/data/2.5/uvi?appid=e5f561d692ee5b0d5bfef99cb764f31d&lat=" +
    latitud +
    "&lon=" +
    longitud;
    console.log(uv)
    $.get(uv).then(function (uvIndex) {
      $("#uv").text("UV: " + uvIndex.value);
    });

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
        humidity = $('<h6>').text(humidity + '%')


        let final = $(newDiv).append(date, icon, temperature, humidity)
        $('#weather-ajax').append(final)
      }
    //adding button for previous choices
      for(i = 0;i<choices.length;i++){

        let newButton = $('<button>') 
        $(newButton).addClass('usersChoices'+[i]);
        let newInput = $(newButton).append(userInput);
        console.log(newInput)
        $('#previous-opt').append(newInput[i]);

     
      }
    });
  }

});