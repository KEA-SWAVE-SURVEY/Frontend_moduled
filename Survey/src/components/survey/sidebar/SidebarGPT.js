import axios from 'axios';
import React, { useState } from 'react';


import styles from "../../../styles/sidebar.module.css";
import SidebarGPTResponse from './SidebarGPTResponse';
import SkeletonGPT from '../../skeleton/SkeletonGPT';
import { useRecoilState } from 'recoil';
import { surveyListState } from '../../../contexts/atom';
import { updateSurveyContent } from '../../../utils/updateJSON';

import searchIcon from '../../../assets/search.png'
import refreshIcon from '../../../assets/refresh.png';


function SidebarGPT(props) {
    const [message, setMessage] = useState("");
    const [response, setReponse] = useState({loading : false , data : []});
    const [isRequested, setIsRequested] = useState(false);
    const cookie = sessionStorage.getItem('token')
    const [surveyList, setSurveyList] = useRecoilState(surveyListState);



    function requestGpt(input) {
        const query = "해당 주제에 적절한 설문조사 7개를 1개의 JSON 코드로 작성해줘.\n\n[{type, question, choiceList},{type, question, choiceList}, ...]\n\ntype: 주관식, 객관식, 찬반식 (각 1개 이상)\n주관식: \"choiceList\":[]\n찬반식: \"choiceList\":[\"예\",\"아니오\"]\n\n다른 Object는 사용하지 마.\n다른 설명은 필요없어.";
        //06072200 수정완료 chatgpt, ㅋㅋ
        axios.post('/api/document/external/chat-gpt/question',
            {
                "question": input + query
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': cookie
                }
            }
        )
            .then((response) => {//api의 응답을 제대로 받은경우 
                var id = -1;
                var choiceid = -1;
                var json = JSON.parse(response.data.text.replace(/\n/g, ""));
                if (json.hasOwnProperty('questions')) json = json.questions;
                console.log(json);
                json = json.map((data) => {
                    id = id + 1;
                    choiceid = -1;
                    return {
                        id: id,
                        title: data.question,
                        type: data.type,
                        choiceList: data.choiceList.map((choice) => {
                            choiceid = choiceid + 1;
                            return {
                                id: choiceid,
                                choiceName: choice
                            }
                        })
                    }
                });
                setReponse((prev) => {
                    return{
                        loading : false,
                        data : json
                    }
                });
            })
            .catch((response) => {//종류불문 에러
                console.log(response);
                console.log('Error!');
            });

    }

    function onClickSendButton(e) {
        setIsRequested(true);
        setReponse((prev) => {
            return{
                loading : true,
                data : []
            }
        });
        e.preventDefault();
        requestGpt(message);
    }

    function onClickRestartButton(e) {
        console.log(response);
        setReponse((prev) => {
            return{
                loading : false,
                data : []
            }
        });
        setIsRequested(false);
    }

    function onClickResponse(e, response) {
        e.preventDefault();
        const lastIndex = surveyList.questionRequest.length - 1;
        var id = 0;
        if(lastIndex !== -1) id = surveyList.questionRequest[lastIndex].id + 1;
        setSurveyList((prev) => {
            var type = 0;
            if(response.type === "찬반식") type = 1;
            else if(response.type === "객관식") type = 2;
            let newContent = {
                id: id,
                type: type,
                title: response.title,
                choiceList: response.choiceList
            };
            return updateSurveyContent(prev, newContent, lastIndex + 1);
        });
        console.log(response);
        console.log(surveyList);
    }

    function onKeyPressInput(e) {
        if (e.key === 'Enter') {
            setIsRequested(true);
            setReponse((prev) => {
                return{
                    loading : true,
                    data : []
                }
            });
            e.preventDefault();
            requestGpt(message);
        }
    };

    //input이 바뀌면 바뀐값 message state에 저장
    function onChangeInput(e) {
        setMessage(e.target.value);
    }


    return (
        <div className={styles.container} >
            <div className={styles.sidebar} >
                <div className={styles.content}>
                    <h1>질문 추천</h1>
                    <hr style={{ border: "solid 0.5px #1b0278" }} />
                    <div className={styles.gptReponseArea}>
                        {response.loading && <SkeletonGPT /> }
                        {!response.loading && response.data.map((question) => <SidebarGPTResponse key={question.id} question={question} onClick={(e) => onClickResponse(e, question)} />)}
                    </div>
                    <div className={styles.gptBottomWrapper}>
                        <div className={styles.gptBottomContainer}>
                            <input className={styles.gptInput} readOnly={isRequested} placeholder="설문의 키워드를 입력해 주세요!" onChange={(e) => onChangeInput(e)} onKeyPress={(e) => onKeyPressInput(e)} value={message} />
                            {isRequested ? (
                                <img src={refreshIcon} className={styles.gptButton} onClick={(e) => onClickRestartButton(e)}/>):(
                                <img src={searchIcon} className={styles.gptButton} onClick={(e) => onClickSendButton(e)}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarGPT;

