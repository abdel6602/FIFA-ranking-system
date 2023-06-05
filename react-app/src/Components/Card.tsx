
interface Props{
    name: string,
    rank: number,
    position:string
    points:number
    id:number
    handleOpenTeam : (id : number) => void
}

function Card({name, rank, position, points, id, handleOpenTeam} : Props){
    return (
        <>
            <ul className="list-group">
                <li className="list-group-item">
                    <div className="container text-center">
                        <div className="row" onClick={()  =>{
                            handleOpenTeam(id)
                        }}>
                            <div className="col">
                                {rank}
                            </div>
                            <div className="col">
                                {name}
                            </div>
                            <div className="col">
                                {points}
                            </div>
                            <div className={position === "up"? "col success" : "col failure"} >
                                {position === 'up' ? "^" : ">"}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    );
}

export default Card