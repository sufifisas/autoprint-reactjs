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
import userimg from '../../img/user.jpg'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ResModal from './Modal'
import Geocode from "react-geocode";


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
    input: {
      display: 'none',
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

export default function Editprofile(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState("");
    const [result, setResult] = useState(false);
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const [topic ,setTopic] = useState("")
    const [username , setUsername] = useState('')
    const [email , setEmail] = useState('')
    const [fullname , setFullname] = useState('')
    const [imageBase64 , setImageBase64] = useState()
    const [phoneNumber , setPhoneNumber] = useState('')
    const [img ,setImg] = useState(false)
    const [imageUrl, setImgUrl] = useState('')
    const [vendorname, setVendorname] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [address, setAddress] = useState('')

    Geocode.setApiKey("AIzaSyDxgA4kIuo0-bxfSaqCOCwmlyjnV05oVPE");


    // useEffect(() => {
    //     const headers = {
    //       'Content-Type': 'application/json',
    //       'Authorization': localStorage.getItem("token")
    //     }
    //     setLoading(true)
    //     axios
    //           .get(`/vendor/${localStorage.getItem("vendorId")}`,{headers})
    //           .then(response => {
    //             console.log(response.data.user,"test")
    //               setFullname(response.data.user.fullname)
    //               setEmail(response.data.user.email)
    //               setUsername(response.data.user.username)
    //               setPhoneNumber(response.data.user.phoneNumber)
    //               setImageBase64(response.data.user.imageBase64)
    //               setImgUrl(response.data.user.imgUrl)
    //               setVendorname(response.data.vendorname)
    //               setLatitude(response.data.latitude)
    //               setLongitude(response.data.longitude)
    //               setLoading(false)
    //               Geocode.fromLatLng(response.data.latitude,response.data.longitude).then(
    //                 response => {
    //                   const addresses = response.results[0].formatted_address;
    //                   setAddress(addresses)
    //                 },
    //                 error => {
    //                   console.error(error);
    //                 }
    //               );
    //               })
    //           .catch(error => {
    //               console.log(error)
    //           })
    //   },[]);

    const handleOpen = () => {
        setOpen(true);
        setLoading(false)
        setErr(false)
        setSuccess(false)
        setShow(true)
        setResult(false)
        setTopic("")
      };
    
    

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setImageBase64(base64)
        setImg(true)
      };
    
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
    

	const submitHandler = e => {
        // setLoading(true)
        // setErr(false)
        // setSuccess(false)
        setShow(false)
        // setResult(false)

        // Geocode.fromAddress(address).then(
        //   response => {
        //     const { lat, lng } = response.results[0].geometry.location;
        //     setLatitude(lat)
        //     setLongitude(lng)
        //     console.log(lat, lng)
        //     const headers = {
        //       'Content-Type': 'application/json',
        //       'Authorization': token
        //     }
        //   const details = {
        //       username,
        //       email,
        //       fullname,
        //       imageBase64,
        //       phoneNumber,
        //       vendorname,
        //       latitude:lat,
        //       longitude:lng
        //   }
        //   const id = localStorage.getItem("vendorId");
        //   e.preventDefault()
        //   axios
        //     .put('/vendor/'+ id , details , {headers})
        //     .then(response => {
        //               if (response.status === 200) {
                          setLoading(false);
                          setSuccess(true);
                          setResult(true);
                          setTopic("SUCCESS")
                          setText("Your profile has been successfully updated");         
        //               }
        //     })
        //     .catch(error => {
        //               setLoading(false)
        //               setErr(true)
        //               setResult(true);
        //               setTopic("ERROR")
        //               setText(error.response.data.message)
        //               })
          // },
          // error => {
          //   console.error(error);
          // }
        // );

        // const token = localStorage.getItem("token")
       
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
            <div className="profile-button">
              <Button
              variant="outlined"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<EditOutlinedIcon />}
              onClick={handleOpen}
            >
              profile
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
                        marginTop: "20px",
                        textAlign: 'center'
                    }}
                    >
                      <TextField
                    label="Vendor name"
                    id="outlined-size-normal"
                    defaultValue= {vendorname}
                    onChange={(e) => setVendorname(e.target.value)}
                    fullWidth
                    className={classes.root}
                    variant="outlined"
                    />
                    <TextField
                    label="Username"
                    id="outlined-size-normal"
                    defaultValue= {username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    className={classes.root}
                    variant="outlined"
                    />
                    <TextField
                    label="Full name"
                    id="outlined-size-normal"
                    defaultValue= {fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    fullWidth
                    className={classes.root}
                    variant="outlined"
                    />
                    <TextField
                    label="Email address"
                    id="outlined-size-normal"
                    defaultValue= {email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    className={classes.root}
                    variant="outlined"
                    />
                    <TextField
                    label="Phone number"
                    id="outlined-size-normal"
                    defaultValue= {phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    fullWidth
                    className={classes.root}
                    variant="outlined"
                    />
                    <TextField
                    label="Address"
                    id="outlined-size-normal"
                    defaultValue= {address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    className={classes.root}
                    variant="outlined"
                    autoComplete="off"
                    multiline
                      rows={4}
                    />
                    <div className="profile-img">
                      {img ? <img src={imageBase64?imageBase64:imageUrl} alt="" style={{width: '140px',height: '140px', borderRadius: '50%'}} />:<img src={imageUrl?imageUrl:userimg} alt="" style={{width: '140px',height: '140px', borderRadius: '50%'}}/>}
                      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(e) => {
                                  uploadImage(e);
                                  }} />
                      <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span" style={{position:"absolute", top:0,bottom:0,left:0,right:0}}>
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </div>
                    
                    <button type="submit" className="add-order vendor" style={{width: '100%' ,  marginTop:'20px'}}>
                        UPDATE
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
