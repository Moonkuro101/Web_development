import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import e from "express";

dotenv.config();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: process.env.PASSWORD,
  port: 5432,
});
db.connect();

const app = express();
const port = 3000;

async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// async function addCountry(country) {
//   try {
// const result = await db.query(
//   "SELECT country_code FROM countries WHERE country_name = $1",
//   [country]
// );
// const countryCode = result.rows[0].country_code;
// if (result.rows.length !== 0)
//   await db.query(
//     "INSERT INTO visited_countries (country_code) VALUES ($1)",
//     [countryCode]
//   );
//   } catch {
//     console.log("Country not found");
//   }
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkVisited();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  const input = req.body.country;

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE  '%' || $1 || '%'",
      [input.toLowerCase()]
    );

    const country_code = result.rows[0].country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [country_code]
      );
      res.redirect("/");
    } catch (err) {
      const countries = await checkVisited();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  } catch (err) {
    const countries = await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
