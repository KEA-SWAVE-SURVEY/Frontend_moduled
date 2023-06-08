import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'; 
import { surveyListState} from '../contexts/atom';
import axios from 'axios';
import '../styles/BeforeAnswerStyles.css';

import { useParams } from 'react-router-dom';

import {decode as base64_decode} from 'base-64';

export default function BeforeAnswer() {


    const [surveyList, setSurveyList] = useRecoilState(surveyListState);
    const { documentId } = useParams();
    const decoded = base64_decode(documentId);
    console.log(decoded + '| | '+ documentId)
    useEffect(() => {
        loadSurveys()
    }, []);

    //난제 랜덤이미지로 만들 때 변수를 잘 저장할 수 있도록
    //기한도 받고 싶다!!
    //http://localhost:8080/api/survey-participate/${id}
    //06092200 수정완료
    const loadSurveys=async()=>{ 
        const result = await axios.get(`/api/answer/external/load/${decoded}`
        ,{
            headers: {
            Authorization: cookie,
            }});
        console.log(result)
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

    //가능한 페이지인가?
    //난수 url로 구분해서 들어왔는데
    //가능하긴 하겠다.
    //링크에서 정보를 가져와야겠어

    function onClickStart(e) {
        e.preventDefault(); 
        window.location.href = `http://172.16.210.80/survey/answer/`
      }

  return (
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className='div_title'>
    {surveyList.title}<br/><br/>
    {surveyList.description}<br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <button type="button" onClick={(e) => onClickStart(e)}>설문 참여하기</button>
    </div>
    </>
    
  )
}
