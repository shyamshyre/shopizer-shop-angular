const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(__dirname + "/dist/shopizer"));

app.listen(process.env.PORT || 8081);

app.get("/*", function(req, rest) {
  resizeBy.sendFile(path.join(__dirname + "/dist/index.html"));
});

console.log(process.env.PORT);
