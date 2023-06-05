interface Props{
    categories:string[]
}

function ListHeader ({categories} : Props) {
    return (
        <>
            <div className="container text-center">
                <div className="row head">
                    {categories.map((category) => (
                        <div className="col titles" key={category}>
                            {category}
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}

export default ListHeader
