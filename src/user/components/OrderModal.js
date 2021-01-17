import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import closebtn from "../../img/close.png";
import axios from "axios";
import { Redirect } from "react-router-dom";
import plus from "../../img/plus.png";
import { Roller } from 'react-awesome-spinners'
import TopupModal from './TopupModal'
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
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: "500px",
    position: "relative",
    textAlign: "center",
    borderRadius: 5
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [order, setOrder] = useState(false);
  const [show, setShow] = useState(true);
  const [topic ,setTopic] = useState("");
  const [orderid, setOrderId] = useState()

  const handleOpen = () => {
    setOpen(true);
    setLoading(false)
    setErr(false)
    setSuccess(false)
    setShow(true)
    setResult(false)
    setAddress("")
    setTopic("")
  };

  const submitHandler = (e) => {
    setLoading(true)
    setErr(false)
    setSuccess(false)
    setShow(false)
    setResult(false)
    e.preventDefault();
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDxgA4kIuo0-bxfSaqCOCwmlyjnV05oVPE`
    )
      .then((response) => response.json())
      .then((data) => {
        const coordinates = {
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
          userId: Number(localStorage.getItem("id")),
        };
        const headers = {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        };
        axios
          .post("/order", coordinates, { headers })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              localStorage.setItem("OrderId", response.data.id);
              localStorage.setItem("OrderDate", response.data.dateCreated);
              localStorage.setItem("OrderStatus", response.data.status);
              localStorage.setItem("userLat", response.data.latitude);
              localStorage.setItem("userLong", response.data.longitude);
              setOrderId(response.data.id)
              setLoading(false);
              setSuccess(true);
              setResult(true);
              setTopic("SUCCESS")
              setText("Your order has been successfully created");
            }
          })
          .catch((error) => {
            setLoading(false)
            setErr(true)
            setResult(true);
            setTopic("ERROR")
            setText(error.response.data.message)
          });
      })

      .catch((error) => {
        setLoading(false)
        setErr(true)
        setResult(true);
        setTopic("ERROR")
        setText(error.message)
      });
  };


  const handleClose = () => {
    if (props.title === "MESSAGE") {
      window.location.reload();
    }
    if (success === true) {
        setOrder(true)
    }
    setOpen(false);
    setResult(false)
  };
  if (order === true) {
    return <Redirect to="/user/order/document" />;
  }

  return (
    <div >
      <div className="add-order-head">
        <div>
          <div className="balance">
            <p>Current balance</p>
            <div className="wallet-text"><h3>MYR {Number.parseFloat(localStorage.getItem("wallet")).toFixed(2)}</h3><TopupModal iconsize="large"/></div>
          </div>
        </div>
        <button type="button" className="add-order" onClick={handleOpen}>
          <img width={24} src={plus} alt=""/>
          NEW ORDER
        </button>
      </div>
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
              <div className="create-order">
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
                  display: "inline-block",
                  marginBottom: "20px",
                  marginTop: "20px",
                  width: '100%'
                }}
              >

                <TextField
                    label="Address"
                    id="outlined-size-normal"
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    variant="outlined"
                    helperText="Please enter your address to create order"
                    autoComplete="off"
                    />
                <button type="submit" className="add-order" style={{margin:'auto', width:'100%'}}>
                  confirm
                </button>
              </form>
              </div>
          </div>
        </Fade>
      </Modal>
      }
     {loading && (
            <div className="page-loader api">
                <Roller />
            </div>
            )}
            {result && <ResModal desc={text} status={success} orderid={orderid}/>}
    </div>
  );
}
