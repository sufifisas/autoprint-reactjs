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
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const [pay, setPay] = useState(false);
    const [topic ,setTopic] = useState("");
    const [amount, setAmount] = useState()
    const [order, setOrder] = useState(false);
    const [value ,setValue] = useState(null)
    

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
        // setLoading(true)
        // setErr(false)
        // setSuccess(false)
        // setResult(false)
        setShow(false)
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': localStorage.getItem("token")
        //   }
        // axios
        //     .delete(`/document/${props.id}/cancel`,{headers})
        //     .then(res => {
        //         console.log(res)
        //         setText(`Document ${props.desc} has been successfully remove from the order`)
        //         setLoading(false)
        //         setResult(true)
        //         setSuccess(true)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    
        // if(value===null) {
        //     setPay(false)
            
        //   }
        //   else {
        //     setPay(true)
        //     setAmount(value)
        //   }
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
        
        const del = (id) => {

            console.log(id)
            
            }
    
		return (
        <div>
            <IconButton aria-label="delete" style={{padding: '5px'}} color="primary" onClick={handleOpen}>
                <DeleteIcon />
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
                    <h2 id="transition-modal-title">{props.title}</h2>
                    <p className="description"id="transition-modal-description">Are you sure to delete {props.desc} file from this order?</p>


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
