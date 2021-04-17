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
import Add from './CreateModal'



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

export default function AddPrinterModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState("");
    const [result, setResult] = useState(false);
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const [topic ,setTopic] = useState("");
    const [printer, setPrinter] = useState('');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
     
    
    const submitHandler = (e) => {
        // setLoading(true)
        // setSuccess(false)
        setShow(false)
        // setResult(false)
        // setText('')
        // e.preventDefault();
        
        // const details = {
        //     name: printer,
        //     vendorId: localStorage.getItem("vendorId")
        // }
        // axios
        // .post(`/printer`, details , {headers})
        // .then(response => {
        //           console.log(response,"post");
        //           if(response.status === 200){
                    setText(`Printer ${printer} has been successfully added`);
                    setSuccess(true)
                    setLoading(false)
                    setResult(true)
        //           }  
                  
        // })
        // .catch(error => {
        //   console.log(error)
        //   setLoading(false)
        //   setResult(true)
        //   setText(error.response.data.message)
        //       })
      };

    const handleOpen = () => {
        setOpen(true);
        setLoading(false)
        setErr(false)
        setSuccess(false)
        setShow(true)
        setResult(false)
        setTopic("")
      };
    

    
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
            <Button
              variant="outlined"
              color="primary"
              size="small"
              className={classes.button}
              onClick={handleOpen}
            >
              Add Printer
            </Button>
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
                    <h2 id="transition-modal-title">{props.title}</h2>

                    <form
                    onSubmit={submitHandler}
                    style={{
                        padding: "20px",
                        display: "inline-block",
                        textAlign: 'center'
                    }}
                    >

                    <TextField
                    label="Printer name"
                    id="outlined-size-normal"
                    onChange={(e) => setPrinter(e.target.value)}
                    fullWidth
                    className={classes.root}
                    variant="outlined"
                    autoComplete="off"
                    />
            <button  className="add-order specific-modal vendor" onClick={submitHandler}>
                confirm
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
