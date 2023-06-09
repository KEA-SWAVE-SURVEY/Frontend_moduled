import React from 'react'
import '../../../styles/NavbarStyles.css';
import { useRecoilState } from 'recoil';
import { surveyListState,fontSizeState } from '../../../contexts/atom';


import {setCookie} from '../../../components/login/cookie'

const FontSize = () => {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState)
  const [surveyList, setSurveyList] = useRecoilState(surveyListState);
    
  function onClickPlus(e){
    //e.preventDefault();
    setFontSize(fontSize+0.5)
    const cfontSize = fontSize
   
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
            font:prev.design.font,
            fontSize:cfontSize,
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
  }
  function onClickMinus(e){
    //e.preventDefault();
    setFontSize(fontSize-0.5)
    const cfontSize = fontSize
   
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
            font:prev.design.font,
            fontSize:cfontSize,
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
  }
  

  return (
    <div className='menuProfile1'>
        <ui className='menuProfile1'>
            <li style={{cursor:'pointer'}}>
              <button onClick={(e)=>{onClickPlus()}}>+</button>
                {fontSize}
              <button onClick={(e)=>{onClickMinus()}}>-</button>
            </li>
            
        </ui>
    </div>
  )
}

export default FontSize
