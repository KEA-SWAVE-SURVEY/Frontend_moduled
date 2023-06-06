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
      setFont(`"Calibri", "Roboto", sans-serif`) 
      //console.log(font)
    }
    else if(index===1)
    {
      setFont(`'Nanum Brush Script'`) 
      //console.log(font)
    }
    else if(index===2) 
    {
      setFont(`'Nanum Gothic'`) 
      //console.log(font)
    }
    else if(index===3)
    {
      setFont(`'Song Myung'`) 
      //console.log(font)
    }
    else if(index===4)
    {
      setFont(`'Hi Melody'`) 
      //console.log(font)
    }
    else if(index===5)
    {
      setFont(`'Dancing Script', cursive`) 
      //console.log(font)
    }
    else if(index===6)
    {
      setFont(`'TheJamsil5Bold'`) 
      //console.log(font)
    }

  //return index
    const cfont = font
    console.log(cfont)
    console.log(surveyList.font)
   
    setSurveyList((prev) => {
      return {
          id: prev.id,
          title: prev.title,
          description: prev.description,
          type: prev.type,
          reliability: prev.reliability,
          
          startDate:prev.startDate,
          endDate: prev.endDate,
          enable: prev.enable,
          design:{
            backColor:prev.design.backColor,
            font:cfont,
            fontSize:prev.design.fontSize,
          },
          questionRequest: prev.questionRequest
      }
  })
  const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);
        setCookie('survey',surveyList,{
            path:"/",
            sameSite: "strict",
            expires: expirationTime
    
          });
  console.log(surveyList)
  console.log(surveyList.design.font)
  console.log(cfont)
  } 
  
  //기본 : `"Calibri", "Roboto", sans-serif`
  //필기, 나눔 손글씨 붓 : `'Nanum Brush Script'`
  // 나눔고딕, 나눔고딕 : `'Nanum Gothic'`
  //명조, 송명 : `'Song Myung'`
  //손글씨,하이멜로디 : `'Hi Melody'`
  //영어 필기 : `'Dancing Script', cursive`
    //잠실광고체 : 'TheJamsil5Bold'
  return (
    <div className='menuProfile1'>
        <ui className='menuProfile1'>
          
    
            <li><button key='0' className={`"Calibri", "Roboto", sans-serif` === font ? styles.setBtn_selected : styles.setBtn} style={{fontSize:'1.3vw',  fontFamily:`"Calibri", "Roboto", sans-serif`}} onClick={(e) => { onClickFontButton(e, 0) }}>기본</button></li>
            <li><button key='1' className={`'Nanum Brush Script'` === font ? styles.setBtn_selected : styles.setBtn} style={{  fontSize:'1.3vw', fontFamily:`'Nanum Brush Script'` }} onClick={(e) => { onClickFontButton(e, 1) }}>나눔 손글씨 붓</button></li>
            <li><button key='2' className={`'Nanum Gothic'` === font ? styles.setBtn_selected : styles.setBtn} style={{  fontSize:'1.3vw', fontFamily:`'Nanum Gothic'` }} onClick={(e) => { onClickFontButton(e, 2) }}>나눔 고딕</button></li>
            <li><button key='3' className={`'Song Myung'` === font ? styles.setBtn_selected : styles.setBtn} style={{  fontSize:'1.3vw', fontFamily:`'Song Myung'` }} onClick={(e) => { onClickFontButton(e, 3) }}>송명 , 명조</button></li>
            <li><button key='4' className={`'Hi Melody'` === font ? styles.setBtn_selected : styles.setBtn} style={{  fontSize:'1.3vw', fontFamily:`'Hi Melody'` }} onClick={(e) => { onClickFontButton(e, 4) }}>하이멜로디, 손글씨</button></li>
            <li><button key='5' className={`'Dancing Script', cursive` === font ? styles.setBtn_selected : styles.setBtn} style={{  fontSize:'1.3vw',fontFamily:`'Dancing Script', cursive` }} onClick={(e) => { onClickFontButton(e, 5) }}>영어 필기체</button></li>
            <li><button key='6' className={`'TheJamsil5Bold'` === font ? styles.setBtn_selected : styles.setBtn} style={{  fontSize:'1.3vw',fontFamily:`'TheJamsil5Bold'` }} onClick={(e) => { onClickFontButton(e, 6) }}>더잠실체</button></li>
            
          
         
        </ui>
    </div>
  )
}

export default SideFont
