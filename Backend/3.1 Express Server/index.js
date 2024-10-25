import express from "express";
const app = express();
const port = 3000;

// listen(post , () =>{ callback })

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
