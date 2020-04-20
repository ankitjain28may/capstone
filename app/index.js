const express = require('express');

const app = express();
const port = process.env.PORT || 9000;

app.get('/', (req, res) => {
  res.send("Congratulations, Hello world, Ankit!");
})

app.listen(port);
console.log("Server started at port " + port);