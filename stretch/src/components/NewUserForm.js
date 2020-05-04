import React, {useState} from "react";
import axios from "axios";

const NewUserForm = () =>{
    const [user, setUser] = useState({
        name: "",
        bio: ""
    });

    const handleChanges = e =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/users", user)
        .then(res=> {
            console.log(res)
            window.location.reload(false);
        })
        .catch(err=> console.log({err}));
    }

    return(
        <div className="Form">
            <h3>Add a New User</h3>
            <form onSubmit={handleSubmit}>
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
                <button>Add New User</button>
            </form>
        </div>
    )
}

export default NewUserForm;