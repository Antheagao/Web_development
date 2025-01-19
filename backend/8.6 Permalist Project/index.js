import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "password",
  port: 5432,
});

db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];


app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM items");
  items = result.rows;

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;

  try {
    const query = `
      INSERT INTO items (title)
      VALUES ($1)
    `;
    const values = [item];
    await db.query(query, values);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
  
});

app.post("/edit", async (req, res) => {
  const id = req.body.updatedItemId;
  const item = req.body.updatedItemTitle;

  try {
    const query = `
      UPDATE items
      SET title = $1
      WHERE id = $2
    `;
    const values = [item, id];
    await db.query(query, values);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;

  try {
    const query = `
      DELETE FROM items
      WHERE id = $1
    `;
    const values = [id];
    await db.query(query, values);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
