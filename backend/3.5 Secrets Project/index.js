import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Function to log the password typed by the user
function checkPassword(req, res, next) {
    if (req.body.password === password) {
        isAuthorized = true;
    }
    else {
        isAuthorized = false;
    }
    next();
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const password = "ILoveProgramming";
var isAuthorized = false;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkPassword);

// Send the root html page to the user
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Send the secret page if the password is correct
app.post("/check", (req, res) => {
    if (isAuthorized) { 
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

// Start server to listen for requests
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
