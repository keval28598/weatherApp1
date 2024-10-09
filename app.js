const path = require("path");
const request = require("request");
const express = require("express");
const app = express();
const hbs = require("hbs");
const geocode = require("./utilis/geocode");
const forecast = require("./utilis/forecast");

const publicDirectoryPath = path.join(__dirname, "./public");
const port = process.env.PORT;
app.use(express.static(publicDirectoryPath)); 
app.set("view engine", "hbs");
// app.set('views','./public/views')
hbs.registerPartials("partials");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "This is help page.",
    name: "help page footer",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      errorMessage: " please provide address ",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        errorMessage:error
      })
    }

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({
          errorMessage:error
        })
      }

      // res.render('weather',{
      //   forecast:forecast,
      //   location:location,
      //   title: req.query.address,
      // })

      res.send({
        'forecast':forecast,
        'location':location
      })
      
      console.log("Data : ", forecast);
    });
  });

});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "keval",
    name: 26,
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Keval Patel",
    errorMessage: "Help artical not found",
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);

  if (!req.query.name) {
    return res.send({
      error: "please provide name",
    });
  }
  res.send({
    errorMessage: `products ${req.query.name} are not found`,
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Keval Patel",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("server is running" +port);
});
