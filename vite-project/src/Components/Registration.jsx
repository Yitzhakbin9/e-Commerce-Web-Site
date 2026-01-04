import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../Css/styles.css';
import { register, errorMsgFromFirebaseAuth } from '../Firebase/firebaseAuth';
import usersRepo from '../Repos/usersRepo'
import { useNavigate } from 'react-router-dom';


const Registration = () => {

    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', userName: '', email: '', password: '' })

    async function handleClick() {
        try {
            const userCred = await register(newUser.email, newUser.password);
            const userAdded = await usersRepo.createUserDoc(userCred.user.uid, {
                email: newUser.email,
                role: "user",
                joinedAt: new Date(),
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                userName: newUser.userName,
                products: []
            });
            console.log("new user added -->  ", userAdded)

            alert('Welcome!!')
            navigate('/customer')


        } catch (e) {
            alert(errorMsgFromFirebaseAuth(e.code));
        }
    }

    return (
        <div className="page">
            <div className="box">
                <h1>New User Registration</h1>

                <TextField id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    style={{ width: "350px" }}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                />
                <br />
                <br />
                <TextField id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    style={{ width: "350px" }}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                />

                <br />
                <br />
                <TextField id="outlined-basic"
                    label="User Name"
                    variant="outlined"
                    style={{ width: "350px" }}
                    onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
                />

                <br />
                <br />
                <TextField id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    style={{ width: "350px" }}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />

                <br />
                <br />
                <TextField id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    style={{ width: "350px" }}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />

                <br />
                <br />
                <Button variant="contained" onClick={handleClick}>Create</Button>
                <br />
            </div>
        </div>

    )
}

export default Registration