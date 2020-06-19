import React from 'react'
import './card-style.css'
const MainCardUI = props => {
    return(
        <div className="card text-center">
            <div className="overflow">
                <img src={props.imgsrc} alt="Yuna" className="card-img-top"/>
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text text-secondary">
                    {props.text}
                </p>
            </div>
        </div>
    );
}

export default MainCardUI;