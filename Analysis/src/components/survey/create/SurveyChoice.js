import { useRecoilState } from 'recoil';
import { surveyListState } from '../../../contexts/atom';
import { updateSurveyContent } from '../../../utils/updateJSON';

function SurveyChoice(props) {
    const [surveyList, setSurveyList] = useRecoilState(surveyListState);

    const surveyId = props.id;
    const surveyIndex = props.index;

    function onChangeInput(e) {
        e.preventDefault();
        setSurveyList((prev) => {
            let newContent = {
                id : surveyId,
                type : prev.questionRequest[surveyIndex].type,
                title : e.target.value,
                choiceList : [{
                    id:0,
                    choiceName:true
                },{
                    id:1,
                    choiceName:false
                }]
            };
            return updateSurveyContent(prev,newContent,surveyIndex);
        });
        console.log(surveyList);
    }

    return (
        <div>
            <div className="problem_container">
                <input placeholder="제목을 입력해 주세요" value={surveyList.questionRequest[surveyIndex].title} className='survey_input' onChange={(e) => onChangeInput(e)}></input>
            </div>
            <div className="small_button_container">
                <h2 className="grey_text">예 / 아니오</h2>
            </div>
        </div>
    );
}

export default SurveyChoice;
