import React, { useState , useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import closebtn from "../../img/close.png";
import axios from "axios";
import { Roller } from 'react-awesome-spinners'
import Paypal from './Paypal'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: "400px",
      position: "relative",
      textAlign: "center",
      borderRadius: 5
    },
    

  }));

export default function TopupModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState("");
    const [result, setResult] = useState(false);
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const [pay, setPay] = useState(false);
    const [topic ,setTopic] = useState("");
    const [amount, setAmount] = useState()
    const [order, setOrder] = useState(false);
    const [value ,setValue] = useState(0)
    const [custom ,setCustom] = useState(0)
    
    

    const handleOpen = () => {
        setOpen(true);
        setLoading(false)
        setErr(false)
        setSuccess(false)
        setShow(true)
        setResult(false)
        setTopic("")
        
      };
    
	const submitHandler = e => {
        setLoading(true)
        setErr(false)
        setSuccess(true)
        setResult(true)
    
        if(value===null) {
            setPay(false)
            
          }
          else {
            setPay(true)
            setAmount(value)
          }
        }
    
        const handleClose = () => {
            if (success === true) {
                window.location.reload()
              }
            setOpen(false);
            setResult(false)
          };
    
		return (
        <div className="wallet-button">
            <IconButton aria-label="delete" style={{padding: '5px'}} color="primary" onClick={handleOpen}>
                <AddBoxOutlinedIcon fontSize={props.iconsize}/>
            </IconButton>
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
                    <h2 id="transition-modal-title">add wallet</h2>

                    {pay ? <Paypal amount={amount}/> :<div
                    
                    style={{
                        padding: "20px",
                        display: "inline-block",
                        textAlign: 'center'
                    }}
                    >
                    <div className="topup-choice">
                    <RadioGroup  aria-label="gender" name="gender1" value={value} onChange={e => setValue(Number(e.target.value))} >
                        <FormControlLabel className={classes.radio} onChange={()=> setErr(false)} value={5} control={<Radio />} label="MYR 5"/>
                        <FormControlLabel className={classes.radio} onChange={()=> setErr(false)} value={10} control={<Radio />} label="MYR 10" />
                        <FormControlLabel className={classes.radio} onChange={()=> setErr(false)} value={20} control={<Radio />} label="MYR 20" />
                        
                        <div>
                        <FormControlLabel className={classes.radio} checked={err} control={<Radio />} disabled/> 
                        <TextField type="number" id="outlined-basic" value={value} label="Preferred amount" variant="outlined" onClick={e => {setValue(e.target.value); setErr(true)}} onChange={e => {setValue(Number(e.target.value)); setErr(true) } } />
                        </div> 
                    </RadioGroup>
                    {/* <button onClick={() => setValue(5)}>
                        MYR 5
                    </button>
                    <button onClick={() => setValue(10)}>
                        MYR 10
                    </button>
                    <button onClick={() => setValue(20)}>
                        MYR 20
                    </button> */}
                </div>
                    <button type="submit" className="add-order" style={{width: '100%' ,  marginTop:'20px'}} onClick={submitHandler} disabled={value===0 ? true : false}>
                        confirm
                    </button>
                    {value===0 && <p style={{marginBottom:'0px',color:'red'}}>Please enter any amount</p>}
                    </div>}
                </div>
                </Fade>
            </Modal>
            )}
     
            {/* {loading && (
            <div className="page-loader api">
                <Roller />
            </div>
            )} */}
            {/* {result && (
            <div className="page-loader api">
                <div className="loader-modal">
                <h3>{topic}</h3>
                <p>{text}</p>
                <button onClick={handleClose}>OK</button>
                </div>
            </div>
            )} */}
        </div>
     
    );
	}
