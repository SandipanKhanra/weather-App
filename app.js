const express = require("express");
const http = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res) {
  // console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "193f4c451e52595bf3b38a18b55f1887";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  http.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.setHeader("Content-Type", "text/html");
      res.write("<h3>Currently it feels like " + desc + " in " + query + "</h3>");
      res.write("<h1>Temperature is right now " + temp + "</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  });
})

app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
})
