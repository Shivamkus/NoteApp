const express = require("express");
const port = 5500;
const app = express();
const cors = require("cors");
require("./conn/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");
const path = require("path");


app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
app.use(express.static(path.resolve(__dirname, "client", "build")));
res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use("/api/v1", auth);
app.use("/api/v2", list);


app.listen(port, (error) => {
  if (error) {
    console.log("error on runnig server", error);
  } else {
    console.log(`server is running on port ${port}`);
  }
});
