import React from 'react'
import Image from '../img/home.png'
import Background from '../img/bg1.png'
import Signup from './Signup'
import Venregis from './Venregis'
import SignupModal from './SignUpModal'
import SignUpVen from './SignUpVen'


function Home() {
  return (
    <div className="landing" style={{backgroundImage: `url(${Background})`}}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="title">
                <h1>Print anything from anywhere at anytime</h1>
                <p>Discover the platform that gives you the freedom to print any documents, image or design with unlimited number and time.</p>
                <div className="home-button" style={{display:'flex'}}>
                  <SignupModal title="Register now!"/>
                  <SignUpVen title="Be our partner!" />
                </div>
              </div>
            </div>
            <div className="col">
              <img src={Image} alt="" />
            </div>
          </div>
        </div>
    </div>
  );
}

export default Home;