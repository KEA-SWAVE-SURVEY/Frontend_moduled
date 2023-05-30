import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
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


function MyPage() {
  const isLogined = useRecoilValue(loginState);

  const [surveyList, setSurveyList] = useState();

  const [isGridView, setIsGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAlphabetOrder, setIsAlphabetOrder] = useState(true);
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);

  const [pageNumberList, setPageNumberList] =useState([]);

  function sendRequestSurveyList(method, page, sort1, sort2) {
    var uri = '/api/survey-list';
    if (isGridView) uri = '/api/survey-list-grid';
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
    console.log(isLogined.token);
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

  return (
    <div className={styles.container}>
      <div className={styles.ProfileCenteredWrapper}>
        <img className={styles.ProfileImage} src={isLogined.img} alt='img' />
        <div className={styles.ProfileWrapper}>
          <div className={styles.ProfileText}>이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.ProfileValue}>{isLogined.name}</span></div>
          <div className={styles.ProfileText}>E-mail&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.ProfileValue}>{isLogined.email}</span></div>
          <div className={styles.ProfileText}>정보&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.ProfileValue}>{isLogined.info}</span></div>
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
      </div>
    </div>
  );
}

export default MyPage;
