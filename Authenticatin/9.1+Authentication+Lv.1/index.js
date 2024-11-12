import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "Secrets",
  password: process.env.PASSWORD,
});
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const checkUsers = await db.query(
      "SELECT username FROM users WHERE username = $1",
      [email]
    );
    console.log(checkUsers);
    try {
      if (checkUsers.rows.length > 0) {
        res.send("Email Already Exists try login");
      } else {
        const result = await db.query(
          "INSERT INTO users (username,password) VALUES ($1,$2)",
          [email, password]
        );
        console.log(result);
        res.render("secrets.ejs");
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;
      const passwordMatches = storedPassword === password;
      
      if (passwordMatches) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
