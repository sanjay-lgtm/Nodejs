const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/data', (req, res) => {
  res.json(require('./data.json')); // Your cleaned data file
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
