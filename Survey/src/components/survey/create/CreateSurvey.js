import { useState,useEffect } from 'react';
import { useRecoilState,useRecoilValue } from 'recoil';
import { surveyListState,relState } from '../../../contexts/atom';


import SurveyChoice from './SurveyChoice';
import SurveyMultipleChoice from './SurveyMultipleChoice';
import SurveyQuestion from './SurveyQuestion';

function CreateSurvey(props) {
    const [surveyList, setSurveyList] = useRecoilState(surveyListState);
    const [category,setCategory] = useState(surveyList.questionRequest[props.index].type);
    const Rel = useRecoilValue(relState);
    

    const surveyId = props.id;
    const surveyIndex = props.index;
    
    
    useEffect(() => {
        setCategory(surveyList.questionRequest[surveyIndex].type);
    }, [surveyList.questionRequest, surveyIndex]);
    
    function onClickDeleteButton(e){
        e.preventDefault();
        setSurveyList((prev) => {
            const deletedContent = prev.questionRequest.filter((element) => element.id !== surveyId);
            console.log(surveyList);
            return {
                id : prev.id,
                title : prev.title,
                description : prev.description,
                reliability: prev.reliability,
                font:prev.font,
                fontSize:prev.fontSize,
                backColor:prev.backColor,
                type : prev.type,
                questionRequest : deletedContent
            }; 
        });
    }

    return (
        <div className="create_survey" onClick={(e) => props.onClickEvent(e,surveyIndex)}>
            <div>
                {category === 0 ? <SurveyQuestion key={surveyId} id={surveyId} index={surveyIndex}/> 
                : category === 1 ? <SurveyChoice key={surveyId} id={surveyId} index={surveyIndex}/> 
                : <SurveyMultipleChoice key={surveyId} id={surveyId} index={surveyIndex}/>}
            </div>
            <div className="small_button_container">
                <div className="small_button" onClick={(e)=>onClickDeleteButton(e)}>
                    <h1>-</h1>
                </div>
            </div>
        </div>
    );
}

export default CreateSurvey;