import React from 'react';
import styles from "../../styles/selectList.module.css";
import SkeletonList from '../skeleton/SkeletonList';
import ListItem from './ListItem';

function PrintSurveyList(props) {
    const currentPage = props.currentPage;
    const setCurrentPage = props.setCurrentPage;
    const surveyList = props.surveyList;

    function onClickPageButton(e, num){
        e.preventDefault();
        setCurrentPage(num);
    }

    return (
        <div className={styles.listContainer}>
            <div className={styles.initWrapper}>
                <div>제목</div><div>내용</div><div>날짜</div>
            </div>
            <hr style={{ width: '90%', height: '0.25vh', border: 'none', backgroundColor: '#1b0278' , marginBottom:'1vh'}} />
            <div className={styles.pagingContainer}>
                {surveyList && surveyList.map((survey, index) => <ListItem survey={survey} key={index} index={index}/>)}
                {surveyList === undefined && <SkeletonList />}
            </div>
            <div className={styles.navContainer} >
                {props.pageNumberList?.map((num) => (
                    <div className={currentPage === num ? styles.navTextActive : styles.navText } key={num} onClick={(e) => onClickPageButton(e,num)}>
                        {num}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PrintSurveyList;