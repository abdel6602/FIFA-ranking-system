const App = require('./App');
const cors = require('cors')
const express = require('express');

const app = express();


app.use(cors());
app.use(express.json())

const appController = new App(true);

app.get('/', (req, res) => {
    res.json({
        message: "welcome to the home page!"
    })
})

app.get('/getAllRankings', (req, res) => {
    res.json(appController.getAllRankings())
});

app.get('/getTeamInfo/:teamName', (req, res) => {
    res.json(appController.showTeamInfo(req.params.teamName));
});

app.get('/TeamRanking/:teamName', (req, res) =>{
    res.json(appController.getRanking(req.params.teamName));
})

app.listen(8080, () => {
    console.log('listening on port 8080');
});
