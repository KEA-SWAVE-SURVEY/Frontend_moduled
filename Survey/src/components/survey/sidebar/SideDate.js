import React,{ useEffect,useState } from 'react'
import '../../../App.css';
import '../../../styles/NavbarStyles.css';
import styles from "../../../styles/sidebar.module.css";
import { useRecoilState, useRecoilValue } from 'recoil';
import { startDateState,endDateState, enableState, surveyListState } from '../../../contexts/atom';
//import * as ReactBootStrap from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function dateFormat(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;
  hour = hour >= 10 ? hour : '0' + hour;
  minute = minute >= 10 ? minute : '0' + minute;
  second = second >= 10 ? second : '0' + second;

  return date.getFullYear() + '-' + month + '-' + day + ' ';
}


const SideDate = () => {
  const [surveyList, setSurveyList] = useRecoilState(surveyListState);
   
  const [startDate, setStartDate] = useRecoilState(startDateState)

  const [endDate, setEndDate] = useRecoilState(endDateState)

  const [enable, setEnable] = useRecoilState(enableState)
 
   
 console.log(startDate)
 console.log(endDate)
 console.log(enable)

  function onClickSaveButton(e,index){
    e.preventDefault();
     

  //return index
    const cStartDate = dateFormat(startDate);
    const cEndDate = dateFormat(endDate); 
    const cEnable = enable; 
   console.log(cStartDate);
   console.log(cEndDate);
    setSurveyList((prev) => {
      return {
          id: prev.id,
          title: prev.title,
          description: prev.description,
          type: prev.type,
          reliability: prev.reliability,
          
          startDate:cStartDate,
          endDate: cEndDate,
          enable: cEnable,
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
    const cStartDate = dateFormat(date);  
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
    const cEndDate = dateFormat(date);   
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


                <p className={'manageMinorFont'}> 설문 시작 기간 설정 </p>
                {startDate.toString()}
                
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
