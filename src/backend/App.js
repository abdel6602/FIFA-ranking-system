const fs = require('fs')
const path = require('path')

const dataFile = path.join(__dirname, "../../resources/Data/Data.json");
const savedDataFile = path.join(__dirname, "../../resources/Data/savedData.json")

class App{

    constructor(isDataSaved){
        this.isDataSaved = isDataSaved;
        try{ 
            this.data = JSON.parse(fs.readFileSync(dataFile));
        }catch(err){
            console.log("error", err.message);
        }
          
    }

    getRanking(teamId){
        let rankings = this.isDataSaved ? this.getSavedRankings() : this.getAllRankings();
        for(let i = 0; i < rankings.length; i++){
            if(rankings[i].teamId == teamId){
                return {
                    "ranking" : i + 1,
                    "status" : "ok"
                }
            }
        }
        return {"status": "invalid team id"}
    }
    
    getAllRankings(){
        let rankings = this.rank();
        this.saveCurrentRanking(rankings);
        this.isDataSaved = true;
        return rankings;
    }

    showTeamInfo(teamId){
        let rank = this.getRanking(teamId);
        let rankings = this.isDataSaved ? this.getSavedRankings() : this.getAllRankings();
        let output = {}
        for(let i = 0; i < this.data.length; i++){
            if(this.data[i].teamId == teamId) {
                output = this.data[i];
                output.rank = rank.ranking;
                output.status = "ok";
                return output;
            }
        }
        return {
            status : "invalid team id"
        }
        // if(rank.ranking - 1 < rankings.length){
        //     output = rankings[rank.ranking - 1]
        //     output.rank = rank.ranking
        //     output.status = "ok";
        // }
        // else {
        //     output.status = "invalid team id";
        // }
    }

    getSavedRankings(){
        if(this.isDataSaved){
            return JSON.parse(fs.readFileSync(path.join(__dirname,'../../resources/Data/savedData.json'), "utf-8"));
        }
    }

    saveCurrentRanking(rankings){
        try{
            const jsonData = JSON.stringify(rankings, null, 2);

        fs.writeFile('../../resources/Data/savedData.json', jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
            }
        })
        return 1;
        } catch(err){
            return 0;
        }   
    }

    rank(){
        let rankings = []
        for(let i = 0; i < this.data.length; i++){
            let points = 0
            points += parseInt(this.data[i].W) / parseInt(this.data[i].MP) * 3.5;
            points -= parseInt(this.data[i].L) / parseInt(this.data[i].MP) * 10;
            points += parseInt(this.data[i].Pts_per_MP) * 10;
            points += parseInt(this.data[i].xGD);
            points += (20 - parseInt(this.data[i].LgRk)) * 25;
            points = Math.ceil(points);
            rankings.push({
                teamId: this.data[i].teamId,
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

module.exports = App;