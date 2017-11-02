const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname)));

app.get('/dashboard', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'dashboard.html'));
});

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});