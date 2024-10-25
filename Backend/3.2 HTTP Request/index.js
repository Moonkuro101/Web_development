import express, { response } from "express";
const app = express();
const port = 3000;

//req request จากเครื่องคอมพิวเตอร์ที่ส่งมาหาตัว server
// req.rawHeaders บอกข้อมูลเกี่ยวกับตัว requesnt
// res เป็นการตอบกลับของ servers

app.get("/", (req, res) => {
  res.send("<h1>Hello goog<h1>");
});

app.get("/about", (req, res) => {
  res.send("<h2>This is about page<h2/>");
});

app.get("/contact", (req, res) => {
    res.send("<h2>This is contact page<h2/>");
  });

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
