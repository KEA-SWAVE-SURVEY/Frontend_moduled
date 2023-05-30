import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { surveyListState } from '../../../contexts/atom';
import { answerListState } from '../../../contexts/atom';
import { updateAnswerContent } from '../../../utils/updateJSON';

function ViewSurveyChoice(props) {
    const [answer, setAnswer] = useState(true);
    const surveyList = useRecoilValue(surveyListState);
    const [answerList, setAnswerList] = useRecoilState(answerListState);

    const choiceList = [{ label: "예", value: true }, { label: "아니오", value: false }]

    useEffect(()=>{
        onChangeRadioButton({target:{value: true}}, 0);
    },[]);

    const onChangeRadioButton = (e, index) => {
        setAnswer(JSON.parse(e.target.value));

        setAnswerList((prev) => {
            let newContent = {
                id : answerList.questionResponse[props.index].id,
                title: answerList.questionResponse[props.index].title,
                type: answerList.questionResponse[props.index].type,
                answer: e.target.value,
                answerId : surveyList.questionRequest[props.index].choiceList[index].id
            }
            return updateAnswerContent(prev, newContent, props.index);
        });
    };

    const RadioButton = ({ label, value, checked, onChange }) => {
        return (
            <label className="radio_container">
                <input className="radio" type="radio" value={value} checked={checked} onChange={onChange} />
                <div className="label_container" style={{ width: "20%" }}>{label}</div>
            </label>
        );
    };

    return (
        <div className="problem_container" style={{ marginBottom: "30px" }}>
            <h1 style={{ textAlign: "left" }}>{surveyList.questionRequest[props.index].title} </h1>
            <div>
                {choiceList.map((choice,index) => {
                    return <RadioButton key={index} label={choice.label} value={choice.value} checked={choice.value === answer} onChange={(e) => onChangeRadioButton(e, index)}/>
                })}
            </div>
        </div>
    );
}

export default ViewSurveyChoice;