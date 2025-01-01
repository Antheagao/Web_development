import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const title = "Enter your name below 👇";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const data = {
    title: title,
  };
  res.render("index.ejs", data);
});

app.post("/submit", (req, res) => {
  res.render("index.ejs",
    { name: req.body["fName"] + req.body["lName"],
      title: "Enter your name below 👇",
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
