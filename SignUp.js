import React, { useState, useRef, useEffect } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from 'react-router-dom';
import {
    Grid,
    Paper,
    Avatar,
    Typography,
    TextField,
    Button,
} from "@material-ui/core";
// import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { signUp } from './FirebaseFun';
import { db, storage } from './Firebase';


const Signup = (uid) => {
    const dpRef = useRef();
    const navigate = useNavigate();
    let name, value
    const [preview, setPreview] = useState("");
    const [image, setImage] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    })

    const getUser = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }

    //function
    const metadata = {
        contentType: 'image/jpeg'
    };
    const sendingData = (uid) => {
        const dpImage = document.getElementById("dpImage").files[0]
        const storageRef = ref(storage, 'dpImages/' + uid);
        const uploadTask = uploadBytesResumable(storageRef, dpImage, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
            },
            (error) => {
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setDoc(doc(db, 'profile', uid), {
                        dpLink: downloadURL,
                        ...user,
                        uid
                    })
                });
            }
        );
    }
    useEffect(() => {
        if (image) {
            const imageReader = new FileReader();
            imageReader.onloadend = () => {
                setPreview((imageReader.result).toString());
            }
            imageReader.readAsDataURL(image);
        }
        else {
            setPreview(null)
        }
    }, [image])
    //Styling
    const paperStyle = {
        padding: 20,
        margin: '20px auto',
        width: 300,
        height: '75vh'
    };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: "#1bbd7e", height: '120px', width: '120px' };
    const marginTop = { marginTop: 5, display: 'none', cursor: 'pointer' };

    return (
        <div className="form">
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle} onClick={(e) => {
                            dpRef.current.click()
                        }}>{preview ? (
                            <img src={preview} alt="userdp" style={{ align: 'center', height: '120px', width: '120px' }} />
                        ) :
                            <Typography> Add Image</Typography>
                            }
                        </Avatar>
                        <input type='file' id='dpImage' name='userDp' accept="image/*" style={marginTop} ref={dpRef} onChange={(e) => { setImage(e.target.files[0]) }} />
                        <h2 style={headerStyle}>Sign Up</h2>
                        <Typography variant="caption" gutterBottom>
                            Please fill this form to create an account !
                        </Typography>
                    </Grid>
                    <form>
                        <TextField onChange={getUser} fullWidth label="Name" value={user.name} name="name" />
                        <TextField onChange={getUser} fullWidth label="Email" value={user.email} name="email" />

                        <TextField
                            fullWidth
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            value={user.phone}
                            onChange={getUser}
                            name="phone"
                        />
                        <FormControl component="fieldset" style={marginTop}>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                name="gender"
                                style={{ display: "initial" }}
                            >
                                <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Female"
                                />
                                <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label="Male"
                                />
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Password"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={getUser}
                            name="password"
                            type="password"
                        />

                        <Button onClick={() => { signUp(user.email, user.password, navigate, sendingData) }} variant="contained" color="primary" style={{ margin: '10px' }} >
                            Sign up
                        </Button>
                        <Typography>Have Account Account ?<Link to='/login'> Sign In</Link></Typography>
                    </form>
                </Paper>
            </Grid>
        </div >
    );
};

export default Signup;