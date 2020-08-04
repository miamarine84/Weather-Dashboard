$(document).ready(function() {
    console.log( "ready!" );



$('#inputButton').click(function(e){
    let userInput = $('#userText').val();
    e.preventDefault();
    weather(userInput);
})

function weather(userInput){

let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=2a255b648d741897177dc2c2d31abf26";


$.ajax({
    url: weatherURL,
    type: "GET"
  }).then(function(response){
      console.log(response)
  });
}

});