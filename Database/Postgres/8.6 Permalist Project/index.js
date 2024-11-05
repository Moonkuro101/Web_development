import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: process.env.PASSWORD,
  port: 5432,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

async function addItem(item) {
  await db.query("INSERT INTO item (title) VALUES ($1);", [item]);
  console.log("Item added");
}

async function editItem(id, title) {
  await db.query("UPDATE item SET title = $1 WHERE id = $2;", [title, id]);
  console.log("Item edited");
}

function deleteItem(id) {
  db.query("DELETE FROM item WHERE id = $1;", [id]);
  console.log("Item deleted");
}

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM item ORDER BY id ASC");
    items = result.rows;
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  try {
    const item = req.body.newItem;
    await addItem(item);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", (req, res) => {
  try {
    const id = req.body.updatedItemId;
    const title = req.body.updatedItemTitle;
    editItem(id, title);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", (req, res) => {
  try {
    const id = req.body.deleteItemId;
    deleteItem(id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/`);
});
