import React, {  useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { surveyListState , answerListState} from '../../contexts/atom';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import '../../styles/SurveyStyle.css';
import ViewSurvey from '../survey/view/ViewSurvey';

function Question() {
    const [surveyList, setSurveyList] = useRecoilState(surveyListState);
    const [answerList, setAnswerList] = useRecoilState(answerListState);

    const { documentId } = useParams();
    useEffect(() => {
        loadSurveys()
    }, []);

    //로드가 몇개가 있어야할까 서베이로 싹다 긁어올 수 있나?
    //코드는 서베이로만
    //http://localhost:8080/api/ survey-participate/${id}
    const loadSurveys=async()=>{
    //    const result = await axios.get(`/api/load-survey/${documentId}`);
       
       const result = await axios.get(`/api/external/research/survey/load/${documentId}`);
    //    const result = {data:{
    //     "id": 1,
    //     "title": "설문 테스트",
    //     "description": "테스트 입니다.",
    //     "questionList": [
    //         {
    //             "id": 1,
    //             "title": "성별은?",
    //             "questionType": 2,
    //             "choiceList": [
    //                 {
    //                     "id": 1,
    //                     "title": "남성",
    //                     "count": 1
    //                 },
    //                 {
    //                     "id": 2,
    //                     "title": "여성",
    //                     "count": 0
    //                 }
    //             ]
    //         },
    //         {
    //             "id": 2,
    //             "title": "좋아하는 음식은?",
    //             "questionType": 2,
    //             "choiceList": [
    //                 {
    //                     "id": 3,
    //                     "title": "짜장",
    //                     "count": 1
    //                 },
    //                 {
    //                     "id": 4,
    //                     "title": "짬뽕",
    //                     "count": 0
    //                 }
    //             ]
    //         },
    //         {
    //             "id": 3,
    //             "title": "좋나요? 싫나요?",
    //             "questionType": 2,
    //             "choiceList": [
    //                 {
    //                     "id": 5,
    //                     "title": "싫음",
    //                     "count": 1
    //                 },
    //                 {
    //                     "id": 6,
    //                     "title": "좋음",
    //                     "count": 0
    //                 }
    //             ]
    //         }
    //     ]
    // } }; 
       console.log(result)
        setSurveyList((prev) => {
            return {
                id: result.data.id,
                title: result.data.title,
                description: result.data.description,
                reliability: result.data.reliability,
                font:result.data.font,
                fontSize:result.data.fontSize,
                backColor:result.data.backColor,
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
            if (survey.type === 1) contentDefault = true; //찬부식은 true
            else if (survey.type === 2) contentDefault = 0; //객관식은 0

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
                            type: survey.type,
                            answer: contentDefault,
                            answerId: 0
                        }
                    ]
                }
            });
            return null;
        })
    };
 
    return (
        <div>
          <div  className={'analyzeBox'} style={{padding:'0',width:'70vw', height:'80vh', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', margin:'0' }}>
                <div className="survey_container">
                    <div className='create_survey'>
                        <div className='problem_container'>
                            <h1 style={{ textAlign: "left", margin: '0 0 0 0 ', fontSize: '50px' }}>{surveyList.title}</h1>
                            <textarea value={surveyList.description} readOnly className='textarea'></textarea>
                        </div>
                    </div>
                    {surveyList.questionRequest && surveyList.questionRequest.map((survey, index) => <ViewSurvey key={index} id={survey.id} index={index} />)}
                 
                </div>
            </div>
        </div>
    );
    
}

export default Question;