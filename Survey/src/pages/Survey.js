import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { surveyListState, answerListState, loginState, modifyState } from '../contexts/atom';
import ReactDragList from 'react-drag-list';
import axios from 'axios';

import '../styles/SurveyStyle.css';
import CreateSurvey from '../components/survey/create/CreateSurvey';
import ViewSurvey from '../components/survey/view/ViewSurvey';
import Sidebar from '../components/survey/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';


import html2canvas from "html2canvas";
import saveAs from "file-saver";


function Survey(props) {
    const isLogined = useRecoilValue(loginState);
    const isModify = useRecoilValue(modifyState);

    const [sidebarIsOpen, setSidebarIsOpen] = useState({ open: false, isSetting: false });
    const [sidebarSelected, setSidebarSelected] = useState(0);

    const [surveyList, setSurveyList] = useRecoilState(surveyListState);
    const [answerList, setAnswerList] = useRecoilState(answerListState);

    const [isPreview, setIsPreview] = useState(false);

    const scrollRef = useRef();

    const navigate = useNavigate();
    const divRef = useRef(null);
    const today = new Date().toLocaleDateString();
    console.log(today)

    const handleDownload = async () => {
      if (!divRef.current) return;
  
      try {
        const div = divRef.current;
        const canvas = await html2canvas(div, { scale: 2 });
        canvas.toBlob((blob) => {
          if (blob !== null) {
            saveAs(blob, "result.png");
          }
        });
      } catch (error) {
        console.error("Error converting div to image:", error);
      }
    };
    
    useEffect(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, [surveyList?.questionRequest.length]);


    useEffect(() => {
        if (!isModify) {
            setSurveyList((prev) => {
                return {
                    id: 0,
                    title: "",
                    description: "",
                    type: 0,
                    design: {
                        font: 0,
                        fontSize: 0,
                        layout: 0,
                    },
                    questionRequest: [
                        {
                            id: 0,
                            type: 0,
                            title: "",
                            choiceList: ""/*[
                                        id:0;
                                        choiceName:null;
                                    ]*/
                        }
                    ]
                }
            });
        }
    }, []);

    const onUpdateList = (e, updated) => {
        console.log(updated);
        setSurveyList((prev) => {
            return {
                id: prev.id,
                title: prev.title,
                description: prev.description,
                type: prev.type,
                design: prev.design,
                questionRequest: [...updated]
            }
        }
        );
    };

    const dragList = (record, index) => (
        <CreateSurvey key={index} id={record.id} index={index} onClickEvent={onClickProblem} />
    );

    function onClickNewSurveyButton(e) {
        e.preventDefault();
        const lastIndex = surveyList.questionRequest.length - 1;
        var id;
        if(lastIndex !== -1) id = surveyList.questionRequest[lastIndex].id + 1;
        setSurveyList((prev) => {
            return {
                id: prev.id,
                title: prev.title,
                description: prev.description,
                type: prev.type,
                design: prev.design,
                questionRequest: [
                    ...prev.questionRequest,
                    {
                        id: id,
                        type: 0,
                        title: "",
                        choiceList: []
                    }
                ]
            };
        });
        console.log(surveyList);
    }

    function onClickProblem(e, index) {
        e.preventDefault();
        setSidebarSelected(index);
        if (!sidebarIsOpen[0]) {
            setSidebarIsOpen({ open: true, isSetting: false, isGPT: false });
        }
    }

    function onChangeTitleInput(e) {
        e.preventDefault();
        setSurveyList((prev) => {
            return {
                id: prev.id,
                title: e.target.value,
                description: prev.description,
                type: prev.type,
                design: prev.design,
                questionRequest: prev.questionRequest
            };
        });
    }

    function onChangeTextArea(e) {
        e.preventDefault();
        setSurveyList((prev) => {
            return {
                id: prev.id,
                title: prev.title,
                description: e.target.value,
                type: prev.type,
                design: prev.design,
                questionRequest: prev.questionRequest
            };
        });

    }

    function onClickPreviewButton(e) {
        e.preventDefault();
        if (!isPreview) {
            surveyList.questionRequest.map((survey) => {
                let contentDefault = ""; // default 답변 주관식은 ""

                if (survey.type === 1) contentDefault = true; //찬부식은 true
                else if (survey.type === 2) contentDefault = survey.choiceList[0]?.choiceName; //객관식은 첫번째 선택지

                setAnswerList((prev) => {
                    return {
                        id: prev.id,
                        type: surveyList.type,
                        description: surveyList.description,
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
        } else if (isPreview) {
            setAnswerList((prev) => {
                return {
                    id: prev.id,
                    type: prev.type,
                    description: prev.description,
                    responseId: prev.responseId,
                    questionResponse: []
                }
            });
        }
        setIsPreview((prev) => { return !prev; });
        setSidebarIsOpen({ open: false, isSetting: false, isGPT: false });
    }

    function onClickSaveButton(e) {
        e.preventDefault();
        console.log(surveyList);
        console.log(answerList);
        const dataToTransport = {
            //id : surveyList.id
            title: surveyList.title,
            description: surveyList.description,
            type: surveyList.type,
            //design : surveyList.design,
            // startDay : today
            // endDay : today + 
            questionRequest: surveyList.questionRequest.map((prev) => {
                return {
                    //id : prev.id
                    type: prev.type,
                    title: prev.title,
                    choiceList: prev.choiceList
                }
            })
        }

        console.log(isLogined.token);
        var url = '/api/create';
        if (isModify) url = `/api/modify-survey/${surveyList.id}` //임시
        axios.post(url, dataToTransport,
            {
                headers: {
                    'Application-Type': 'application/json',
                    'Authorization': isLogined.token
                }
            }
        )
            .then((response) => {//api의 응답을 제대로 받은경우 
                setSurveyList((prev) => {
                    return {
                        id: 0,
                        title: "",
                        description: "",
                        type: 0,
                        design: {
                            font: 0,
                            fontSize: 0,
                            layout: 0,
                        },
                        questionRequest: [
                            {
                                id: 0,
                                type: 0,
                                title: "",
                                choiceList: ""/*[
                                                id:0;
                                                choiceName:null;
                                            ]*/
                            }
                        ]
                    }
                });
                setAnswerList((prev) => {
                    return {
                        id: 0,
                        title: null,
                        description: null,
                        type: null,
                        responseId: 0,
                        questionResponse: [/*
                                    {
                                        title:null,
                                        type:null,
                                        answer:null,
                                        answerId:null,
                                    }*/
                        ]
                    }
                });
                console.log('Saved');
                navigate('/');
            })
            .catch((response) => {//종류불문 에러
                console.log('Error');
                console.log(dataToTransport);
            });
    }

    return (
        <div >
            <div className="survey_area" style={!sidebarIsOpen.open ? { paddingRight: "0px" } : { paddingRight: "30vw" }}    >
                <div className="survey_container" ref={divRef} > 
                    <div ref={scrollRef} >
                        {!isPreview ? (
                            <>
                                <div className='create_survey'>
                                    <div className='problem_container'>
                                        <input placeholder="설문 제목" value={surveyList?.title} onChange={(e) => onChangeTitleInput(e)} className='survey_input' style={{ fontSize: "50px" }}></input>
                                        <textarea placeholder="부연 설명을 입력해 주세요" value={surveyList?.description} onChange={(e) => onChangeTextArea(e)} className='textarea'></textarea>
                                    </div>
                                </div>
                                <>
                                    {surveyList && <ReactDragList dataSource={[...surveyList.questionRequest]} rowKey='id' row={dragList} handles={false} ghostClass="dragGhost" onUpdate={onUpdateList} />}
                                </>
                            </>) : (
                            <>
                                <div className='create_survey'>
                                    <div className='problem_container'>
                                        <h1 style={{ textAlign: "left", margin: '0 0 0 0 ', fontSize: '50px' }}>{surveyList?.title}</h1>
                                        <textarea readOnly className='textarea'>{surveyList?.description}</textarea>
                                    </div>
                                </div>
                                {surveyList?.questionRequest.map((survey, index) => <ViewSurvey key={index} id={survey.id} index={index} />)}
                            </>
                        )
                        }
                        {!isPreview && (
                            <div className="new_survey" onClick={(e) => onClickNewSurveyButton(e)}>
                                <h1>+</h1>
                            </div>
                        )}
                        <div className='survey_contatiner_bottom'>
                            <div className="survey_button" onClick={(e) => onClickPreviewButton(e)}>{isPreview ? "Create" : "Preview"}</div>
                            <div className="survey_button" onClick={handleDownload}>테스트</div> 
                            <div className="survey_button" onClick={(e) => onClickSaveButton(e)}>Save</div>
                        </div>
                    </div>
                </div>
            </div>
            {!isPreview && <Sidebar isOpen={sidebarIsOpen} setOpen={setSidebarIsOpen} index={sidebarSelected} />}
        </div>
    );
}

export default Survey;





//버그 미리보기에선 서베이 설명 안들어감 들어가네 머지