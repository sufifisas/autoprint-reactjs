import React , {Component}from 'react'

class Maps extends Component {
    constructor(props) {
        super(props)
            this.state = {
            key : "AIzaSyDxgA4kIuo0-bxfSaqCOCwmlyjnV05oVPE",
            lat : null,
            lng : null,
            address : ''
            }
        }
        changeHandler = e => {
            this.setState({ [e.target.name]: e.target.value })
        }
    geocode = (e) => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.address}&key=${this.state.key}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.results[0].geometry.location.lat)
            this.setState({
                lat: data.results[0].geometry.location.lat,
                lng: data.results[0].geometry.location.lng
            })
        })
        
        .catch(error => alert(error))
    }
    render() {
        const {address} = this.state
        return(
            <div>
                {this.state.lat},{this.state.lng}
                <input
                    type="text"
                    name="address"
                    value={address}
                    placeholder="Address"
                    onChange={this.changeHandler}
                />
                <button onClick={this.geocode}>add</button>
            </div>
        );
    }
}

export default Maps;