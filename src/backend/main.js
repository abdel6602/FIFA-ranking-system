const App = require('./App');
const express = require('express');

const app = express();
const appController = new App(true);


app.get('/getAllRankings', (req, res) => {
    res.json(appController.getAllRankings())
});

app.get('/getTeamInfo/:teamId', (req, res) => {
    res.json(appController.showTeamInfo(req.params.teamId));
});

app.get('/TeamRanking/:teamId', (req, res) =>{
    res.json(appController.getRanking(req.params.teamId));
})

app.listen(8080, () => {
    console.log('listening on port 8080');
});
