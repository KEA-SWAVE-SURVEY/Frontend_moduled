import { useRecoilState } from 'recoil';
import { surveyListState } from '../../../contexts/atom';
import { updateSurveyContent } from '../../../utils/updateJSON';

function MultipleChoiceOption(props) {
    const [surveyList, setSurveyList] = useRecoilState(surveyListState);

    const surveyId = props.id;
    const surveyIndex = props.index;

    function onClickDeleteButton(e) {
        e.preventDefault();
        var deletedContent = surveyList.questionRequest[surveyIndex].choiceList.filter((choice) => choice.id !== props.choiceId);
        if (deletedContent.length === 0) deletedContent = "";
        setSurveyList((prev) => {
            let newContent = {
                id : surveyId,
                type : prev.questionRequest[surveyIndex].type,
                title : prev.questionRequest[surveyIndex].title,
                choiceList : deletedContent
            };
            return updateSurveyContent(prev, newContent, surveyIndex);
        });
        console.log(surveyList);
    }

    function onChangeOption(e) {
        e.preventDefault();
        const options = surveyList.questionRequest[surveyIndex].choiceList.map((option) =>{
            if(option.id === props.choiceId){
                return {
                    id : option.id,
                    choiceName : e.target.value
                }
            }else{
                return option;
            }
        });
        setSurveyList((prev) => {
            let newContent = {
                id : surveyId,
                type : prev.questionRequest[surveyIndex].type,
                title : prev.questionRequest[surveyIndex].title,
                choiceList : options
            };
            return updateSurveyContent(prev, newContent, surveyIndex);
        });
        console.log(surveyList);
    };



    return (
        <div className="small_button_container">
            <div className="small_button" onClick={(e) => onClickDeleteButton(e)}>
                <h1>-</h1>
            </div>
            <input placeholder="선택지 내용을 입력해 주세요" value={surveyList.questionRequest[surveyIndex].choiceList[props.choiceIndex].choiceName} className="choice_input" onChange={(e) => onChangeOption(e)} />
        </div>
    );
};

export default MultipleChoiceOption;