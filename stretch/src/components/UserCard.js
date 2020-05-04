import React from "react";
import axios from "axios";

const UserCard = props => {

    const deleteUser = id =>{
        axios.delete(`http://localhost:8000/api/users/${id}`)
        .catch(err=> console.log(err));
        window.location.reload(false);
    }

    return(
        <div className="UserCard">
            <h2>{props.name}</h2>
            <p>"{props.bio}"</p>
            <p>User ID: {props.id}</p>
            <button onClick={()=> deleteUser(props.id)}>Delete User</button>
        </div>
    )
}

export default UserCard;