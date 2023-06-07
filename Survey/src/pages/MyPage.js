import React, { useState, useEffect } from 'react';
import { useRecoilValue , useRecoilState} from 'recoil';
import axios from 'axios';
 

import { loginState } from '../contexts/atom';

import PrintSurveyGrid from '../components/home/PrintSurveyGrid';
import PrintSurveyList from '../components/home/PrintSurveyList';
import SkeletonGrid from '../components/skeleton/SkeletonGrid';

import styles from "../styles/selectList.module.css";
import ascending from "../assets/ascending.png";
import descending from "../assets/descending.png";
import time from "../assets/time.png";
import list from "../assets/list.png";
import alphabet from "../assets/alphabet.png";
import grid from "../assets/grid.png";
import HaveNoSurvey from '../components/home/HaveNoSurvey';


import {getCookie} from '../components/login/cookie'

function MyPage() {
  const [isLogined,setIsLogined] = useRecoilState(loginState);
  //const cookie = getCookie("token");
  const cookie = sessionStorage.getItem('token')

  const [surveyList, setSurveyList] = useState();

  const [isGridView, setIsGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAlphabetOrder, setIsAlphabetOrder] = useState(true);
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);

  const [pageNumberList, setPageNumberList] =useState([]);

  const [tempName, setTempName] = useState(loginState.name);
  const [tempInfo, setTempInfo] = useState(loginState.info);
  function sendRequestSurveyList(method, page, sort1, sort2) {
    //수정06072100
    var uri = '/api/document/external/survey-list';
    if (isGridView) uri = '/api/document/external/survey-list-grid';
    axios.post(uri,
      {
        'method': method, // string grid,list
        'page': page, // int
        'sort1': sort1, // string date,title
        'sort2': sort2 // string ascending,descending
      },
      {
        headers: {
          'Authorization': isLogined.token,
          'Content-Type': 'application/json'
        }
      }
    )
      .then((response) => {//api의 응답을 제대로 받은경우
        if (isGridView) {
          var content = response.data;
          if (response.data.length === 0) content = null;
        } else {
          setPageNumberList((prev) => Array.from({ length: response.data.totalPages }, (_, index) => index + 1));
          var content = response.data.content;
          if (response.data.empty) content = null;
        }
        setSurveyList(content);
        console.log(response);
        console.log('Saved');
      })
      .catch((response) => {//종류불문 에러
        console.log(response);
        alert("네트워크 에러가 발생했습니다. 다시 시도해주세요");
      });
    console.log(cookie);
  }

  useEffect(() => {
    sendRequestSurveyList('grid', 1, 'title', 'ascending');
  }, []);

  useEffect(() => {
    sendRequestSurveyList(
      isGridView ? 'grid' : 'list',
      currentPage,
      isAlphabetOrder ? 'title' : 'date',
      isAscendingOrder ? 'ascending' : 'descending'
    );
  }, [isGridView, currentPage, isAlphabetOrder, isAscendingOrder]);


  function onClickViewIcon(e) {
    e.preventDefault();
    setIsGridView((prev) => { return !prev });
  }

  function onClickAlphabetIcon(e) {
    e.preventDefault();
    setIsAlphabetOrder((prev) => { return !prev });
  }

  function onClickOrderIcon(e) {
    e.preventDefault();
    setIsAscendingOrder((prev) => { return !prev });
  }
  function onClickSave(e) {
    alert('저장이 완료되었습니다! ');
    /**/
    setIsLogined({...isLogined, info:tempInfo , name:tempName});
    console.log(isLogined);
    console.log(isLogined.name);
    console.log(isLogined.info);
     // axios.post(`/api /response/create`, answerList,
     //patch으로 변경 0607
     axios.patch(`/user/external/updatepage`, {
        "nickname":isLogined.name,
        "description": isLogined.info

     },
     {
         headers: {
             'Content-Type': 'application/json'
         }
     }

 )
     .then((response) => {//api의 응답을 제대로 받은경우
         console.log('Saved');  
     })
     .catch((response) => {//종류불문 에러
         console.log('Error'); 
     }); 
      
  }
  const onChangeName = (e) => {
    setTempName(e.target.value);
    console.log(tempName);
  };

  const onChangeInfo = (e) => {
    setTempInfo(e.target.value);
    console.log(tempInfo);
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.ProfileCenteredWrapper}>
        <img className={styles.ProfileImage} src={isLogined.img} alt='img' />
        <div className={styles.ProfileWrapper}>
          <div className={styles.ProfileText}>이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
<div> <input  className={styles.inputBox} id = "name" onChange={onChangeName} placeholder = {isLogined.name + '(click to edit)'} /></div></div>
          <div className={styles.ProfileText}>E-mail&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.ProfileValue}>{isLogined.email}</span></div>
 
          <div className={styles.ProfileText}>정보&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;

<div> <input className={styles.inputBox} id="info"   placeholder = {isLogined.info + ' (click to edit)) '} onChange={onChangeInfo} /></div>
          </div>
          <button onClick={onClickSave} > 자기소개 저장 </button> 
        </div>
      </div>
      <div className={styles.LineContainer} style={{ width: '95%', marginLeft: '2.5%', marginRight: '2.5%', marginTop: '2%', marginBottom: '2%' }} />
      <div className={styles.surveyContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ margin: "0" }}> 내 설문 </h1>
          <div className={styles.icon_container}>
            {isGridView ? <img className='icon_img' src={list} alt="img" onClick={(e) => onClickViewIcon(e)} /> : <img className='icon_img' src={grid} alt="img" onClick={(e) => onClickViewIcon(e)} />}
            {isAlphabetOrder ? <img className='icon_img' src={alphabet} alt="img" onClick={(e) => onClickAlphabetIcon(e)} /> : <img className='icon_img' src={time} alt="img" onClick={(e) => onClickAlphabetIcon(e)} />}
            {isAscendingOrder ? <img className='icon_img' src={ascending} alt="img" onClick={(e) => onClickOrderIcon(e)} /> : <img className='icon_img' src={descending} alt="img" onClick={(e) => onClickOrderIcon(e)} />}
          </div>
        </div>
        {isGridView ? (
          <div className='grid_container'>
            {surveyList && (surveyList !== null && surveyList.map((survey) => <PrintSurveyGrid survey={survey} />))}
            {surveyList === null && <HaveNoSurvey />}
            {surveyList === undefined && <SkeletonGrid />}
          </div>) : (
          <>
            {surveyList !== null && <PrintSurveyList surveyList={surveyList} currentPage={currentPage} setCurrentPage={setCurrentPage} pageNumberList={pageNumberList} />}
            {surveyList === null && <HaveNoSurvey />}
          </>
        )
        }
        {/* {JSON.stringify(isLogined)} */}

      </div>
    </div>
  );
}

export default MyPage;
