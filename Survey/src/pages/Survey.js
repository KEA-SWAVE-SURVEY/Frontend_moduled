import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { surveyListState, answerListState, loginState, modifyState,fontState, fontSizeState,backColorState } from '../contexts/atom';
import ReactDragList from 'react-drag-list';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import '../styles/SurveyStyle.css';
import CreateSurvey from '../components/survey/create/CreateSurvey';
import ViewSurvey from '../components/survey/view/ViewSurvey';
import Sidebar from '../components/survey/sidebar/Sidebar'; 


import html2canvas from "html2canvas";
import saveAs from "file-saver";
import {setCookie,getCookie,removeCookie} from '../components/login/cookie'
 

function Survey(props) {
    const isLogined = useRecoilValue(loginState);
    const isModify = useRecoilValue(modifyState);

    const [sidebarIsOpen, setSidebarIsOpen] = useState({ open: false, isSetting: false });
    const [sidebarSelected, setSidebarSelected] = useState(0);

    const [surveyList, setSurveyList] = useRecoilState(surveyListState);
    const [answerList, setAnswerList] = useRecoilState(answerListState);

    const [font,setFont] = useRecoilState(fontState);
    const [fontSize,setFontSize] = useRecoilState(fontSizeState);
    const [backColor,setBackColor] = useRecoilState(backColorState);
    const [isPreview, setIsPreview] = useState(false);

    const scrollRef = useRef();
 
    const divRef = useRef(null);
    
    const topRef = useRef(null);
    const today = new Date().toLocaleDateString(); 

    const [size, setSize] = useState(`30px`);



    const changeSize=(e)=>{
        setSize(prev=>prev===`50px`?`5px`:`50px`);
        console.log(size);

    }


    useEffect(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, [surveyList?.questionRequest.length]);
    const surveyCookie = getCookie("survey");
    useEffect(() => {
        const location = useLocation();
        if (!location.state) {
            checkCookie()
            console.log(surveyCookie)
            if(!surveyCookie){
                console.log(surveyCookie)
                setSurveyList((prev) => {
                    return {
                        id: 0,
                        title: "",
                        description: "",
                        type: 0,
                        reliability: 1,
                        startDate:new Date(),
                        endDate: new Date(),
                        enable: true, 
                        design:
                            {
                        font:`"Calibri", "Roboto", sans-serif`,
                        fontSize:3,
                        backColor:'#ffffff'
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
                setBackColor(()=>{'#ffffff'})
                setFontSize(()=>3)
                setFont(()=>{'`"Calibri", "Roboto", sans-serif`'})
                 
            }
            else{
                console.log(surveyCookie)
                try{
                setSurveyList((prev) => {
                    return {
                        id: 0,
                        title: surveyCookie.title,
                        description: surveyCookie.description,
                        reliability: surveyCookie.reliability,
                        startDate:surveyCookie.startDate,
                        endDate: surveyCookie.endDate,
                        enable: surveyCookie.enable,
                        design:surveyCookie.design,
                        type: surveyCookie.type,
                        questionRequest: surveyCookie.questionRequest.map((questionList) => {
                            return {
                                id: questionList.id,
                                title: questionList.title,
                                type: questionList.type,
                                choiceList: questionList.choiceList.map((choice) => {
                                    return {
                                        id: choice.id,
                                        choiceName: choice.title
                                    }
                                })
                            }
                        })
                    }
                });}
                catch{
                    console.log('error')
                }

                //쿠키 템플릿 보여주기
                console.log('형 여기 안와?')
                console.log(surveyList.description)
                console.log(surveyList.design.font,surveyList.design.fontSize,surveyList.design.backColor)
                setBackColor(()=>surveyList.design.backColor)
                setFontSize(()=>surveyList.design.fontSize)
                setFont(()=>surveyList.design.font)
                console.log(font,fontSize,backColor)
            }
            
        }
    }, []);

    /* useEffect(() => {
        if (!isModify) {
            //console.log(Rel)
            setSurveyList((prev) => {
                return {
                    id: 0,
                    title: "",
                    description: "",
                    type: 0,
                    reliability: 1,
                    
                    startDate:new Date(),
                    endDate: new Date(),
                    enable: false, 
                    design:
                            {
                        font:"",
                        fontSize:3,
                        backColor:'#ffffff'
                            },
                    questionRequest: [
                        {
                            id: 0,
                            type: 0,
                            title: "",
                            choiceList: ""
                        }
                    ]
                }
            });
        }
    }, []); */

    const onUpdateList = (e, updated) => {
        console.log(updated);
        setSurveyList((prev) => {
            return {
                id: prev.id,
                title: prev.title,
                description: prev.description,
                type: prev.type,
                reliability: prev.reliability,
                
                startDate:prev.startDate,
                endDate: prev.endDate,
                enable: prev.enable,
                design:prev.design,
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
                reliability:prev.reliability,
                
                startDate:prev.startDate,
                endDate: prev.endDate,
                enable: prev.enable,
                design:prev.design,
                
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
                reliability:prev.reliability, 
                
                startDate:prev.startDate,
                endDate: prev.endDate,
                enable: prev.enable,
                design:prev.design,
                questionRequest: prev.questionRequest
            };
        });
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);
        setCookie('survey',surveyList,{
            path:"/",
            sameSite: "strict",
            expires: expirationTime
    
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
                reliability:prev.reliability,
                
                startDate:prev.startDate,
                endDate: prev.endDate,
                enable: prev.enable,
                design:prev.design,
                questionRequest: prev.questionRequest
            };
        });
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);
        setCookie('survey',surveyList,{
            path:"/",
            sameSite: "strict",
            expires: expirationTime
    
          });

    }

    function onClickPreviewButton(e) {
        e.preventDefault();
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);
        setCookie('survey',surveyList,{
            path:"/",
            sameSite: "strict",
            expires: expirationTime
    
          });
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

    const handleDownload = async () => {
        if (!divRef.current) return;
      
        try {
          const div = divRef.current;
          const canvas = await html2canvas(div, {
            x:0,        // 캡처할 부분의 x 좌표
            y: 0,        // 캡처할 부분의 y 좌표
              // 캡처할 부분의 가로 크기
            height: 400  // 캡처할 부분의 세로 크기
          });
          canvas.toBlob(async (blob) => {
            if (blob !== null) {
              const formData = new FormData();
              formData.append('blobData', blob);
              saveAs(blob, "result.png");
            console.log('try to axios');
       
              try {
                await axios.post('/processBlob', formData, {
                  headers: {
                    'Content-Type': 'application/octet-stream',
                  },
                });
                console.log('Blob sent to backend successfully');
              } catch (error) {
                console.error('Error sending blob to backend:', error);
              }
            }
          });
        } catch (error) {
          console.error('Error converting div to image:', error);
        }
      };

    function onClickSaveButton(e) {
        e.preventDefault();
        console.log(surveyList);
        console.log(answerList);
        const dataToTransport = {
            //id : surveyList.id
            title: surveyList.title,
            description: surveyList.description,
            type: surveyList.type,
            reliability:surveyList.reliability,
            startDate:surveyList.startDate,
            endDate: surveyList.endDate,
            enable: surveyList.enable,
            design:surveyList.design,
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
        var url = '/api/document/external/create';
        console.log(url);
        //if (isModify) url = `/api/modify-survey/${surveyList.id}` //임시
        //todo 수정완료 수정은 put으로
        //수정06072100
        if (isModify){
             url = `/api/docuemnt/external/update/${surveyList.id}`
             axios.put(url, dataToTransport,
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
                            reliability:1, //notion상에서는 Boolean인데 이거 변경할지
                             // design쪽 notion에는 없는데 일단 유지 
                            startDate:new Date(),
                            endDate: new Date(),
                            enable: true,
                            design:
                                {
                                font:`"Calibri", "Roboto", sans-serif`,
                                fontSize:0,
                                backColor:"#ffffff"
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
                    window.location.href = `http://172.16.210.80/`; 
                    if(surveyCookie){
                        removeCookie('survey')
                        }
                })
                .catch((response) => {//종류불문 에러
                    console.log('Error');
                    console.log(dataToTransport);
                });
                handleDownload();
        } 
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
                        reliability:1, //notion상에서는 Boolean인데 이거 변경할지
                         // design쪽 notion에는 없는데 일단 유지 
                        startDate:new Date(),
                        endDate: new Date(),
                        enable: true,
                        design:
                            {
                            font:`"Calibri", "Roboto", sans-serif`,
                            fontSize:0,
                            backColor:"#ffffff"
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
                window.location.href = `http://172.16.210.80/`; 
                if(surveyCookie){
                    removeCookie('survey')
                    }
            })
            .catch((response) => {//종류불문 에러
                console.log('Error');
                console.log(dataToTransport);
            });
            handleDownload();
        }
        function checkCookie(){
            if(surveyCookie){
                if(window.confirm("이전 저장 내용을 불러오시겠습니까")){
                    
                }
                else{removeCookie('survey')
                window.location.replace("/survey")    
            }

            }
        }

    return (
       
        <div style={{backgroundColor:backColor}}  >
            <div className="survey_area" style={!sidebarIsOpen.open ? { paddingRight: "0px" } : { paddingRight: "30vw" }}>
                <div className="survey_container" ref={divRef}> 
                    <div ref ={topRef}> <p> </p></div>
                    

                    <div ref={scrollRef}>
                        {!isPreview ? (
                            <div >
                                <div className='create_survey'>
                                    <div className='problem_container'>
                                    
                                            <input placeholder="설문 제목" value={surveyList?.title} onChange={(e) => onChangeTitleInput(e)} className='survey_input' style={{ fontSize: fontSize+'vw' ,fontFamily:font }}></input>
                                            <textarea placeholder="부연 설명을 입력해 주세요" value={surveyList?.description} onChange={(e) => onChangeTextArea(e) }style={{ fontSize: fontSize+`vw` ,fontFamily:font }} className='textarea'></textarea>

                                    </div>
                                </div>
                                <>
                                    {surveyList && <ReactDragList dataSource={[...surveyList.questionRequest]} rowKey='id' row={dragList} handles={false} ghostClass="dragGhost" onUpdate={onUpdateList} />}
                                </>
                            </div>) : (
                            <>

                                <div className='create_survey'>
                                    <div className='problem_container' >

                                        <h1 style={{ textAlign: "left", margin: '0 0 0 0 ',  fontSize: fontSize+'vw' ,fontFamily:font }} className='survey_input'>{surveyList?.title}</h1>
                                        <textarea readOnly className='textarea'style={{ fontSize: fontSize+'vw' ,fontFamily:font }}>{surveyList?.description}</textarea>
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
                            <div className="survey_button" onClick={handleDownload}>테스트 !</div>
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
