const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongo = require("./conn/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());
app.use(cors());

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(8080, () => {
  console.log("Server Started!");
});
