import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../Css/styles.css';
import { Link } from "react-router-dom"
import { useState } from "react"
import { login, errorMsgFromFirebaseAuth } from '../Firebase/firebaseAuth'
import usersRepo from '../Repos/usersRepo'
import { useNavigate } from 'react-router-dom';



const LogIn = () => {

    const [user, setUser] = useState({ email: '', password: '' })
    const navigate = useNavigate();


    async function handleClick() {

        let userCred
        try {
            userCred = await login(user.email, user.password);
            console.log("Logged in!");
        } catch (e) {
            alert(errorMsgFromFirebaseAuth(e.code));
            return
        }

        const uid = userCred.user.uid;
        const userDoc = await usersRepo.getUserById(uid);
        const role = userDoc._document.data.value.mapValue.fields.role
 
        if (role === 'admin') {
            navigate('/admin')
        } else {
            navigate('/customer')
        }
    }


    return (
        <div className="page">
            <div className="box">
                <h1>Log In</h1>

                <TextField id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    style={{ width: "350px" }}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}

                />
                <br />
                <br />

                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    style={{ width: "350px" }}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <br />
                <br />
                <Button onClick={handleClick} variant="contained">Login</Button>
                <br />
                <br />
                new user? &nbsp;
                <Link to={"/registration"}>Register</Link>

            </div>
        </div>
    );
}


export default LogIn