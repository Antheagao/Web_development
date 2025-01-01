import express from "express";

const app = express();
const port = 3000;
const date = new Date();
var day = date.getDay();
var weekPart = "";
var funPart = "";

// Send the html page to the user
app.get("/", (req, res) => {
    if (day >= 1 && day <= 5) {
        weekPart = "a weekday";
        funPart = "work hard";
    }
    else {
        weekPart = "the weekend";
        funPart = "have fun";
    }
    res.render("index.ejs",
        { weekPart: weekPart,
          funPart: funPart
        }
    );
});

// Listen for requests to server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
