import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "songpon";
const yourPassword = "singkhonrat";
const yourAPIKey = "85ec3f34-db65-432b-b212-a1e1251bca61";
const yourBearerToken = "ddce528c-8463-4c97-8b1d-83657ddc8c5a";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  const result = await axios.get("https://secrets-api.appbrewery.com/random");
  const data = JSON.stringify(result.data);
  res.render("index.ejs", { content: data });
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  const result = await axios.get(
    "https://secrets-api.appbrewery.com/all?page=2",
    {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    }
  );
  const data = JSON.stringify(result.data);
  res.render("index.ejs", { content: data });
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  const result = await axios.get(
    `https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`
  );
  const data = JSON.stringify(result.data);
  res.render("index.ejs", { content: data });
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  const result = await axios.get(
    "https://secrets-api.appbrewery.com/secrets/42",
    {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    }
  );
  const data = JSON.stringify(result.data);
  res.render("index.ejs", { content: data });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
