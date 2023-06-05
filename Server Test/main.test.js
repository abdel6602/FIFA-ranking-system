const fetch = require('node-fetch')
const App = require('../Server/App')

describe('Api testing', () => {

    let app;

    beforeAll(() => {
        app = new App();
    })

    it("tests that the api works", () => {
        fetch("http://localhost:8080/")
            .then((res) => res.json())
            .then((data) => {
                expect(data).toEqual({
                    "message": "welcome to the home page!"
                });
            });
    })

    it("tests the getAllRankings endpoint", () => {
        fetch("http://localhost:8080/getAllRankings")
            .then((res) => res.json())
            .then((data) => {
                expect(data).toEqual(app.getAllRankings());
            });
    })

    it('tests the getTeamInfo endpoint with a valid input', () => {
        fetch("http://localhost:8080/getTeamInfo/manchester")
            .then((res) => res.json())
            .then((data) => {
                expect(data).toEqual({
                    "team": "Manchester Utd",
                    "Country": "ENG",
                    "LgRk": "3",
                    "MP": "30",
                    "W": "18",
                    "D": "5",
                    "L": "7",
                    "GF": "46",
                    "GA": "37",
                    "GD": "9",
                    "Pts": "59",
                    "Pts_per_MP": "1.97",
                    "xG": "49.3",
                    "xGA": "38.7",
                    "xGD": "10.5",
                    "xGD/90": "0.35",
                    "Attendance": "73704",
                    "Top Team Scorer": "Marcus Rashford - 15",
                    "Goalkeeper": "David de Gea",
                    "teamId": 2,
                    "status": "ok"
                });
            });
    })

    it('tests the getTeamInfo endpoint with an invalid input', () => {
        fetch("http://localhost:8080/getTeamInfo/asda")
            .then((res) => res.json())
            .then((data) => {
                expect(data).toEqual([]);
            });
    })

    it('tests the TeamRanking endpoint with a valid input', () => {
        fetch("http://localhost:8080/TeamRanking/Manchester")
            .then((res) => res.json())
            .then((data) => {
                expect(data).toEqual([
                    {
                        "name": "Manchester City",
                        "ranking": 1,
                        "points": 817,
                        "status": "ok"
                    },
                    {
                        "name": "Manchester Utd",
                        "ranking": 19,
                        "points": 564,
                        "status": "ok"
                    }
                ]);
            });
    })

    it("tests the TeamRanking Endpoint with an invalid input", () => {
        fetch("http://localhost:8080/TeamRanking/ada")
            .then((res) => res.json())
            .then((data) => {
                expect(data).toEqual([]);
            });
    })


})