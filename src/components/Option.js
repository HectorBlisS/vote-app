import React from 'react'

const Option = ({image, name, student, selected, id, onClick, votesNumber}) => {
    return (

    <div className="card" onClick={()=>onClick(id)} className={selected ? "card selected": votesNumber ? "disabled":"card"}>
        <div className="container">
            <h4><b>{student}</b></h4> 
            <p>{name}</p> 
        </div>
    </div>
    )
}

export default Option