import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const api_key = "1472e0d6256bb882a269d976b9c28788";

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=thailand&appid=${api_key}`
    );
    let kevin = result.data.main.temp;
    let celsius = (kevin - 273.15).toFixed(1);
    res.render("index.ejs", { data: result.data, celsius: celsius });
  } catch (err) {
    return;
  }
});

app.post("/", async (req, res) => {
  const city = req.body.city;
  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    );
    let kevin = result.data.main.temp;
    let celsius = (kevin - 273.15).toFixed(1);
    res.render("index.ejs", { data: result.data, celsius: celsius });
  } catch (err) {
    return;
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
