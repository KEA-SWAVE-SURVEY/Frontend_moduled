import React from 'react'
import "../../styles/HeroStyles.css"


export default function Hero(props) {
  return (
    <>
    <div className={props.cName}>
        <img className="hero_img" alt="Logo" src={props.heroImg}/>

        <div className='hero-text'>
        <h1>{props.title}</h1>
        <p style={{color:"#1b0278"}}>{props.text}</p>
        <a href={props.url} className={props.btnClass}>
            {props.buttonText}
        </a>
        </div>
    </div>
    </>
  )
}

