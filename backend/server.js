const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());

require('dotenv').config();

app.post('/contact', function (req, res) {
  console.log('********* - 6', req.body);
  res.send(req.body)
});

if (!module.parent) {
  app.listen(process.env.PORT, () => console.log(`Example app listening at http://localhost:${ process.env.PORT }`));
}