const fs = require('fs')
const path = require('path')
const App = require('../src/backend/App')

describe('App', () => {

    let app;

    beforeAll(() => {
        app = new App(false);
    })

    it("get a valid team's ranking", () => {
        expect(app.getRanking(87)).toEqual({
            "ranking" : 5,
            "status" : "ok"
        })
    })

    it("get an invalid teams ranking", () => {
        expect(app.getRanking('fabdd')).toEqual({
            "status" : "invalid team id"
        })
    })

    it('getAllRankings', () =>{
        expect(JSON.stringify(app.getAllRankings())).toEqual(JSON.stringify(app.getSavedRankings()))
    })

    it('try getting a valid team name info', () => {
        expect(app.showTeamInfo(87)).toEqual({
            "Squad": "Manchester City",
            "Country": "ENG",
            "LgRk": "2",
            "MP": "30",
            "W": "22",
            "D": "4",
            "L": "4",
            "GF": "78",
            "GA": "28",
            "GD": "50",
            "Pts": "70",
            "Pts_per_MP": "2.33",
            "xG": "63.5",
            "xGA": "24.5",  
            "xGD": "39",
            "xGD/90": "1.3",
            "Attendance": "53203",
            "Top Team Scorer": "Erling Haaland - 32",
            "Goalkeeper": "Ederson",
            "status" : "ok",
            "rank": 5,
            "teamId" : 87
        })
    })

    it('try getting an invalid team name info', () => {
        expect(app.showTeamInfo("asdas")).toEqual({
            "status" : "invalid team id"
        })
    })

    it("try saving all the current ratings", ()=>{
        //this one does not return anything
        expect(app.saveCurrentRanking(app.getAllRankings())).toBe(1);
    })
})