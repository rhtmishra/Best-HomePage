const express = require("express");
require("./db/conn");
const User = require("./models/usermessage");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 3000;

// setting path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

// middleware
app.use(express.urlencoded({ extended: false }));

app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

// routing
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/contact", async (req, res) => {
  try {
    res.send(req.body);
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});

// server create
app.listen(port, (req, res) => {
  console.log(`Server running at ${port}`);
});
