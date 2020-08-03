$(document).ready(function() {
    console.log( "ready!" );



$('#inputButton').click(function(e){
    

    let userInput = $('#userText').val();
    console.log(userInput);
    e.preventDefault();
})
function weather(){
let weatherURL = "api.openweathermap.org/data/2.5/weather?q=miami&appid=2a255b648d741897177dc2c2d31abf26"


$.ajax({
    url: weatherURL,
    type: "GET"
  }).then(function(response){
      console.log(response)
  });
}
});