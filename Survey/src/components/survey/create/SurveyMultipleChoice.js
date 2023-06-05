import { useState } from 'react';
import { useRecoilState,useRecoilValue } from 'recoil';
import { surveyListState,fontState,fontSizeState } from '../../../contexts/atom';
import { updateSurveyContent } from '../../../utils/updateJSON';
import {setCookie,getCookie} from '../../../components/login/cookie'
import MultipleChoiceOption from './MultipleChoiceOption';


import '../../../styles/SurveyStyle.css';

function SurveyMultipleChoice(props) {
    const [surveyList, setSurveyList] = useRecoilState(surveyListState);
    const font = useRecoilValue(fontState);
    const fontSize = useRecoilValue(fontSizeState);
    const [choiceId, setChoiceId] = useState(
        surveyList.questionRequest[props.index].choiceList.length !== 0 &&
        surveyList.questionRequest[props.index].choiceList[surveyList.questionRequest[props.index].choiceList.length - 1].id + 1);

    const surveyId = props.id;
    const surveyIndex = props.index;


    function onChangeInput(e) {
        e.preventDefault();
        setSurveyList((prev) => {
            let newContent = {
                id : surveyId,
                type : prev.questionRequest[surveyIndex].type,
                title : e.target.value,
                choiceList : prev.questionRequest[surveyIndex].choiceList
            };
            return updateSurveyContent(prev, newContent, surveyIndex);
        });
        console.log(surveyList);
    }
    const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);
        setCookie('survey',surveyList,{
            path:"/",
            sameSite: "strict",
            expires: expirationTime
    
          });

    function onClickAddOption(e) {
        e.preventDefault();
        setSurveyList((prev) => {
            let newContent = {
                id : surveyId,
                type : prev.questionRequest[surveyIndex].type,
                title : prev.questionRequest[surveyIndex].title,
                choiceList: [...prev.questionRequest[surveyIndex].choiceList, { id : choiceId, choiceName : "" }]
            };
            return updateSurveyContent(prev, newContent, surveyIndex);
        });
        setChoiceId((prev) => { return prev + 1; });
        console.log(surveyList);
    }

    return (
        <div className="problem_container">
            <input placeholder="제목을 입력해 주세요" value={surveyList.questionRequest[surveyIndex].title || ""} className='survey_input' onChange={(e) => onChangeInput(e)} style={{fontSize:fontSize+'vw',fontFamily:font}}></input>
            <div>
                {surveyList.questionRequest[surveyIndex].choiceList && surveyList.questionRequest[surveyIndex].choiceList.map((option, index) => {
                    return <MultipleChoiceOption key={option.id} id={surveyId} choiceId={option.id} index={surveyIndex} choiceIndex={index} />;
                })}
                <div className="small_button_container">
                    <div className="small_button" style={{ width: "50%", marginRight: "0px" }} onClick={(e) => onClickAddOption(e)}>
                        <h1>+</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SurveyMultipleChoice;