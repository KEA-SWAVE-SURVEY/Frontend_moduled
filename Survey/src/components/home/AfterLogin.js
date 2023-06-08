import React, { useEffect, useState } from 'react'; 
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';

import PrintSurveyList from './PrintSurveyList';
import PrintSurveyGrid from './PrintSurveyGrid';
import { navbarItemState } from '../../contexts/selector';
import SkeletonGrid from '../skeleton/SkeletonGrid';
import { loginState, modifyState } from '../../contexts/atom';

import '../../styles/HomeStyles.css'
import spring from '../../assets/spring.JPG';
import product1 from '../../assets/product1.JPG';
import fall from '../../assets/fall.jpg';
import tomorrow from '../../assets/tomorrow.JPG';
import grid from '../../assets/grid.png';
import list from '../../assets/list.png';
import ascending from '../../assets/ascending.png';
import descending from '../../assets/descending.png';
import alphabet from '../../assets/alphabet.png';
import time from '../../assets/time.png';
import HaveNoSurvey from './HaveNoSurvey';

import {getCookie} from '../login/cookie'

function AfterLogin(props) {
    //const cookie = getCookie("token");
    const cookie = sessionStorage.getItem('token')
    const setNavItem = useSetRecoilState(navbarItemState);
    const isLogined = useRecoilValue(loginState);

    const setIsModify = useSetRecoilState(modifyState);
    const [surveyList, setSurveyList] = useState(undefined);

    const [isTemplateView, setIsTemplateView] = useState(false);

    const [isGridView, setIsGridView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAlphabetOrder, setIsAlphabetOrder] = useState(true);
    const [isAscendingOrder, setIsAscendingOrder] = useState(true);
     
    const [pageNumberList, setPageNumberList] =useState([]);

    const template = [
        { title: "봄 활동 조사", description: "축하드립니다", img: spring, date: 1 },
        { title: "제품 만족도 조사", description: "제품", img: product1, date: 2 },
        { title: "가을 독서 대회 참석 여부", description: "날짜", img: fall, date: 3 },
        { title: "tomorrow", description: "내일은", img: tomorrow, date: 4 }
     ];

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
                    'Authorization': cookie,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {//api의 응답을 제대로 받은경우 
                if(isGridView){
                    var content = response.data;
                    if(response.data.length === 0)content = null;
                }else{
                    setPageNumberList((prev) => Array.from({length: response.data.totalPages}, (_, index) => index + 1));
                    var content = response.data.content;
                    if(response.data.empty)content = null;
                }
                setSurveyList(content);
                console.log(content);
                console.log('Saved');
            })
            .catch((response) => {//종류불문 에러
                console.log(response);
                alert("네트워크 에러가 발생했습니다. 다시 시도해주세요");
            });
            console.log(cookie);
    }

    useEffect(() => {
        setNavItem((prev) => []);
        sendRequestSurveyList('grid', 1, 'title', 'ascending');
    }, []);

    useEffect(() => {
        sendRequestSurveyList(
            isGridView ? 'grid' : 'list',
            currentPage,
            isAlphabetOrder ? 'title' : 'date',
            isAscendingOrder ? 'ascending' : 'descending'
        );
    }, [isGridView, currentPage, isAlphabetOrder, isAscendingOrder])

    function onClickMoreTemplate(e) {
        e.preventDefault();
        setIsTemplateView((prev) => { return !prev });
    }

    function onClickCreateSurvey(e) {
        e.preventDefault();
        setIsModify((prev) => false);
        window.location.href = `http://172.16.210.80/survey`; 
    }
    
//todo 확인완료 2000 0607여기까지
//todo주소확인 템플릿
    function onClickCreateTemplateSurvey(e,index) {
        e.preventDefault();
        
        setIsModify((prev) => true);
        loadSurveys();
        ////수정06072100 외부주소라 변경할 필요 없음
        window.location.href = `http://172.16.210.80/template/Survey/${index+1}`
        //window.location.href =`http://172.16.210.80/api/external/template-load/${index+1}`
        //수정06072100
            const loadSurveys = async()=>{
                const result = await axios.get(`/api/document/external/template-load/${index+1}`
                ,{
                    headers: {
                    Authorization: cookie,
                    }});
                console.log(result)// todo 확인완료 날짜추가 끝 수정필요>? 날짜 없음
                setSurveyList((prev) => {
                    return {
                        id: result.data.id,
                        title: result.data.title,
                        description: result.data.description,
                        reliability: result.data.reliability,
                        startDate:result.data.startDate,
                        endDate: result.data.endDate,
                        enable: result.data.enable,
                        design:result.data.design,
                        type: result.data.type,
                        questionRequest: result.data.questionList.map((questionList) => {
                            return {
                                id: questionList.id,
                                title: questionList.title,
                                type: questionList.questionType,
                                choiceList: questionList.choiceList.map((choice) => {
                                    return {
                                        id: choice.id,
                                        choiceName: choice.title
                                    }
                                })
                            }
                        })
                    }
                });
           
        }
    }


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
        <div>
            <div className='home_container'>
                <div className='template_container' style={isTemplateView ? { maxHeight: '100vh' } : { maxHeight: '26vh' }}>
                    <div className='menu_container'>
                        <div className='more_template' onClick={onClickMoreTemplate}>템플릿 더보기</div>
                    </div>
                    <div className='grid_container'>
                        <div className='create_survey' onClick={(e) => onClickCreateSurvey(e)}>+</div>
                        {template.map((template, index) => <div key={index} className='grid_box' onClick={(e) => onClickCreateTemplateSurvey(e,index)} style={{ backgroundImage: `url(${template.img})` }}>
                            <div className='line'>
                                <span style={{ textAlign: "center" }}>{template.title}</span>
                            </div>
                        </div>)}
                    </div>
                </div>
                <hr className='center_line' />
                <div className='survey_container'>
                    <div className='menu_container'>
                        <div>내 설문 </div>
                        <div className='icon_container'>
                            {isGridView ? <img className='icon_img' src={list} alt="img" onClick={(e) => onClickViewIcon(e)} /> : <img className='icon_img' src={grid} alt="img" onClick={(e) => onClickViewIcon(e)} />}
                            {isAlphabetOrder ? <img className='icon_img' src={alphabet} alt="img" onClick={(e) => onClickAlphabetIcon(e)} /> : <img className='icon_img' src={time} alt="img" onClick={(e) => onClickAlphabetIcon(e)} />}
                            {isAscendingOrder ? <img className='icon_img' src={ascending} alt="img" onClick={(e) => onClickOrderIcon(e)} /> : <img className='icon_img' src={descending} alt="img" onClick={(e) => onClickOrderIcon(e)} />}
                        </div>
                    </div>
                    {isGridView ? (
                        <div className='grid_container'>
                            {surveyList && (surveyList !== null && surveyList.map((survey, index) => <PrintSurveyGrid survey={survey} key={index}  />))}
                            {surveyList === null && <HaveNoSurvey />}
                            {surveyList === undefined && <SkeletonGrid />}
                        </div>)
                        : (
                            <>
                                {surveyList !== null && <PrintSurveyList surveyList={surveyList} currentPage={currentPage} setCurrentPage={setCurrentPage} pageNumberList={pageNumberList} />}
                                {surveyList === null && <HaveNoSurvey />}
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default AfterLogin;