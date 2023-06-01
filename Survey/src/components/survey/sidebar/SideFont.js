import React,{ useEffect,useState } from 'react'
import '../../../App.css';
import '../../../styles/NavbarStyles.css';
import styles from "../../../styles/sidebar.module.css";
import { useRecoilState, useRecoilValue } from 'recoil';
import { fontState, surveyListState } from '../../../contexts/atom';
//import * as ReactBootStrap from 'react-bootstrap';



const SideFont = () => {
  const [surveyList, setSurveyList] = useRecoilState(surveyListState);
  
  const [font, setFont] = useRecoilState(fontState)


  useEffect(()=>{
    console.log(font)
    
  },[font])

  function onClickFontButton(e,index){
    e.preventDefault();
    if(index===0) {
      setFont(prev=>`"Calibri", "Roboto", sans-serif`) 
      //console.log(font)
    }
    else if(index===1)
    {
      setFont(prev=>`'Nanum Brush Script'`) 
      //console.log(font)
    }
    else if(index===2) 
    {
      setFont(prev=>`'Nanum Gothic'`) 
      //console.log(font)
    }
    else if(index===3)
    {
      setFont(prev=>`'Song Myung'`) 
      //console.log(font)
    }
    else if(index===4)
    {
      setFont(prev=>`'Hi Melody'`) 
      //console.log(font)
    }
    else if(index===5)
    {
      setFont(prev=>`'Dancing Script', cursive`) 
      //console.log(font)
    }

  //return index
    const cfont = font
    console.log(cfont)
   
    setSurveyList((prev) => {
      return {
          id: prev.id,
          title: prev.title,
          description: prev.description,
          type: prev.type,
          reliability: prev.reliability,
          backColor:prev.backColor,
          font:cfont,
          fontSize:prev.fontSize,
          questionRequest: prev.questionRequest
      }
  })
  console.log(surveyList)
  
  console.log(cfont)
  } 
  
  //기본 : `"Calibri", "Roboto", sans-serif`
  //필기, 나눔 손글씨 붓 : `'Nanum Brush Script'`
  // 나눔고딕, 나눔고딕 : `'Nanum Gothic'`
  //명조, 송명 : `'Song Myung'`
  //손글씨,하이멜로디 : `'Hi Melody'`
  //영어 필기 : `'Dancing Script', cursive`
  
  return (
    <div className='menuProfile1'>
        <ui className='menuProfile1'>
          
    
            <li><button key='font' style={{ width: "30%", fontFamily:`"Calibri", "Roboto", sans-serif`}} onClick={(e) => { onClickFontButton(e, 0) }}>기본</button></li>
            <li><button key='font1' style={{ width: "30%", fontFamily:`'Nanum Brush Script'` }} onClick={(e) => { onClickFontButton(e, 1) }}>나눔 손글씨 붓</button></li>
            <li><button key='font2' style={{ width: "30%", fontFamily:`'Nanum Gothic'` }} onClick={(e) => { onClickFontButton(e, 2) }}>나눔 고딕</button></li>
            <li><button key='font3' style={{ width: "30%", fontFamily:`'Song Myung'` }} onClick={(e) => { onClickFontButton(e, 3) }}>송명 , 명조</button></li>
            <li><button key='font3' style={{ width: "30%", fontFamily:`'Hi Melody'` }} onClick={(e) => { onClickFontButton(e, 4) }}>하이멜로디, 손글씨</button></li>
            <li><button key='font4' style={{ width: "30%", fontFamily:`'Dancing Script', cursive` }} onClick={(e) => { onClickFontButton(e, 5) }}>영어 필기체</button></li>
            
          
         
        </ui>
    </div>
  )
}

export default SideFont
