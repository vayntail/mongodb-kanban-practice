const express = require("express");
const path = require("path");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5050;

const db = require("./db/conn");

// middleware to parse form data and json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// routes
const tabsRoutes = require("./routes/tabs");
app.use("/api/tabs", tabsRoutes);
const columnsRoutes = require("./routes/columns");
app.use("/api/tabs", columnsRoutes);
const cardsRoutes = require("./routes/cards");
app.use("/api/tabs/:tabId/columns", cardsRoutes);

// middleware requests
app.use((req, res, next) => {
  const time = new Date();
  console.log(
    `-----
        ${time.toLocaleDateString()}: Received a ${req.method} request to ${
      req.url
    }.`
  );

  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// error handle middleware
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
