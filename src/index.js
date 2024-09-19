// app.js
const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/route')
app.use(express.json())
app.use('/', routes)

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
