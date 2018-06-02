const express = require("express");
const browserSync = require("browser-sync");
const path = require("path");

const app = express();
const port = 1337;
const listening = () => {
  browserSync({
    proxy: `localhost:${port}`,
    port: port + 1,
    files: ["app.js", "views/**/*", "src/**/*"],
    ui: false,
    open: false,
    online: false,
  });
};

// Define where the views folder is
app.set("views", path.join(__dirname, "views"));
// Set the templating engine
app.set("view engine", "pug");
// Set the static directory for assets
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.react = "global react local property";
  next();
});

app.get("/", (req, res) => {
  res.render("index", {
    navigation: ["home&amp;", "&amp;about", "portfolio&amp;"],
  });
});

app.listen(port, listening);
