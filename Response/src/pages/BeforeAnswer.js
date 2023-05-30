import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { surveyListState} from '../contexts/atom';
import axios from 'axios';
import '../styles/BeforeAnswerStyles.css';

export default function BeforeAnswer() {


    const [surveyList, setSurveyList] = useRecoilState(surveyListState);

    useEffect(() => {
        loadSurveys()
    }, []);

    //난제 랜덤이미지로 만들 때 변수를 잘 저장할 수 있도록
    //기한도 받고 싶다!!
    //http://localhost:8080/api/survey-participate/${id}
    const loadSurveys=async()=>{
        const result = await axios.get(`/api/load-survey/1`);
        console.log(result)
        setSurveyList((prev) => {
            return {
                id: result.data.id,
                title: result.data.title,
                description: result.data.description,
                //design : result.data.design,
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
        //navigate('/survey/answer')
        window.location.href = `/survey/answer/`
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
