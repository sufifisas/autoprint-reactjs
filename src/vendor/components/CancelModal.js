import React, { useState , useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import closebtn from "../../img/close.png";
import axios from "axios";
import { Redirect } from "react-router-dom";
import plus from "../../img/plus.png";
import { Roller } from 'react-awesome-spinners'
import ResModal from './Modal'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius:"5px",
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: "400px",
    position: "relative",
    textAlign: "center",
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

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(false);
  const [show, setShow] = useState(true);
  const [reason, setReason] = useState('')
  const orderId = localStorage.getItem("OrderId")
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("token")
  }
 

  const handleOpen = () => {
    setOpen(true);
    setLoading(false)
    setSuccess(false)
    setShow(true)
    setResult(false)
    setText('')
    setReason('')
  };

  const submitHandler = (e) => {
    setLoading(true)
    setSuccess(false)
    setShow(false)
    setResult(false)
    setText('')
    e.preventDefault();

    axios
    .post(`/order/${orderId}/reject`, {reason: reason} , {headers})
    .then(response => {
              console.log(response,"post");
              if(response.status === 200){
                localStorage.setItem("OrderStatus", "REJECTED");
                setText("Your order has been successfully rejected");
                console.log(reason,"reason")
                setSuccess(true)
                setLoading(false)
                setResult(true)
              }  
              
    })
    .catch(error => {
      console.log(error)
      setLoading(false)
      setResult(true)
      setText(error.response.data.message)
          })
  };


  const handleClose = () => {
    if (success === true) {
        setOrder(true)
    }
    setOpen(false);
    setResult(false)
  };
  if (order === true) {
    window.location.reload();
  }

  return (
    <div>
      <button type="button" className="add-order cancel" onClick={handleOpen}>
          reject
        </button>
      {show && 
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
            <h2 id="transition-modal-title">{props.title}</h2>
            <p id="transition-modal-description">Please state your reason to reject this order</p>
            <TextField
                    label="Reason"
                    id="outlined-size-normal"
                    onChange={(e) => setReason(e.target.value)}
                    fullWidth
                    className={classes.root}
                    variant="outlined"
                    autoComplete="off"
                    multiline
                      rows={4}
                    />
            <button  className="add-order specific-modal vendor" onClick={submitHandler}>
                confirm
            </button>
            
            

          </div>
        </Fade>
      </Modal>
      }
      {loading && <div className="page-loader api"><Roller /></div>}
      {result && <ResModal desc={text} status={success}/>}
    </div>
  );
}
