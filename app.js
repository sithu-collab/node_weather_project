const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
   res.sendFile(__dirname + "/index.html");
   //res.send("server is running");
    
});

app.post("/", function(req, res) { 
        const query = req.body.cityName;
        const appId = "ddd8e0f988ede9caa04aa754c7be55bb";
        const unit = "metric";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
                     query + "&appid=" + appId + "&units=" + unit;
        
        https.get(url, function(response) {
            console.log(response.statusCode);

            response.on("data", function(data) {
                const weatherData = JSON.parse(data);
                console.log(weatherData);
                const temp = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                
                
                console.log(weatherDescription);
                console.log(temp);
                console.log(icon);
                console.log(imgURL);

                res.writeHead(200, {"Content-Type" : "text/html"});
                res.write("<h3>The weather is currently " + weatherDescription + "<h3>");
                res.write("<h1>The temperatur in " + query + " is " + temp + " Degree Celcius</h1>");
                res.write("<img src=" + imageURL  + ">");

                res.send();

            
                
                
            });
        });  

});

app.listen(3000, function(req, res) {
    console.log("Server is running on port 3000");  
});

