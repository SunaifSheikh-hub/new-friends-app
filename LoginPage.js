import React from 'react';
import { useNavigate } from 'react-router-dom';
import useState from 'react-hook-use-state';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Checkbox } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { FormGroup } from '@mui/material';
import { Link } from "react-router-dom";
import { signIn } from './FirebaseFun';



export default function LoginPage() {
    const navigate = useNavigate()
    //functions
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    let name, value
    const changeHandler = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }
    
    //styling
    const paperStyle = {
        padding: 20,
        margin: '20px auto',
        width: 300,
        height: '70vh'
    }
    const avatarStyle = {
        backgroundColor: '#00A36C'
    }



    return (
        <>
            <Grid alig>

                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <h2>Login</h2>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    </Grid>
                    <Grid marginTop={1}>
                        <h1 style={{ color: '#00A36C' }}>F.R.I.E.N.D.S</h1>
                    </Grid>
                    <TextField onChange={changeHandler} label="Email" variant="standard" fullWidth required value={user.email} name='email'></TextField>
                    <TextField onChange={changeHandler} label="Password" variant="standard" fullWidth required value={user.password} name='password'></TextField>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Remembre me" />
                    </FormGroup>
                    <Button color='primary' fullWidth variant='contained' onClick={() => signIn(user.email, user.password, navigate)}>Sign In</Button>
                    <Typography >
                        Do you have an account ? <Link style={{ cursor: 'pointer' }} to="/signup"> Sign Up </Link>
                    </Typography>
                </Paper>
            </Grid>
        </>
    )
}
