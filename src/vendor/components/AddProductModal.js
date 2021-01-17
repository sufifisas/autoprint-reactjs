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
    const [product, setProduct] = useState([])
    
    useEffect(() => {
        axios
        .get(`/product/all`)
        .then(response => {
            console.log(response,"product");
            setProduct(response.data.content)
        })
        .catch(error => {
            console.log(error);
                })
    },[])

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
              Add Product
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
                    style={{
                        padding: "20px",
                        display: "inline-block",
                        marginTop: "20px",
                        textAlign: 'center',
                        width: '70%'
                    }}
                    >
                 
                    {product.map((item, i) => {
                        return (
                        <div key={i} className="product-all">
                            <Add productId={item.id} title={item.productName}/>
                        </div>
                        );
                    })}
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
