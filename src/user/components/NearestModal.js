import React, { useState , useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import closebtn from "../../img/close.png";
import axios from "axios";
import { Roller } from 'react-awesome-spinners'
import TextField from '@material-ui/core/TextField';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Button from '@material-ui/core/Button';
import ResModal from './Modal'
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Geocode from "react-geocode"

Geocode.setApiKey("AIzaSyDxgA4kIuo0-bxfSaqCOCwmlyjnV05oVPE");


const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: '40px',
      width: "400px",
      position: "relative",
      textAlign: "center",
      borderRadius: 5
    },
    root: {
      '& label.Mui-focused': {
        color: '#8860D0',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#8860D0',
      },
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: '#8860D0',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#8860D0',
        },
      },
    },

  }));

export default function UpdatePassword(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState("");
    const [result, setResult] = useState(false);
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const [topic ,setTopic] = useState("");
    const [price, setPrice] = useState(props.price);
    const [status, setStatus] = useState(props.active)
    const [vendor ,setVendor] = useState([])
    const [choice , setChoice] = useState('')

    
    const handleOpen = () => {
        setOpen(true);
        setLoading(false)
        setErr(false)
        setSuccess(false)
        setShow(true)
        setResult(false)
        setChoice(props.venId)
        setTopic("")
        axios
            .post(`/vendor/nearest`,{latitude:props.lat,longitude:props.lng})
            .then(response => {
                console.log(response,"updated");
                setVendor(response.data.list);
            })
            .catch(error => {
                console.log(error.response.data)
                
            })
      };
    
	const submitHandler = e => {
        setLoading(true)
        setErr(false)
        setSuccess(false)
        setShow(false)
        setResult(false)
        console.log(1)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
          }
		e.preventDefault()
        axios
        .post(`/order/${localStorage.getItem("OrderId")}/pre/confirm`,{ vendorId: choice} ,{headers})
        .then(response => {
            if(response.status === 200){  
              setLoading(false)
              setSuccess(true)
              setResult(true)
              setText("Issued vendor has been updated")
            } 
            })
        .catch(error => {
            console.log(error.response.data)
            setLoading(false)
            setResult(true)
            setText(error.response.data.message)
        })
        }
    
        const handleClose = () => {
            if (props.title === "MESSAGE") {
              window.location.reload();
            }
            if (success === true) {
                window.location.reload();
              }
            setOpen(false);
            setResult(false)
          };
    
		return (
        <div>
            <div className="" style={{left:20,right:'unset'}}>
              
            <IconButton aria-label="delete" className={classes.margin} onClick={handleOpen}>
                <EditOutlinedIcon color="primary"/>
            </IconButton>
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
                    <h2 id="transition-modal-title" style={{marginBottom:'20px'}}>{props.title}</h2>

                    <RadioGroup  aria-label="gender" name="gender1" value={choice} onChange={e => setChoice(Number(e.target.value))} >
                    {vendor.map((item, i) => {
                        return (
                        <div key={i} className="nearest"><FormControlLabel className={classes.radio} value={item.id} control={<Radio />} label={item.vendorname}/></div>
                        );
                    })}
                    </RadioGroup>

                    <button type="submit" onClick={submitHandler} className="add-order vendor" style={{width: '100%' ,  marginTop:'20px'}}>
                        change
                    </button>
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
