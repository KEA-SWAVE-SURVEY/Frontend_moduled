import React, { useState } from 'react';
import Dropdown from './Dropdown';
import styles from "../../styles/selectList.module.css";
import settingIcon from "../../assets/setting.png";
import { useSetRecoilState } from 'recoil'; 
import { surveyListState, modifyState, fontSizeState } from '../../contexts/atom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function ListItem(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const setSurveyList = useSetRecoilState(surveyListState)
    const setIsModify = useSetRecoilState(modifyState); 

    const navigate = useNavigate();
    const survey = props.survey;
    const index = props.index;

    function onClickList(e, id) {
        e.preventDefault();
        const loadSurveys = async()=>{
            // const result = await axios.get(`/api/load-survey/${id}`);
            //기존 /survey/external/load/${id}
            //수정 /api/external/survey-list/${id}수정완료
            //수정06072100
            const result = await axios.get(`/api/document/external/survey-list/${id}`);
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
            setIsModify((prev) => true);
            navigate(`/survey`); 
        }
        loadSurveys();
    }

    function onClickSettingButton(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen((prev) => { return !prev })
    }
//todo-확인완료 왜 deadline인지 grid랑 연구하기 -> 임시로 만들어진듯 수정이 필요해 startDate, endDate
  
    return (
        <>
            <div className={styles.Wrapper} key={index} onClick={(e) => onClickList(e, survey.id)}>
                <div className={styles.textContainer}>{survey.title}</div>
                <div className={styles.textContainer}>{survey.description}</div>
                <div className={styles.textContainer}>{survey.startDate.slice(0,10) + " ~ " + survey.deadline.slice(0,10)}</div>
                <ul className={styles.dropdown} style={isDropdownOpen ? { maxHeight: "100vh" } : { maxHeight: "1.5vw" }}>
                    <img className={styles.setting_icon} src={settingIcon} alt="img" onClick={(e) => onClickSettingButton(e, survey.id)} />
                    {isDropdownOpen && <Dropdown id={survey.id}/>}
                </ul>
            </div>
            {index !== 4 && (
                <hr style={{ width: '90%', height: '0.1vh', border: 'none', backgroundColor: '#1b0278', opacity: '0.3' }} />
            )}
        </>
    );
}

export default ListItem;