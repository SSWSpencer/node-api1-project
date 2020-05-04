import React, {useState} from "react";
import axios from "axios";

const EditUserForm = () =>{
    const [user, setUser] = useState({
        id: "",
        name: "",
        bio: ""
    });

    const handleChanges = e =>{
        if(e.target.name === "id"){
            setUser({
                ...user,
                [e.target.name]: parseInt(e.target.value)
            })
        }
        else{
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = e =>{
        e.preventDefault();
        if(user.id){
            if(user.name && user.bio){
                axios.put(`http://localhost:8000/api/users/${user.id}`, user)
                .then(res=> {
                    console.log(res)
                    window.location.reload(false);
                })
                .catch(err=> console.log({err}));
            }
            else{
                axios.patch(`http://localhost:8000/api/users/${user.id}`, user)
                .then(res=> {
                    console.log(res)
                    window.location.reload(false);
                })
                .catch(err=> {console.log(err)})
            }
        }
    }

    return(
        <div className="Form">
            <h3>Edit an Existing User</h3>
            <form onSubmit={handleSubmit}>
                <input 
                type="number"
                name="id"
                placeholder="User ID"
                value={user.id}
                onChange={handleChanges}/><br/>
                <input 
                type="text"
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={handleChanges}
                /><br/>
                <input 
                type="text"
                name="bio"
                placeholder="Bio"
                value={user.bio}
                onChange={handleChanges}
                /><br/>
                <button>Edit User</button>
            </form>
        </div>
    )
}

export default EditUserForm;