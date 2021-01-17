import React from 'react'
import banner from '../../img/banner.jpg'

export default function Banner(props) {
    return(
        <div className="banner-back">
            <div className="banner" style={{ backgroundImage: `url(${banner})` }}>
            <p className="banner-title">
             {props.title}   
            </p>
        </div>
        </div>
    )
}