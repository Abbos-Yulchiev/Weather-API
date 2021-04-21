

$(document).ready(function(){

	// Date variables
	var today = new Date();
	var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ",  ";
	var hour = today.getHours();
	var min = today.getMinutes();
	var time;

	// Date generator
	if(today.getHours()<10){
		hour = 0 + today.getHours();
	}
	if(today.getMinutes()<10){
		min = "0" + today.getMinutes()
	}

	time = hour + ":" + min;
	$("#time").text("Time: " + date +'  '+ ' '+ time);
	

	// Search City
	$("#search").click(function(){

		$("#input").html('')
		var city = $("#input").val();

		if(city!=""){
			// Getting weather forecat information by using OpenwaetherMap API
			$.getJSON( "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=ecec792fa02e70a6078ad8c7e2c250d4&units=metric",function(result){

				// Variables for describe temperature
				var temperature = result.main.temp;
				var sunrise = result.sys.sunrise;
				var sunset = result.sys.sunset;
				var feels = result.main.feels_like;
				var wind = result.wind.speed + " m/s " + result.wind.deg + " deg";
				var overcast = result.weather[0].main;
				var pressure = result.main.pressure + " hPa";
				var humidity = result.main.humidity + "%";
				var visibilty = result.visibility + ' m';
				var lat = result.coord.lat;
				var lon = result.coord.lon;

				// Forecats images' array
				var image = [
					"<img src='images/cloudy.jpg'></img>", "<img src='images/misty2.png'></img>", "<img src='images/sunny.jpg'></img>",
					"<img src='images/thunder.png'>", "<img src='images/snow.png'></img>","<img src='images/rain.png'></img>"
				];
				var i;
				// Adding '+' sing
				if(temperature>0){
					temperature = "+" + result.main.temp;
				}
				// Adding '+' sing
				if(feels>0){
					feels = "+" + result.main.feels_like;
				}
				// Forecast images categor
				if(overcast == "Clouds") i = 0;
				else if(overcast == "Mist") i = 1;
				else if(overcast == "Clear") i = 2
				else if(overcast == "Thunderstorm") i = 3
				else if(overcast == "Snow") i = 4;
				else if(overcast = "Rain") i = 5;
				
				// Placing information on main face
				$("#city").text(city + ", "  + result.sys.country)
				$("#temper").text(temperature + "°C");
				$("#temper").append(image[i])
				$("#addInfo").text("Feels like: " + feels + "°C" + " Overcast: " + overcast + " Humidity: " + humidity)
				$("#extraInfo").text("Wind: " + wind + " Presaure: " + pressure + ' Visibility: ' + visibilty)
				$("#cordinate").html('<p>Cordination:</p> <p>lat: ' + lat + '</p> <p> lon: ' + lon + '</p>');
			
				console.log(result)
			})
			// Photo loader from net by using fliker API
			$.getJSON("https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=8e2a8e709dc448d1a96e1632e16fcb69&tags=" +
                    city + "&format=json&nojsoncallback=1_&per_page=3&page=0",function(result){
				
				// Cleaner, remove old images from #view
				$("#view").html('')

				$.each(result.photos.photo, function(i, data){
					var imgUrl = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg";
			
					imgUrl = imgUrl.replace("{farm-id}", data.farm);
					imgUrl = imgUrl.replace("{server-id}", data.server);
					imgUrl = imgUrl.replace("{id}", data.id);
					imgUrl = imgUrl.replace("{secret}", data.secret);
					imgUrl = imgUrl.replace("{size-suffix}", "m");
						
					var image = "<img src=\"{imgUrl}\">";
					image = image.replace("{imgUrl}", imgUrl);

					if(i<3){
						// Placeing images into #view div
						$("#view").append(image)
					}
				})
			})
			
		}
		// -- Alter -- warn user when input is empty 
		else alert("Please enter a name of city for search!")
	})
	window.addEventListener('error', function(e) {
		console.log("Habar topilmadi");
	}, true)
})


