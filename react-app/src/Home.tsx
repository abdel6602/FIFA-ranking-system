import Card from "./Components/Card.tsx"
import ListHeader from "./Components/ListHeader.tsx";
import {useState} from "react";

interface Props{
    type:number
}

function Home({type} : Props) {

    const categories = ["RANK", "TEAM", "POINTS", "+/-"]

    const [teams, setTeams] = useState([])
    // const [searchedTeams, setSearchedTeams] = useState();

    const getRankingData = async () => {
        if(type === 0){
            // @ts-ignore
            let temp = []

            await fetch("http://localhost:8080/getAllRankings")
                .then((res) => res.json())
                // @ts-ignore
                // @ts-ignore
                .then((data) => data.map((teamData, index) => {
                    temp.push({
                        name:teamData.team,
                        rank : index + 1,
                        points: teamData.total_points,
                        id:teamData.teamId,
                        position:'up'
                    });
                    // @ts-ignore
                    setTeams(temp)
                }))
                .catch((e) => console.log(e.message));
        }
        else if(type == 1){
            //@ts-ignore
            let temp = [];

            await fetch('http://localhost:8080/teamRanking/' + window.localStorage.getItem("SEARCH_INPUT"))
                .then((res) => res.json())
                //@ts-ignore
                .then((data) => data.map((teamData, index) => {
                    temp.push({
                        name:teamData.name,
                        rank:teamData.ranking,
                        points:teamData.points,
                        position:'up',
                        id:index
                    });
                    //@ts-ignore
                    setTeams(temp)
                }))
                .catch((e) => {
                    console.log(e.message)
                })
        }

        else{
            console.log("error")
        }
    }

    getRankingData();

    //function to show the team info when clicked on;
    //for now it logs the object of the team
    const handleOpenTeam = (id:number) => {
        let team;
        for(let i = 0; i < teams.length; i++){
            //@ts-ignore
            if (teams[i].id == id){
                team = teams[i]
            }
        }
        //save in local storage
        window.localStorage.setItem('SELECTED_TEAM', JSON.stringify(team));
    }
    //the logic for the search
    // for now it logs the search input




    return  (
        <>
            <h3 className={"Title"}>Men's Ranking 2022-2023</h3>
            <ListHeader categories={categories}></ListHeader>
            {teams.map(team =>
                    <Card
                        //@ts-ignore
                        key={team.id}
                        //@ts-ignore
                        name={team.name}
                        //@ts-ignore
                        rank={team.rank}
                        //@ts-ignore
                        points= {team.points}
                        //@ts-ignore
                        position={team.position}
                        //@ts-ignore
                        id={team.id}
                        handleOpenTeam={handleOpenTeam}
                    />
                )}

        </>
    );
}

export default Home