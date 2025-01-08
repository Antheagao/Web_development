import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "jackbauer";
const yourPassword = "ILOVEWEBDEV123";
const yourAPIKey = "7360ff69-0d8b-4acc-b923-000e5a5da36d";
const yourBearerToken = "5a3449d1-4443-48d7-b318-0d324c46e3a7";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: error.message, });
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: error.message, });
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const filterUrl = API_URL + `filter?score=5&apiKey=${yourAPIKey}`;
    const response = await axios.get(filterUrl);
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: error.message, });
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "secrets/42", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: error.message, });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
