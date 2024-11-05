import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();


const db =new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

db.connect();

let quiz = [];
db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
  db.end();
});

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

let currentQuestion = {};
let totalCorrect = 0;

// GET home page

app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

app.post("/submit", async (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
