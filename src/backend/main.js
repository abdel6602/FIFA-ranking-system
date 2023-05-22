const App = require('./App');
const express = require('express');

const app = express();
const appController = new App();


app.get('/getAllRankings', (req, res) => {
    res.json(appController.getAllRankings())
});

app.listen(8080, () => {
    console.log('listening on port 8080');
});
