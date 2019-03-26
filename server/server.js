const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;


app.use((req, res, next) => {
  // Set CORS headers so that the Angular SPA is able to communicate with this server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static('./dist/courseproject'));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});


app.listen(PORT, () => {
  console.log('server is started on port ' + PORT);
})