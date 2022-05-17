const express = require("express");
const body_parser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(body_parser.json());
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port: ${port}..`));

const api = require('./api/hub.js');
app.get("*.*", express.static("dist/cls", { maxAge: "1y" })); //sets up the URIs for collecting the resources angular needs from the root of dist/projectmanager
app.post("*", api);
app.put("*", api);
app.delete("*", api);
app.get("/*", (req, res) => {
  res.status(200).sendFile(`/`, { root: "dist/cls" });
});