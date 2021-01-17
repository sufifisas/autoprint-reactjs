import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import closebtn from '../../img/close.png'
import { Redirect } from "react-router-dom";
import GoogleMapReact from 'google-map-react';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: '400px',
    position: 'relative',
    textAlign: 'center',
    borderRadius: 5
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [id, setId] = useState()
  const [succ, setSucc] = useState(false)
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const center = {
    lat: 59,
    lng: 33
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if(props.status){
      if(props.orderid){
        setId(props.orderid)
      }
      setSucc(true)
      // window.location.reload()
    }
    setOpen(false);
  };
  

  return (
    <div className="maps">
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}
      <p onClick={handleOpen}>map{props.name}</p>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img className="modal-btn-close" src={closebtn} alt="" onClick={handleClose}/>
            {props.status ? <h2 id="transition-modal-title">success</h2> : <h2 id="transition-modal-title">error</h2>}

            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDxgA4kIuo0-bxfSaqCOCwmlyjnV05oVPE' }}
                defaultCenter={center}
                defaultZoom={11}
                >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
                </GoogleMapReact>
            </div>
            
            <p className="description"id="transition-modal-description">{props.desc}</p>
            <button className="add-order" onClick={handleClose} style={{width: '100%' ,  marginTop:'20px'}}>
                       okay{id}
                    </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}