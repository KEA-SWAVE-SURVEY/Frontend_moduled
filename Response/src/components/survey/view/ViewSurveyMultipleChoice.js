import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { surveyListState,fontSizeState,fontState } from '../../../contexts/atom';
import { answerListState } from '../../../contexts/atom';
import { updateAnswerContent } from '../../../utils/updateJSON';

import '../../../styles/SurveyStyle.css';

function ViewSurveyMultipleChoice(props) {
    const [answer, setAnswer] = useState(0);
    const surveyList = useRecoilValue(surveyListState);
    const [answerList, setAnswerList] = useRecoilState(answerListState);
    const fontSize = useRecoilValue(fontSizeState); 
    const font = useRecoilValue(fontState);

    useEffect(()=>{
        console.log(surveyList);
        onChangeRadioButton({target:{value: 0}});
    },[]);
    
    const onChangeRadioButton = (e) => {
        setAnswer(parseInt(e.target.value));
        setAnswerList((prev) => {
            let newContent = {
                id : answerList.questionResponse[props.index].id,
                title: answerList.questionResponse[props.index].title,
                type: answerList.questionResponse[props.index].type,
                answer: surveyList.questionRequest[props.index].choiceList[e.target.value].choiceName,
                answerId : surveyList.questionRequest[props.index].choiceList[e.target.value].id
            }
            return updateAnswerContent(prev, newContent, props.index);
        });
    };

    const RadioButton = ({ label, value, checked ,onChange }) => {
        return (
            <label className="radio_container">
                <input className="radio" type="radio" value={value} checked={checked} onChange={onChange} />
                <div className="label_container" style={{ width: "20%", fontSize: fontSize+'vw' ,fontFamily:font }} >{label}</div>
            </label>
        );
    };

    return (
        <div className="problem_container" style={{marginBottom:"30px"}}>
            <h1 style={{textAlign:"left", fontSize: fontSize+'vw' ,fontFamily:font }} className='survey_input'>{surveyList.questionRequest[props.index].title} </h1>
            {surveyList.questionRequest[props.index].choiceList.map((option, index)=>{
                return(
                    <RadioButton key={index} label={option.choiceName} value={index} checked={answer === index} onChange={(e) => onChangeRadioButton(e)}/>
                )})
            }
        </div>
    );
}

export default ViewSurveyMultipleChoice;