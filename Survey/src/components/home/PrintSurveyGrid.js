import { useState } from 'react';
import '../../styles/HomeStyles.css'
import setting from '../../assets/setting.png'
import Dropdown from './Dropdown'; 
import { useSetRecoilState } from 'recoil';
import { surveyListState, modifyState } from '../../contexts/atom';
import axios from 'axios';

import { useNavigate } from "react-router-dom";

function PrintSurveyGrid(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const setSurveyList = useSetRecoilState(surveyListState)
    const setIsModify = useSetRecoilState(modifyState); 
    const cookie = sessionStorage.getItem('token')
    const navigate = useNavigate();

    const survey = props.survey;

    function onClickGrid(e, id) {
        e.preventDefault();
        const loadSurveys = async()=>{
            // const result = await axios.get(`/api/load-survey/${id}`); 이부분 POST인데 GET으로 되어있음
            //기존 /survey/external/load/${id}
            //수정 /api/external/survey-list/{id}
            //`api/answer/external/load/${id}`
            //수정06072100
            const result = await axios.get(`/api/document/external/survey-list/${id}`
            ,{
                headers: {
                Authorization: cookie,
                }});
            console.log(result)
            console.log(cookie)
            setSurveyList((prev) => {
                //수정 리스트 모르겠어 -> 이거 맞아
                return {
                    id: result.data.id,
                    title: result.data.title,
                    description: result.data.description,
                    reliability: result.data.reliability,
                    
                    startDate:result.data.startDate,
                    endDate: result.data.endDate,
                    enable: result.data.enable,
                    design:{
                        font:result.data.design.font,
                        fontSize:result.data.design.fontSize, 
                        backColor:result.data.design.backColor,
                        },
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
            setIsModify((prev) => true); 
            navigate("/survey", {
                state: { ...true },
              });
        }
        loadSurveys();
    }

    function onClickSettingButton(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen((prev) => { return !prev })
    }

    return (
        <>
            <div className='grid_box' style={{ backgroundImage: `url(${survey.image})` }} onClick={(e) => onClickGrid(e, survey.id)}>
                <ul className='dropdown' style={isDropdownOpen ? { maxHeight: "100vh" } : { maxHeight: "1.5vw" }}>
                    <img className='setting_icon' src={setting} alt="img" onClick={(e) => onClickSettingButton(e)} />
                    {isDropdownOpen && <Dropdown id={survey.id} />}
                </ul>
                <div className='line'>
                    <span style={{ textAlign: "center" }}>{survey.title}</span>
                </div>
            </div>
        </>
    );
}

export default PrintSurveyGrid;