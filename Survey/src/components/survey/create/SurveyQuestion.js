import { useRecoilState,useRecoilValue } from 'recoil';
import { surveyListState,relState,fontState,fontSizeState } from '../../../contexts/atom';
import { updateSurveyContent } from '../../../utils/updateJSON';

import '../../../styles/SurveyStyle.css';
import { fontFamily } from '@mui/system';

function SurveyQuestion(props) {
    const [surveyList, setSurveyList] = useRecoilState(surveyListState);
    const Rel = useRecoilValue(relState);
    const font = useRecoilValue(fontState);
    const fontSize = useRecoilValue(fontSizeState);
    const surveyId = props.id;
    const surveyIndex = props.index;

    

    function onChangeInput(e) {
        e.preventDefault();
        setSurveyList((prev) => {
            let newContent = {
                id : surveyId,
                type : prev.questionRequest[surveyIndex].type,
                title : e.target.value,
                reliability:prev.reliability,
                font:prev.font,
                fontSize:prev.fontSize,
                backColor:prev.backColor,
                choiceList : []
            };
            return updateSurveyContent(prev, newContent, surveyIndex);
        });
        console.log(Rel)
        console.log(font)
        console.log(surveyList);
    }

    return (
        <div className="problem_container">
            
            
            
            <input placeholder="제목을 입력해 주세요" value={surveyList.questionRequest[surveyIndex].title} className='survey_input' style={{fontSize:fontSize+'vw' ,fontFamily:font}}onChange={(e) => onChangeInput(e)}></input>
        </div>
    );
}

export default SurveyQuestion;