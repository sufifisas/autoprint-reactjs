import React, { useState , useEffect } from "react";
import {Redirect} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import closebtn from "../img/close.png";
import axios from "axios";
import { Roller } from 'react-awesome-spinners'
import TextField from '@material-ui/core/TextField';
import ResModal from './Modal'
import Geocode from "react-geocode";


const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:'rgba(86,128,233,0.7)'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: "500px",
      position: "relative",
      textAlign: "center",
      borderRadius: 5
    },

  }));

export default function LoginModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState("");
    const [result, setResult] = useState(false);
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const [topic ,setTopic] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [vendorname, setVendorname] = useState('')
    const [address, setAddress] = useState('')

    Geocode.setApiKey("AIzaSyDxgA4kIuo0-bxfSaqCOCwmlyjnV05oVPE");
    

    const handleOpen = () => {
        setOpen(true);
        setLoading(false)
        setErr(false)
        setSuccess(false)
        setShow(true)
        setResult(false)
        setTopic("")
        setUsername('')
        setPassword('')
        setFullname('')
        setEmail('')
        setText('')
        setVendorname('')
        setAddress('')
      };
    
	const submitHandler = e => {
        setLoading(true)
        setErr(false)
        setSuccess(false)
        setShow(false)
        setResult(false)
        e.preventDefault()
        Geocode.fromAddress(address).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                const details = {
                    username : username,
                    password : password,
                    fullname : fullname,
                    email : email,
                    vendorname : vendorname,
                    latitude : lat,
                    longitude : lng
                    }   
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'superadmin_576a0a1284a853b56f50e876273cdadbfd8ec13408223f1492617a75399921c4'
                }
                axios
                    .post('/vendor', details ,{headers})
                    .then(response => {
                        console.log(response);
                        if(response.status === 200){
                            setText("Congratulation! Registration success. Please log in to proceed.")
                            setSuccess(true)
                            setLoading(false)
                            setResult(true)
                            console.log(response)
                        }        
                    })
                    .catch(error => {
                        console.log(error.response)
                        setText(error.response.data.message)
                        setLoading(false)
                        setResult(true)
                    })
            },
            error => {
              console.error(error);
            }
          );
		
        }
    
        const handleClose = () => {
            if (success === true) {
                window.location.reload();
              }
            setOpen(false);
            setResult(false)
          };

    
		return (
        <div>
            <div className="" style={{left:20,right:'unset'}}>

            <button className="button partner"  onClick={handleOpen}>Be a Partner</button>
            </div>
            {show && (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <img
                    className="modal-btn-close"
                    src={closebtn}
                    alt=""
                    onClick={handleClose}
                    />
                    <h2 id="transition-modal-title" style={{color:'#5680E9'}}>{props.title}</h2>

                    <form
                    onSubmit={submitHandler}
                    style={{
                        padding: "20px",
                        display: "inline-block",
                        marginTop: "20px",
                        textAlign: 'center'
                    }}
                    >
                    <TextField
                    id="outlined-password-input"
                    label="Username"
                    type="type"
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    variant="outlined"
                    required
                    />
                    <TextField
                    id="outlined-password-input"
                    label="Email address"
                    type="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    variant="outlined"
                    required
                    />
                    <TextField
                    id="outlined-password-input"
                    label="Full name"
                    type="type"
                    autoComplete="off"
                    onChange={(e) => setFullname(e.target.value)}
                    fullWidth
                    variant="outlined"
                    required
                    />
                    <TextField
                    id="outlined-password-input"
                    label="Vendor name"
                    type="type"
                    autoComplete="off"
                    onChange={(e) => setVendorname(e.target.value)}
                    fullWidth
                    variant="outlined"
                    required
                    />
                    <TextField
                    id="outlined-password-input"
                    label="Address"
                    type="type"
                    autoComplete="off"
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    variant="outlined"
                    required
                    />
                    <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    variant="outlined"
                    required
                    />
                     
                    <button type="submit" className="add-order" style={{width: '100%' ,  marginTop:'20px'}}>
                        Sign up
                    </button>
                    </form>
                </div>
                </Fade>
            </Modal>
            )}
            {loading && (
            <div className="page-loader api">
                <Roller />
            </div>
            )}
            {result && <ResModal desc={text} status={success}/>}
        </div>
     
    );
	}
