const fs = require('fs')
const path = require('path')

const Data_file = './Data.json'
const to_save_data = path.join(__dirname, 'savedData.json')


class App{

    constructor(isDataSaved){
        this.isDataSaved = isDataSaved;
        try{ 
            this.data = JSON.parse(fs.readFileSync('../../resources/Data/Data.json'), 'utf8');
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
        this.saveCurrentRanking(rankings);
        this.isDataSaved = true;
        return rankings;
    }

    showTeamInfo(teamId){
        let rankings;
        let ranking = 0
        let isFound = false;
        if(this.isDataSaved){
            rankings = this.getSavedRankings();
        }
        let teamName;
        for(let i = 0; i < rankings.length; i++){
            if(teamId === rankings[i].teamId){
                teamName = rankings[i].team;
                ranking = i + 1;
                isFound = true;
                break;
            }
        }
        let output = {}
        if(isFound){
            for(let i = 0; i < this.data.length; i++){
                if(this.data[i].Squad === teamName){
                    output = this.data[i];
                    break;
                }
            }
            output.Rk = ranking;
            output.status = "ok";
            return output;
        }
        else{
            return {
                status : "invalid team name"
            }
        }
    }

    getSavedRankings(){
        let rankings = JSON.parse(fs.readFileSync('../../resources/Data/savedData.json', 'utf8'));
        return rankings;
    }

    saveCurrentRanking(rankings){
        try{
            const jsonData = JSON.stringify(rankings, null, 2);

        fs.writeFile('../../resources/Data/savedData.json', jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return;
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

