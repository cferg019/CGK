var express = require("express");

var PORT = process.env.PORT || 8000;
var app = express();
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

var routes = require("./controllers/watchControllers.js");

app.use(routes);

var userRoutes = require("./controllers/userController.js");

app.use(userRoutes);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({}).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
