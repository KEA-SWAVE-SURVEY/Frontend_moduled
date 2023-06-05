import React, { useCallback, useEffect,useState } from 'react'
import '../../../styles/NavbarStyles.css';
import { useRecoilState } from 'recoil';
import {surveyListState,backColorState } from '../../../contexts/atom';
import {SketchPicker} from 'react-color';



const SideColor = () => {
  
    const [backColor, setBackColor] = useRecoilState(backColorState);
    const [surveyList, setSurveyList] = useRecoilState(surveyListState);
  
    const handleChangeComplete = color => {
      setBackColor(color.hex);
      const cbackColor = backColor
   
      setSurveyList((prev) => {
        return {
            id: prev.id,
            title: prev.title,
            description: prev.description,
            type: prev.type,
            reliability: prev.reliability,
            backColor:cbackColor,
            startDate:prev.startDate,
            endDate: prev.endDate,
            enable: prev.enable,
            font:prev.font,
            fontSize:prev.fontSize,
            questionRequest: prev.questionRequest
        }})

        console.log(surveyList)
    };
  
  
  
  return (
    <div className='menuProfile1'>
        <ui className='menuProfile1'>
            <li><SketchPicker
              color={backColor}
              onChangeComplete={handleChangeComplete}
            />
              
            </li>
            <li>{backColor}</li>
            
        </ui>
    </div>
  )
}

export default SideColor
