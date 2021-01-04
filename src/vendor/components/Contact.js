import React,{ Component } from 'react'
import axios from 'axios'
import ContactBg from '../../img/contact.png'

class Contact extends Component {

    constructor(props) {
        super(props)

		this.state = {
			title: '',
            content: '',    
        }
        
    }

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
          }
        e.preventDefault()
		axios
			.post('/activity', this.state , {headers})
			.then(response => {
                console.log(response);
                if(response.status === 200){
                    alert("report sent")
                    
                }        
			})
			.catch(error => {
				alert(error.response.data.message)
                console.log(error.response.data)
			})
    }
    
    render(){
        const { title, content  } = this.state;
        return(
            <div className="contact container">
                <div className="contact-body">
                    <div className="body1">
                        <div className="contact-text">
                            <h1>Get In Touch</h1>
                            <h3>Have a question or problem? Please fill up the form below and we will reply back soonest!</h3>
                            <div className="line"></div>
                        </div>
                        <form onSubmit={this.submitHandler}>
                            <div className="content">
                                <p>Subject</p>
                                <input type="text" placeholder="Please state the subject here" name="title" value={title}
                                        onChange={this.changeHandler} />
                            </div>
                            <div className="content">
                                <p>Description</p>
                                <textarea type="text" placeholder="Please write down the description here" name="content" value={content}
                                        onChange={this.changeHandler}/>
                            </div>
                            <div className="contact-button">
                                <button type="submit" className="send" style={{backgroundColor:"#8860D0"}}>Submit</button>
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
}

export default Contact;