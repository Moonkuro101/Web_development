// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const API_URL = "https://secrets-api.appbrewery.com/random";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL);
    const user = result.data.username;
    const secret = result.data.secret;
    res.render("index.ejs", {
      user: user,
      secret: secret,
    });
  } catch (error) {
    if (error.response) {
      // Error received from server response
      const statusCode = error.response.status;
      const errorMessage = error.response.data || "An error occurred";

      res
        .status(statusCode)
        .send(`<h1>Error Status ${statusCode}</h1><p>${errorMessage}</p>`);
    } else if (error.request) {
      // Request made but no response received
      console.log("No response received:", error.request);
      res.status(500).send("<h1>Server Error: No response from server</h1>");
    } else {
      // Any other errors (e.g., code issues)
      console.log("Error:", error.message);
      res.status(500).send("<h1>Unexpected Server Error</h1>");
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
