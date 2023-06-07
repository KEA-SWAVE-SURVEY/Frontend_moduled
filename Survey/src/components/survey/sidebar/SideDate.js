import React,{ useEffect,useState } from 'react'
import '../../../App.css';
import '../../../styles/NavbarStyles.css';
import styles from "../../../styles/sidebar.module.css";
import { useRecoilState, useRecoilValue } from 'recoil';
import { startDateState,endDateState, enableState, enableViewState,surveyListState } from '../../../contexts/atom';
//import * as ReactBootStrap from 'react-bootstrap';

import {setCookie} from '../../../components/login/cookie'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//to 완료 do 강훈님 기본값 false는 미래에 현재는 true로 되있는지 확인하기0607

const SideDate = () => {
  const [surveyList, setSurveyList] = useRecoilState(surveyListState);
   
  const [startDate, setStartDate] = useRecoilState(startDateState)

  const [endDate, setEndDate] = useRecoilState(endDateState)

  const [enable, setEnable] = useRecoilState(enableState)
  const [enableView, setEnableView] = useRecoilState(enableViewState)
 
   
 console.log(startDate)
 console.log(endDate)
 console.log(enable)

  function onClickSaveButton(e,index){
    e.preventDefault();
     

  //return index
  const today = new Date();
    const cStartDate = startDate;
    const cEndDate = endDate;  
    console.log(cStartDate > today);
    console.log(today);
    console.log(cStartDate);
   console.log(cStartDate);
   console.log(cEndDate);
   console.log(cStartDate < new Date());
   setEnableView(cStartDate < new Date()?'설문 응답 받는 중':'설문 응답 받지 않는 중')
   setEnable(cStartDate < new Date());
   const cEnable = cStartDate < new Date();
   console.log(cEnable)  

    setSurveyList((prev) => {
      return {
          id: prev.id,
          title: prev.title,
          description: prev.description,
          type: prev.type,
          reliability: prev.reliability,
          
          startDate:cStartDate,
          endDate: cEndDate,
          enable:cEnable,
          design:prev.design,
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
  
  function onChangeStart(date){ 
     

  //return index
  setStartDate(date)
    const cStartDate = date;  
    setSurveyList((prev) => {
      return {
          id: prev.id,
          title: prev.title,
          description: prev.description,
          type: prev.type,
          reliability: prev.reliability,
          
          startDate: cStartDate,
          endDate: prev.endDate,
          enable: prev.enable,
          design:prev.design,
          questionRequest: prev.questionRequest
      }
  })
  console.log(surveyList)
   
  }  
  function onChangeEnd(date){ 
     

  //return index 
  setEndDate(date)
    const cEndDate = date;   
    setSurveyList((prev) => {
      return {
          id: prev.id,
          title: prev.title,
          description: prev.description,
          type: prev.type,
          reliability: prev.reliability,
          
          startDate:prev.startDate,
          endDate: cEndDate,
          enable: prev.enable,
          design:prev.design,
          questionRequest: prev.questionRequest
      }
  })
  console.log(surveyList)
   
  }  
  return (
    <div className='menuProfile1'>
                <div style={{display:'flex', width:'100%',flexDirection:'column',alignItems:'center', justifyContent:'center' }}>

{enable}
                <p className={'manageMinorFont'}> 설문 시작 기간 설정 </p> 
                
                <DatePicker 
                  selected={startDate}
                  onChange={date => onChangeStart(date)}
                  dateFormat="yyyy-MM-dd"   
                  maxDate={endDate}
                  isClearable={false}
                  className={'date'}
                /> 
                <p className={'manageMinorFont'}> 설문 종료 기간 설정</p>
                <DatePicker
                  selected={endDate}
                  onChange={date=> onChangeEnd(date)}
                  dateFormat="yyyy-MM-dd"   
                  minDate={startDate}
                  isClearable={false}
                  className={'date'}
                />

                
              <button style={{margin: '20px'}} onClick={(e) => onClickSaveButton(e)}> 설정 저장하기 </button>
              </div>
    </div>
  )
}

export default SideDate
