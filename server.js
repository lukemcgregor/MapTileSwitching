const express = require('express');
const app = express();
const port = 3333;

app.use(express.static('assets'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))