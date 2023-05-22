const fs = require('fs')
const path = require('path')

const Data_file = './Data.json'
const to_save_data = path.join(__dirname, 'savedData.json')


class App{

    constructor(isDataSaved){
        this.isDataSaved = isDataSaved;
        try{ 
            this.data = JSON.parse(fs.readFileSync(path.join(__dirname, 'Data.json'), 'utf8'));
        }catch(err){
            console.log("error", err.message);
        }
          
    }

    getRanking(teamId){
        var rankings;
        if(this.isDataSaved){
            rankings = this.getSavedRankings()
        }
        else{
            rankings = this.getAllRankings();
        }
        for(var i = 0; i < rankings.length; i++){
            if(rankings[i].teamId === teamId){
                return {
                    "ranking" : i + 1,
                    "status" : "ok"
                }
            }
        }
        return {"status": "invalid team name"}
    }
    
    getAllRankings(){
        let rankings = this.rank();
        console.log(rankings);
        this.saveCurrentRanking(rankings);
        this.isDataSaved = true;
        return rankings;
    }

    showTeamInfo(teamName){
        return {
            "hello" : "world"
        }
    }

    getSavedRankings(){
        return JSON.parse(fs.readFileSync(path.join(__dirname, 'savedData.json'), 'utf8'));
    }

    saveCurrentRanking(rankings){
        const jsonData = JSON.stringify(rankings, null, 2);

        fs.writeFile(path.join(__dirname, 'savedData.json'), jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return;
            }
        })
    }

    rank(){
        let rankings = []
        for(let i = 0; i < this.data.length; i++){
            let points = 0
            points += parseInt(this.data[i].W) / parseInt(this.data[i].MP) * 2;
            points -= parseInt(this.data[i].L) / parseInt(this.data[i].MP) ;
            points += parseInt(this.data[i].Pts_per_MP);
            points += parseInt(this.data[i].xGD);
            points += (20 - parseInt(this.data[i].LgRk)) * 20;
            points = Math.ceil(points);
            rankings.push({
                teamId: this.data[i].id,
                team: this.data[i].Squad,
                total_points : points
            })
        }
        rankings.sort((a,b) =>{
            if(a.total_points > b.total_points){return -1}
            if (a.total_points < b.total_points){return 1}
            return 0;
        })
        this.saveCurrentRanking(rankings)
        return rankings;
    }
}


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
            "status" : "invalid team name"
        })
    })

    it('getAllRankings', () =>{
        expect(app.getAllRankings()).toEqual(app.getSavedRankings())
    })

    it.todo('try getting a valid team name info')
    // , () => {
    //     expect(app.showTeamInfo("Manchester City")).toEqual({
    //         "Rk": "5",
    //         "Squad": "Manchester City",
    //         "Country": "ENG",
    //         "LgRk": "2",
    //         "MP": "30",
    //         "W": "22",
    //         "D": "4",
    //         "L": "4",
    //         "GF": "78",
    //         "GA": "28",
    //         "GD": "50",
    //         "Pts": "70",
    //         "Pts/MP": "2.33",
    //         "xG": "63.5",
    //         "xGA": "24.5",  
    //         "xGD": "39",
    //         "xGD/90": "1.3",
    //         "Attendance": "53203",
    //         "Top Team Scorer": "Erling Haaland - 32",
    //         "Goalkeeper": "Ederson",
    //         "status" : "ok"
    //     })
    // }
    it.todo('try getting a valid team name info')
    // , () => {
    //     expect(app.showTeamInfo("asdas")).toEqual({
    //         "status" : "invalid team name"
    //     })
    // }

    it.todo("try saving all the current ratings")
    // , ()=>{
    //     //this one does not return anything
    //     app.saveCurrentRatings();
    // })
})