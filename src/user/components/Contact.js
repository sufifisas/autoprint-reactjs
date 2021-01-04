import React,{ useState } from 'react'
import axios from 'axios'
import ContactBg from '../../img/contact.png'

function Contact() {

    const[content, setContent] = useState('')
    const[title, setTitle] = useState('')
    

	const submitHandler = e => {
        const details = {
            content : content,
            title : title
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
          }
        e.preventDefault()
		axios
			.post('/activity', details , {headers})
			.then(response => {
                console.log(response);
                if(response.status === 200){
                    alert("report sent")
                    
                }        
			})
			.catch(error => {
				console.log(error)
			})
        }
        return(
            <div className="contact">
                <div className="contact-body">
                    <div className="body1">
                        <div className="contact-text">
                            <h1>Get In Touch</h1>
                            <h3>Have a question or problem? Please fill up the form below and we will reply back soonest!</h3>
                            <div className="line"></div>
                        </div>
                        <form onSubmit={submitHandler}>
                            <div className="content">
                                <p>Subject</p>
                                <input type="text" placeholder="Please state the subject here" name="title" onChange={e => setTitle(e.target.value)} />
                            </div>
                            <div className="content">
                                <p>Description</p>
                                <textarea type="text" placeholder="Please write down the description here" name="content" onChange={e => setContent(e.target.value)}/>
                            </div>
                            <div className="contact-button">
                                <button type="submit" className="send">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="body2">
                        <img src={ContactBg} alt=""/>
                    </div>
                </div>
            </div>
        );
}

export default Contact;