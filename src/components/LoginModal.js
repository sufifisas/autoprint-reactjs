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
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Button from '@material-ui/core/Button';
import ResModal from './Modal'



const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:'rgba(90,185,234,0.7)'
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
    const [loggedIn, setLoggedIn] = useState(false);
    const [userIn, setUserIn] = useState(false);
    

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
      };
    
	const submitHandler = e => {
        setLoading(true)
        setErr(false)
        setSuccess(false)
        setShow(false)
        setResult(false)
        const details = {
            username : username,
            password : password,
        }
		e.preventDefault()
		axios
			.post('/login', details)
			.then(response => {
                if(response.status === 200 && response.data.type === "USER"){
                    localStorage.setItem("id",response.data.id)
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("type",response.data.type)
                    setUserIn(true)
                    setLoggedIn(true)
                    setSuccess(true)
                    setLoading(false)
                }
                
                else if(response.status === 200 && response.data.type === "VENDOR"){
                    localStorage.setItem("id",response.data.id)
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("type",response.data.type)
                    setUserIn(false)
                    setLoggedIn(true)
                    setSuccess(true)
                    setLoading(false)
                }
                
			})
			.catch(error => {
                setText("Invalid credentials! Please check your username or password")
                setResult(true)
                setLoading(false)
            })
        }
    
        const handleClose = () => {
            if (success === true) {
                window.location.reload();
              }
            setOpen(false);
            setResult(false)
          };

        if(loggedIn && userIn){
        return <Redirect to="/user" />
        }
        else if(loggedIn && !userIn){
            return <Redirect to="/vendor" />
        }
    
		return (
        <div>
            <div className="" style={{left:20,right:'unset'}}>
              {/* <Button
              variant="outlined"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<EditOutlinedIcon />}
              onClick={handleOpen}
            >
            password
            </Button> */}
            <button className="button"  onClick={handleOpen}> Login </button>
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
                    <h2 id="transition-modal-title" style={{color:'#5AB9EA'}}>{props.title}</h2>

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
                    label="Password"
                    type="password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    variant="outlined"
                    required
                    />
                     
                    <button type="submit" className="add-order" style={{width: '100%' ,  marginTop:'20px'}}>
                        login
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
