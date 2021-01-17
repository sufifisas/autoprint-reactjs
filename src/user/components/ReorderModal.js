import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import closebtn from "../../img/close.png";
import axios from "axios";
import { Roller } from 'react-awesome-spinners'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ResModal from './Modal'



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
      width: "500px",
      position: "relative",
      textAlign: "center",
      borderRadius: 5
    },

  }));

export default function DeleteModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState("");
    const [result, setResult] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const [order, setOrder] = useState(false);
    const wallet = localStorage.getItem("wallet");
    const inv = localStorage.getItem("inv")
    const orderId = localStorage.getItem("OrderId")
    

    const handleOpen = () => {
        setOpen(true);
        setLoading(false)
        setSuccess(false)
        setShow(true)
        setResult(false)
        
      };
    
	const submitHandler = e => {
        setLoading(true)
        setSuccess(false)
        setResult(false)
        setShow(false)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
          }
        if(wallet < inv){
          setText("You have insufficient credit. Please topup your wallet before proceed to confirm")
          setSuccess(false)
          setResult(true)
          setLoading(false)
        }
        else {
            axios
            .post(`/order/${orderId}/reorder`, {} , {headers})
            .then(response => {
                if(response.status === 200){
                   localStorage.setItem("OrderStatus", response.data.status); 
                   console.log(response,"reorder")
                   setLoading(false)
                   setResult(true)
                   setText("Your order has been successfully recreated. Please check in the confirmed order for more details")
                   setSuccess(true)
                } 
                })
            .catch(error => {
                setLoading(false)
                setResult(true)
                setText(error.response.data.message)
            })
        }
        
        }
    
        const handleClose = () => {
            if (success) {
                setOrder(true)
              }
            setOpen(false);
            setResult(false)
          };

          if (order === true) {
            window.location.reload()
          }
        
    
		return (
        <div>
            <button type="button" className="add-order" onClick={handleOpen}>
          reorder
        </button>
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
                    <h2 id="transition-modal-title">{props.title}</h2>
                    <p className="description"id="transition-modal-description">Are you sure to confirm this cancelled order back?</p>


                    <button type="submit" className="add-order" style={{width: '100%' ,  marginTop:'20px'}} onClick={submitHandler}>
                        confirm
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
