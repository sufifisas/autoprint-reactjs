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
  const orderId = localStorage.getItem("OrderId")

 

  const handleOpen = () => {
    setOpen(true);
    setLoading(false)
    setSuccess(false)
    setShow(true)
    setResult(false)
  };

  const submitHandler = (e) => {
    setLoading(true)
    setSuccess(false)
    setShow(false)
    setResult(false)
    e.preventDefault();
    axios
			.post(`/order/${orderId}/cancel`)
			.then(response => {
                console.log(response.data);
                if(response.status === 200){
                    setText("Your order has been cancelled")
                    localStorage.setItem("OrderStatus", "CANCELLED");
                    setText("Your order has been successfully cancel");
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
          cancel
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
            <p id="transition-modal-description">Are you sure to cancel this order?</p>
            <button  className="add-order specific-modal" onClick={submitHandler}>
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
