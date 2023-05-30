import React, {  useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { surveyListState, answerListState } from '../contexts/atom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { useParams } from 'react-router-dom';

import {decode as base64_decode} from 'base-64';

import '../styles/SurveyStyle.css';
import ViewSurvey from '../components/survey/view/ViewSurvey';

function AnswerSurvey() {
    const [surveyList, setSurveyList] = useRecoilState(surveyListState);
    const [answerList, setAnswerList] = useRecoilState(answerListState);
    const { documentId } = useParams();
    const decoded = base64_decode(documentId);
    console.log(decoded + '| | '+ documentId)
    useEffect(() => {
        loadSurveys()
    }, []);

    const navigate = useNavigate();

    //로드가 몇개가 있어야할까 서베이로 싹다 긁어올 수 있나?
    //코드는 서베이로만
    //http://localhost:8080/api/survey-participate/${id}
    const loadSurveys=async()=>{
        const result = await axios.get(`/api/survey/load/${decoded}`);
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

        setAnswerList((prev) => {
            return {
                id: result.data.id,
                title: result.data.title,
                type: 0,
                description: result.data.description,
                responseId: prev.responseId,
                questionResponse: []
            }
        });

        result.data.questionList.map((survey, index) => {
            let contentDefault = ""; // default 답변 주관식은 ""
            console.log(index);
            if (survey.questionType === 1) contentDefault = true; //찬부식은 true
            else if (survey.questionType === 2) contentDefault = 0; //객관식은 0

            setAnswerList((prev) => {
                return {
                    id: result.data.id,
                    title: result.data.title,
                    type: 0,
                    description: result.data.description,
                    responseId: prev.responseId,
                    questionResponse: [
                        ...prev.questionResponse,
                        {
                            id: survey.id,
                            title: survey.title,
                            type: survey.questionType,
                            answer: contentDefault,
                            answerId: 0
                        }
                    ]
                }
            });
            return null;
        })
    };

    function onClickSubmitButton(e) {
        e.preventDefault();
        axios.post(`/api/response/create`, answerList,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
        )
            .then((response) => {//api의 응답을 제대로 받은경우
                console.log('Saved');
                console.log(JSON.stringify(answerList));
                window.location.reload();
            })
            .catch((response) => {//종류불문 에러
                console.log('Error');
                console.log(JSON.stringify(answerList));
            });
        navigate('/survey/afteranswer');
    }

    return (
        <div>
            <div className="survey_area">
                <div className="survey_container">
                    <div className='create_survey'>
                        <div className='problem_container'>
                            <h1 style={{ textAlign: "left", margin: '0 0 0 0 ', fontSize: '50px' }}>{surveyList.title}</h1>
                            <textarea value={surveyList.description} readOnly className='textarea'></textarea>
                        </div>
                    </div>
                    {surveyList.questionRequest && surveyList.questionRequest.map((survey, index) => <ViewSurvey key={index} id={survey.id} index={index} />)}
                    <div className='survey_contatiner_bottom'>
                        <div className="survey_button" onClick={(e) => onClickSubmitButton(e)}>Save</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnswerSurvey;





//버그 미리보기에선 서베이 설명 안들어감 들어가네 머지
