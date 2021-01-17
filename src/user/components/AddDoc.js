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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ResModal from './Modal'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';



const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: '100!important'
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
    formControl: {
        margin: 0,
        minWidth: "100%",
        textAlign: 'left'
      },
      input: {
        display: 'none',
      },
      button: {
          backgroundColor: '#5680E9',
          color: '#fff'
      },
      

  }));

export default function AddDoc(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState("");
    const [result, setResult] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [data, setData] = useState('');
    const [filename, setFilename] = useState('');
    const [pages, setPages] = useState('');
    const [colour, setColour] = useState('AUTO');
    const [copies, setCopies] = useState(1);
    const [duplex, setDuplex] = useState('NO_DUPLEX');
    const [pageOrientation, setPageOrientation] = useState('AUTO')
    const [coverColour, setCoverColour] = useState('NONE')
    const [coverType, setCoverType] = useState('NONE') 

    

    // const handleOpen = () => {
    //     setOpen(true);
    //     setLoading(false)
    //     setErr(false)
    //     setSuccess(false)
    //     setShow(true)
    //     setResult(false)
    //     setTopic("")
    //   };
    
	const submitHandler = e => {
        setLoading(true)
        setSuccess(false)
        setResult(false)
        setShow(false)
        const token = localStorage.getItem("token")
        const id = localStorage.getItem("OrderId");
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        const details = {
            data : data,
            filename : filename,
            pages : pages,
            colour : colour,
            copies : copies,
            coverColour: coverColour,
            coverType: coverType,
            pageOrientation : pageOrientation,
            duplex: duplex,
            orderId: id
        }
		e.preventDefault()
		axios
			.post('/document', details, {headers})
			.then(response => {
                setLoading(false);
                setSuccess(true)
                setResult(true)
                setText(`Document ${filename} has been successfully uploaded`)

			})
			.catch(error => {
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
            setShow(false)
          };

        const uploadImage = async (e) => {
            const file = e.target.files[0];
            const name = e.target.value
            const split = name.split('\\');
            const filename = split[2]
            const base64 = await convertBase64(file);
            setData(base64);
            setFilename(filename)
            setResult(false);
            setOpen(true)
        };
    
        const convertBase64 = (file) => {
            return new Promise((resolve, reject) => {
                setLoading(true)
                setShow(false)
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
    
                fileReader.onload = () => {
                    resolve(fileReader.result);
                    setOpen(true);
                    setShow(true);
                    setLoading(false)
                };
                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
        };
    
		return (
        <div>
            <div className="">
            <input
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => {uploadImage(e)}}
            />
            <label htmlFor="contained-button-file">
            <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        component="span"
      >
        add document
      </Button>
            </label>
            
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
                        textAlign: 'center',
                        width: "100%"
                    }}
                    >
                    
                    <div style={{width:'100%', textAlign:'center',marginBottom:'20px',fontSize:'24px'}}>
                        {filename}
                    </div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Colour</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={colour}
                        onChange={e => setColour(e.target.value)}
                        label="Colour"
                        >
                        <MenuItem value="AUTO">
                            <em>Auto</em>
                        </MenuItem>
                        <MenuItem value="STANDARD_MONOCHROME">Monochrome</MenuItem>

                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Page Orientation</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={pageOrientation}
                        onChange={e => setPageOrientation(e.target.value)}
                        label="Page Orentation"
                        >
                        <MenuItem value="AUTO">
                            <em>Auto</em>
                        </MenuItem>
                        <MenuItem value="PORTRAIT">Portrait</MenuItem>
                        <MenuItem value="LANDSCAPE">Landscape</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Duplex</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={duplex}
                        onChange={e => setDuplex(e.target.value)}
                        label="Duplex"
                        >
                        <MenuItem value="NO_DUPLEX">
                            <em>No duplex</em>
                        </MenuItem>
                        <MenuItem value="LONG_EDGE">Long Edge</MenuItem>
                        <MenuItem value="SHORT_EDGE">Short Edge</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Cover type</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={coverType}
                        onChange={e => setCoverType(e.target.value)}
                        label="Cover type"
                        >
                        <MenuItem value="NONE">
                            <em>Not Applicable</em>
                        </MenuItem>
                        <MenuItem value="SOFT">Soft</MenuItem>
                        <MenuItem value="HARD">Hard</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField autoComplete="off" fullWidth id="outlined-basic" label="Cover colour" variant="outlined" defaultValue="None" onChange={e => setCoverColour(e.target.value)}/>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="component-outlined">Pages</InputLabel>
                        <OutlinedInput autoComplete="off" id="component-outlined" onChange={e => setPages(e.target.value)} label="Pages" />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="component-outlined">Copies</InputLabel>
                        <OutlinedInput autoComplete="off" id="component-outlined" type="number" onChange={e => setCopies(e.target.value)} label="Copies" />
                    </FormControl>
                   
                     
                    <button type="submit" className="add-order" style={{width: '100%' ,  marginTop:'20px'}}>
                        upload
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
