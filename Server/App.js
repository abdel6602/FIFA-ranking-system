const fs = require('fs')
const path = require('path')

const dataFile = path.join(__dirname, "resources/Data/Data.json");
const savedDataFile = path.join(__dirname, "resources/Data/savedData.json")

class App{

    constructor(isDataSaved){
        this.isDataSaved = isDataSaved;
        try{ 
            this.data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
        }catch(err){
            console.log("error", err.message);
        }
          
    }

    getRanking(teamName){
        let rankings = this.isDataSaved ? this.getSavedRankings() : this.getAllRankings();
        let results = []
        let teamNameLower = teamName.toLowerCase()
        for(let i = 0; i < rankings.length; i++){
            if((rankings[i].team.toLowerCase()).includes(teamNameLower)){
                results.push({
                    name : rankings[i].team,
                    ranking : i + 1,
                    points: rankings[i].total_points,
                    status : "ok"
                });
            }
        }
        return results
    }
    
    getAllRankings(){
        let rankings = this.rank();
        this.saveCurrentRanking(rankings);
        this.isDataSaved = true;
        return rankings;
    }

    showTeamInfo(teamName){
        let rank = this.getRanking(teamName);
        let nameLower = teamName.toLowerCase();
        let rankings = this.isDataSaved ? this.getSavedRankings() : this.getAllRankings();
        let output = {}
        for(let i = 0; i < this.data.length; i++){
            if((this.data[i].team.toLowerCase()).includes(nameLower)) {
                output = this.data[i];
                output.rank = rank.ranking;
                output.status = "ok";
                return output;
            }
        }
        return {
            status : "invalid team id"
        }
    }

    getSavedRankings(){
        if(this.isDataSaved){
            return JSON.parse(fs.readFileSync(path.join(__dirname,'resources/Data/savedData.json'), "utf-8"));
        }
    }

    saveCurrentRanking(rankings){
        try{
            const jsonData = JSON.stringify(rankings, null, 2);

        fs.writeFile(savedDataFile, jsonData, 'utf8', (err) => {
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
            points += parseInt(this.data[i].GF) * 5;
            points -= parseInt(this.data[i].GA) * 3;
            points += parseInt(this.data[i].xGD);
            points += (20 - parseInt(this.data[i].LgRk)) * 25;
            points = Math.ceil(points);
            rankings.push({
                teamId: this.data[i].teamId,
                team: this.data[i].team,
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