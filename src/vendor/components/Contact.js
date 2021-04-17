import React,{ useState } from 'react'
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import ContactBg from '../../img/contact.png'
import TextField from '@material-ui/core/TextField';
import Modal from './Modal'
import { Roller } from 'react-awesome-spinners'

const useStyles = makeStyles((theme) => ({
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

function Contact() {
    const classes = useStyles();
    const[content, setContent] = useState()
    const[title, setTitle] = useState()
    const [topic, setTopic] = useState('')
    const [text, setText] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(false);

	const submitHandler = e => {
    //     const details = {
    //         content : content,
    //         title : title
    //     }
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Authorization': localStorage.getItem("token")
    //       }
    //     setLoading(true)
    //     setSuccess(false)
    //     setResult(false)
        e.preventDefault()
		// axios
		// 	.post('/activity', details , {headers})
		// 	.then(response => {
    //             console.log(response);
    //             if(response.status === 200){
                    setLoading(false)
                    setSuccess(true)
                    setResult(true)
                    setText("Your report has been successfully sent.")
    //             }        
		// 	})
		// 	.catch(error => {
    //             setResult(true)
    //             setLoading(false)
    //             setText("Please fill in the form provided")
		// 	})
        }
        return (
          <div className="vendor-site">
            <div className="contact container-lg">
              <div className="contact-body">
                <div className="body1">
                  <div className="contact-text">
                    <h1>Get In Touch</h1>
                    <h3>
                      Have a question or problem? Please fill up the form below
                      and we will reply back soonest!
                    </h3>
                    <div className="line"></div>
                  </div>
                  <form noValidate autoComplete="off" onSubmit={submitHandler}>
                    <TextField
                      id="outlined-basic"
                      label="Title"
                      fullWidth
                      variant="outlined"
                      className={classes.root}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      className={classes.root}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="contact-button">
                      <button type="submit" className="add-order">
                        Submit
                      </button>
                    </div>
                  </form>
                 
                </div>
                <div className="body2">
                  <img src={ContactBg} alt="" />
                </div>
              </div>
            </div>
            {loading && <div className="page-loader api"><Roller /></div>}
            {result && <Modal title={topic} desc={text} status={success}/>}
          </div>
        );
}

export default Contact;