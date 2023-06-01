import React from 'react'
import '../../../styles/NavbarStyles.css';
import { useRecoilState } from 'recoil';
import { surveyListState,fontSizeState } from '../../../contexts/atom';


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
          font:prev.font,
          fontSize:cfontSize,
          backColor:prev.backColor,
          questionRequest: prev.questionRequest
      }
  })
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
          font:prev.font,
          fontSize:cfontSize,
          backColor:prev.backColor,
          questionRequest: prev.questionRequest
      }
  })
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
