import React, {useState} from 'react'
import axios from 'axios'

function AddDocument(){
    const [toggler, setToggler] = useState(false);
    const [data, setData] = useState('');
    const [filename, setFilename] = useState('');
    const [pages, setPages] = useState('');
    const [colour, setColour] = useState('AUTO');
    const [copies, setCopies] = useState(0);
    const [duplex, setDuplex] = useState('NO_DUPLEX');
    const [pageOrientation, setPageOrentation] = useState('AUTO')
    const [showData, setShow] = useState(false);
    const status = localStorage.getItem("OrderStatus");
    const id = localStorage.getItem("OrderId")
    const date = localStorage.getItem("OrderDate")
    // const [coverColour, setCoverColour] = useState('')
    // const [coverType, setCoverType] = useState('') 

    const submitHandler = e => {
        const details = {
            data : data,
            filename : filename,
            pages : pages,
            colour : colour,
            copies : copies,
            coverColour: 'test',
            coverType: 'test',
            pageOrientation : pageOrientation,
            duplex: duplex,
            orderId: id
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }
		e.preventDefault()
		axios
			.post('/document', details, {headers})
			.then(response => {
                console.log(response,"post");
                if(response.status === 200){
                    alert("document uploaded") 
                }  
                window.location.reload(false);        
			})
			.catch(error => {
				console.log(error)
            })
	}
    
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const name = e.target.value
        const split = name.split('\\');
        const filename = split[2]
        const base64 = await convertBase64(file);
        setData(base64);
        setFilename(filename)
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
                setShow(true);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const addDoc = () => {
        if(status === "CANCELLED"){
            alert("ORDER HAS BEEN CANCELLED. PLEASE REORDER")
            setToggler(false)
        }
        else if(status === "CONFIRM"){
            alert("ORDER HAS BEEN CONFIRMED. PLEASE CREATE NEW ORDER")
            setToggler(false)
        }
        else (
            setToggler(true)
        )
    }
    return(
        <div style={{padding:'20px', marginBottom:'20px', boxShadow: '#79797979 2px 2px 10px'}}>
            <button onClick = {addDoc} style={{ padding:'10px 40px', height: '60px', border: '1px solid #5680E9' ,background: '#5680E9', color: '#fff'}}>Create Document</button>
            <div style={{float:'right'}}>
                <ul style={{ display:'flex', flexDirection:'row'}} className="orderdetails">
                    <li>ORDER ID: {id}</li>
                    <li>DATE CREATED: {date}</li>
                    <li>STATUS: {status}</li>
                </ul>
            </div>
            
            <div style={{display: `${toggler ? 'block' : 'none'}`, padding:'20px 40px', border: '1px solid #5680E9', marginTop: '20px'}}>
                <input type="file" onChange={(e) => {uploadImage(e)}} />
                <div style={{display : `${showData ? 'block' : 'none'}`}}>
                    <form onSubmit={submitHandler} className="upload">
                        <li><span><p>Colour</p></span><select onChange={e => setColour(e.target.value)}>
                            <option value="AUTO">AUTO</option>
                            <option value="STANDARD_MONOCHROME">STANDARD_MONOCHROME</option>
                        </select></li>
                        <li><span><p>Page Orentation</p></span><select onChange={e => setPageOrentation(e.target.value)}>
                            <option value="AUTO">AUTO</option>
                            <option value="PORTRAIT">PORTRAIT</option>
                            <option value="LANDSCAPE">LANDSCAPE</option>
                        </select></li>
                        <li><span><p>Duplex</p></span><select onChange={e => setDuplex(e.target.value)}>
                            <option value="NO_DUPLEX">NO_DUPLEX</option>
                            <option value="LONG_EDGE">LONG_EDGE</option>
                            <option value="SHORT_EDGE">SHORT_EDGE</option>
                        </select></li>
                        <li><span><p>Pages</p></span><input type="text" placeholder="example: 1, 1-5" onChange={e => setPages(e.target.value)}/></li>
                        <li><span><p>Copies</p></span><input type="number" placeholder="" onChange={e => setCopies(e.target.value)}/></li>
                        <div style={{textAlign:'right',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                            <div onClick = {() => {setToggler(!toggler)}} className="send" style={{ cursor:'pointer', padding:'10px 40px', marginRight: '20px',height: '50px', border: '1px solid #5680E9' ,background: '#fff', color: '#5680E9'}}>Cancel</div>
                            <button type="submit" className="send" style={{ padding:'10px 40px', height: '50px', border: '1px solid #5680E9' ,background: '#5680E9', color: '#fff'}}>Upload</button>
                        </div>
                    </form>       
                </div>
            </div>
        </div>
    );
}

export default AddDocument;