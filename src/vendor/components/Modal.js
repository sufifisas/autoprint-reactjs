import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import closebtn from '../../img/close.png'
import { Redirect } from "react-router-dom";

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

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    if(props.status){
      if(props.orderid){
        setId(props.orderid)
        return <Redirect to={`/user/order/${id}`} />;
      }
      window.location.reload()
    }
    setOpen(false);
  };


  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        // onClose={handleClose}
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
            
            <p className="description"id="transition-modal-description">{props.desc}</p>
            <button className="add-order vendor" onClick={handleClose} style={{width: '100%' ,  marginTop:'20px'}}>
                       okay
                    </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}